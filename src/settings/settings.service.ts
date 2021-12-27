import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Cache } from "cache-manager";
import { SettingsDto } from "./dto/settings.dto";

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService,
              @Inject(CACHE_MANAGER) private cacheManager: Cache) {
  }

  async get(): Promise<SettingsDto> {
    const fromCache = await this.cacheManager.get("settings");
    if (fromCache) return new SettingsDto(fromCache);

    const fromDB = this.prisma.settings.findFirst();
    await this.cacheManager.set("settings", fromDB);

    return new SettingsDto(fromDB);
  }
}
