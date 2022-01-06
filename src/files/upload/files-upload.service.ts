import * as crypto from "crypto";
import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";

@Injectable()
export class FilesUploadService {
  constructor(@Inject(CACHE_MANAGER) private configService: Cache) {
  }

  async generateUUIDForUpload() {
    let finalUUID;

    while (true) {
      const timestamp = Date.now();
      const randomIdentifier = crypto.randomBytes(24).toString("hex");

      finalUUID = `${timestamp}-${randomIdentifier}`;

      if (!await this.configService.get(`upload_${finalUUID}`)) {
        await this.configService.set(`upload_${finalUUID}`, {
          timestamp, randomIdentifier,
          lastUsage: Date.now()
        }, { ttl: 604800 });

        break;
      }
    }

    return finalUUID;
  }
}
