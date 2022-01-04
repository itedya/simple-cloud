import { Module } from "@nestjs/common";
import { FilesController } from "./files.controller";
import { FilesService } from "./files.service";
import { SettingsModule } from "../settings/settings.module";
import { ConfigModule } from "../config/config.module";
import { CacheModule } from "../cache/cache.module";

@Module({
  imports: [SettingsModule, ConfigModule, CacheModule],
  controllers: [FilesController],
  providers: [FilesService]
})
export class FilesModule {

}
