import { forwardRef, Module } from "@nestjs/common";
import { FilesController } from "./files.controller";
import { FilesService } from "./files.service";
import { SettingsModule } from "../settings/settings.module";
import { ConfigModule } from "../config/config.module";
import { CacheModule } from "../cache/cache.module";
import { FilesUploadModule } from "./upload/files-upload.module";
import { FilesDownloadModule } from "./download/files-download.module";

@Module({
  imports: [SettingsModule, ConfigModule, CacheModule, FilesUploadModule, forwardRef(() => FilesDownloadModule)],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService]
})
export class FilesModule {

}
