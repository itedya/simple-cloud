import * as crypto from "crypto";
import * as fs from "fs";
import * as path from "path";
import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";
import { StartUploadHeadersDto } from "./dto/start-upload-headers.dto";
import { SettingsService } from "../../settings/settings.service";
import { UploadInfoDto } from "./dto/upload-info.dto";
import { classToPlain } from "class-transformer";

@Injectable()
export class FilesUploadService {
  constructor(@Inject(CACHE_MANAGER) private configService: Cache,
              private settingsService: SettingsService) {
  }

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

        fs.mkdirSync(path.join(tempPath, uploadInfo.finalUUID));

        break;
      }
    }

    return uploadInfo;
  }
}
