import { Module } from "@nestjs/common";
import { FilesController } from "./files.controller";
import { FilesService } from "./files.service";
import { SettingsModule } from "../settings/settings.module";
import { ConfigModule } from "../config/config.module";

@Module({
  imports: [SettingsModule, ConfigModule],
  controllers: [FilesController],
  providers: [FilesService]
})
export class FilesModule {

}
