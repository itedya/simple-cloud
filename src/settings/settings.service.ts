import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Cache } from "cache-manager";

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService,
              @Inject(CACHE_MANAGER) private cacheManager: Cache) {
  }

  async get() {
    const fromCache = await this.cacheManager.get("settings");
    if (fromCache) return fromCache;

    const fromDB = this.prisma.settings.findFirst();
    await this.cacheManager.set("settings", fromDB);

    return fromDB;
  }
}
