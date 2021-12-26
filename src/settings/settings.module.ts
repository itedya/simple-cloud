import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { SettingsService } from "./settings.service";
import { SettingsController } from "./settings.controller";
import { CacheModule } from "../cache/cache.module";
import { SettingsSeeder } from "./settings.seeder";
import { ConfigModule } from "../config/config.module";

@Module({
  imports: [PrismaModule, CacheModule, ConfigModule],
  providers: [SettingsService, SettingsSeeder],
  controllers: [SettingsController]
})
export class SettingsModule {

}
