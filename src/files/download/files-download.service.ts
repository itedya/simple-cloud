import { CACHE_MANAGER, Inject, Injectable, Logger } from "@nestjs/common";
import * as path from "path";
import * as crypto from "crypto";
import * as fs from "fs";
import * as archiver from "archiver";
import { SettingsService } from "../../settings/settings.service";
import { Cache } from "cache-manager";
import { FilesService } from "../files.service";

@Injectable()
export class FilesDownloadService {
  constructor(private settingsService: SettingsService,
              @Inject(CACHE_MANAGER) private cacheService: Cache,
              private fileService: FilesService) {
  }

  private logger = new Logger();

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

    await this.setUpArchiver(fullPath, outputPath);
    return `${hash}.zip`;
  }

  async generateDownloadHash(filePath: string) {
    const { dataPath, tempPath } = await this.settingsService.get();

    let fullFilePath = path.join(dataPath, filePath);
    this.fileService.existsOrFail(fullFilePath);

    const fileStats = await this.fileService.getFileDetails(fullFilePath);

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
