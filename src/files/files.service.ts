import { BadRequestException, CACHE_MANAGER, Inject, Injectable, Logger, Query } from "@nestjs/common";
import { SettingsService } from "../settings/settings.service";
import * as path from "path";
import * as fs from "fs";
import { Cache } from "cache-manager";
import { CreateDirectoryDto } from "./dtos/create-directory.dto";

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

  async createDirectory(createDirectoryDto: CreateDirectoryDto) {
    const { dataPath } = await this.settingsService.get();

    const directoryPath = path.join(dataPath, createDirectoryDto.path, createDirectoryDto.name);

    if (fs.existsSync(directoryPath)) {
      throw new BadRequestException("Directory already exists!");
    }

    fs.mkdirSync(directoryPath);
  }
}
