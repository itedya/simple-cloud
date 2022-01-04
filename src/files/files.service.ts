import { BadRequestException, CACHE_MANAGER, Inject, Injectable, Logger, Query } from "@nestjs/common";
import { SettingsService } from "../settings/settings.service";
import * as path from "path";
import * as fs from "fs";
import * as crypto from "crypto";
import * as archiver from "archiver";
import { Cache } from "cache-manager";

@Injectable()
export class FilesService {
  constructor(private settingsService: SettingsService,
              @Inject(CACHE_MANAGER) private cacheService: Cache) {
  }

  private logger = new Logger("FilesService");

  async getFilesInFolder(folderPath: string) {
    // get data path
    const { dataPath } = await this.settingsService.get();
    folderPath = path.join(dataPath, folderPath);

    // check if parent folder exists
    this.existsOrFail(folderPath);

    return fs.readdirSync(folderPath).map(ele => path.join(folderPath, ele));
  }

  existsOrFail(filePath: string): void {
    const exists = fs.existsSync(filePath);

    if (!exists) {
      throw new BadRequestException("File does not exist");
    }
  }

  async getFileDetails(filePath: string) {
    const { dataPath } = await this.settingsService.get();
    const filePathSplitted = filePath.split(path.sep);
    const fileName = filePathSplitted[filePathSplitted.length - 1];

    const stat = fs.lstatSync(filePath);
    let type: string;
    if (stat.isFile()) type = "file";
    else if (stat.isDirectory()) type = "directory";
    else type = "other";

    return {
      name: fileName,
      path: path.sep + path.relative(dataPath, filePathSplitted.join(path.sep)),
      parentFolderPath: (() => {
        filePathSplitted.pop();
        return path.sep + path.relative(dataPath, filePathSplitted.join(path.sep));
      })(),
      type,
      size: stat.size,
      birthtime: stat.birthtime
    };
  }

  async delete(filePath: string) {
    const { dataPath } = await this.settingsService.get();
    filePath = path.join(dataPath, filePath);

    this.existsOrFail(filePath);

    const fileStats = fs.lstatSync(filePath);
    if (fileStats.isDirectory()) {
      fs.rmSync(filePath, { recursive: true });
    } else {
      fs.unlinkSync(filePath);
    }
  }

  async getPreviousDirectory(filePath: string) {
    const { dataPath } = await this.settingsService.get();

    if (path.relative(dataPath, path.join(dataPath, filePath)) === "") {
      return null;
    }

    const dir = path.relative(dataPath, path.dirname(path.join(dataPath, filePath))).split(path.sep);

    if (dir.length > 1) {
      dir.pop();
    }

    return path.sep + dir.join(path.sep);
  }

  async rename(filePath: string, name: string): Promise<void> {
    const { dataPath } = await this.settingsService.get();

    const oldFilePath = path.join(dataPath, filePath);
    this.existsOrFail(oldFilePath);

    const newFilePath = oldFilePath.split(path.sep);
    newFilePath.pop();
    newFilePath.push(name);

    fs.renameSync(oldFilePath, newFilePath.join(path.sep));
  }

  setUpArchiver(inputPath: string, outputPath: string) {
    let resolveFileDescriptor, rejectFileDescriptor;

    let fileDescriptorPromise = new Promise((resolve, reject) => {
      resolveFileDescriptor = resolve;
      rejectFileDescriptor = reject;
    });

    const output = fs.createWriteStream(outputPath);
    const archive = archiver("zip", {
      zlib: { level: 9 }
    });

    output.on("close", () => {
      console.log(archive.pointer() + " total bytes");
      console.log("archiver has been finalized and the output file descriptor has closed.");
      resolveFileDescriptor();
    });

    archive.on("warning", (err) => {
      if (err.code === "ENOENT") {
        this.logger.warn(err.message);
      } else {
        rejectFileDescriptor();
        throw err;
      }
    });

    archive.on("error", (err) => { throw err; });

    archive.pipe(output);

    archive.directory(inputPath, false);

    archive.finalize();

    return fileDescriptorPromise;
  }

  async packArchive(fullPath: string) {
    const { tempPath } = await this.settingsService.get();

    const hash = crypto.randomBytes(36).toString("hex");

    const outputPath = `${tempPath}/${hash}.zip`;

    console.log(1);
    await this.setUpArchiver(fullPath, outputPath);
    console.log(2);
    return `${hash}.zip`;
  }

  async generateDownloadLink(filePath: string) {
    const { dataPath, tempPath } = await this.settingsService.get();

    let fullFilePath = path.join(dataPath, filePath);
    this.existsOrFail(fullFilePath);

    const fileStats = await this.getFileDetails(fullFilePath);

    if (fileStats.type === "directory") {
      fullFilePath = path.join(tempPath, await this.packArchive(fullFilePath));
    }

    let randomId = null;

    do {
      randomId = crypto.randomBytes(256).toString("hex");
    } while (await this.cacheService.get(`download_link_${randomId}`));

    await this.cacheService.set(`download_link_${randomId}`, fullFilePath, { ttl: 60 });

    return randomId;
  }
}
