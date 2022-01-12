import { forwardRef, Module } from "@nestjs/common";
import { FilesDownloadService } from "./files-download.service";
import { FilesDownloadController } from "./files-download.controller";
import { SettingsModule } from "../../settings/settings.module";
import { CacheModule } from "../../cache/cache.module";
import { FilesModule } from "../files.module";

@Module({
  imports: [SettingsModule, CacheModule, forwardRef(() => FilesModule)],
  controllers: [FilesDownloadController],
  providers: [FilesDownloadService]
})
export class FilesDownloadModule {

}
