import { Module } from "@nestjs/common";
import { FilesUploadController } from "./files-upload.controller";
import { CacheModule } from "../../cache/cache.module";
import { FilesUploadService } from "./files-upload.service";
import { ConfigModule } from "../../config/config.module";
import { SettingsModule } from "../../settings/settings.module";

@Module({
  imports: [CacheModule, ConfigModule, SettingsModule],
  controllers: [FilesUploadController],
  providers: [FilesUploadService],
})
export class FilesUploadModule {

}
