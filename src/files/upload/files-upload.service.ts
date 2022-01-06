import * as crypto from "crypto";
import * as fs from "fs";
import * as path from "path";
import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";
import { StartUploadHeadersDto } from "./dto/start-upload-headers.dto";
import { SettingsService } from "../../settings/settings.service";
import { UploadInfoDto } from "./dto/upload-info.dto";
import { classToPlain } from "class-transformer";
import { UploadHeadersDto } from "./dto/upload-headers.dto";

@Injectable()
export class FilesUploadService {
  constructor(@Inject(CACHE_MANAGER) private configService: Cache,
              private settingsService: SettingsService) {
  }

  private tempWriteStreams = {};

  async generateUploadInfo(headers: StartUploadHeadersDto): Promise<UploadInfoDto> {
    const uploadInfo = new UploadInfoDto();

    while (true) {
      const { tempPath } = await this.settingsService.get();
      uploadInfo.timestamp = Date.now();
      uploadInfo.randomIdentifier = crypto.randomBytes(24).toString("hex");
      uploadInfo.uploadLength = parseInt(headers.uploadLength);
      uploadInfo.finalUUID = `${uploadInfo.timestamp}-${uploadInfo.randomIdentifier}`;

      if (!await this.configService.get(`upload_${uploadInfo.finalUUID}`)) {
        await this.configService.set(`upload_${uploadInfo.finalUUID}`, classToPlain(uploadInfo), { ttl: 604800 });

        this.tempWriteStreams[uploadInfo.finalUUID] = fs.createWriteStream(path.join(tempPath, uploadInfo.finalUUID), { flags: "w" });

        break;
      }
    }

    return uploadInfo;
  }

  async uploadChunk(headers: UploadHeadersDto, uploadData: UploadInfoDto, data: Buffer) {
    const writeStream = this.tempWriteStreams[uploadData.finalUUID];

    await new Promise(r => {
      writeStream.write(data, () => {
        r(null);
      });
    });

    if (uploadData.uploadLength === Number(headers.uploadOffset) + Number(headers.contentLength)) {
      const { dataPath, tempPath } = await this.settingsService.get();

      fs.renameSync(path.join(tempPath, uploadData.finalUUID), path.join(dataPath, headers.uploadName));

      writeStream.end();
    }
  }
}
