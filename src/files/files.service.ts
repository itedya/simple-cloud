import { Injectable, Query } from "@nestjs/common";
import { SettingsService } from "../settings/settings.service";
import * as path from "path";
import * as fs from "fs";
import * as mime from "mime-types";
import { Stats } from "fs";

@Injectable()
export class FilesService {
  constructor(private settingsService: SettingsService) {
  }

  getFileAttributes(file: string, stats: Stats) {
    const nameSplitted = file.split(".");
    let extension = null;

    if (nameSplitted.length > 1) extension = nameSplitted.pop();

    return {
      name: nameSplitted.join("."),
      type: "file",
      extension: extension,
      mime: mime.lookup(extension),
      size: stats.size
    };
  }

  getFolderAttributes(file: string, stats: Stats) {
    return {
      name: file,
      type: "folder"
    };
  }

  async getFilesInFolder(folderPath: string) {
    const settings = await this.settingsService.get();
    folderPath = path.join(settings.dataPath, folderPath);

    return fs.readdirSync(folderPath).map(ele => {
      let stats = fs.lstatSync(path.join(folderPath, ele));

      if (stats.isDirectory()) {
        stats = fs.lstatSync(path.join(folderPath, ele) + "/");
        return this.getFolderAttributes(ele, stats);
      } else if (stats.isFile()) {
        return this.getFileAttributes(ele, stats);
      } else {
        return { name: ele, type: "other" };
      }
    });
  }

  async getByPath(providedPath: string) {
    return this.getFilesInFolder(providedPath);
  }
}
