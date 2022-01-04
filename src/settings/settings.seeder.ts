import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import * as path from "path";
import * as fs from "fs";

@Injectable()
export class SettingsSeeder {
  constructor(private prisma: PrismaService) {
  }

  private logger = new Logger("SettingsSeeder");

  async onApplicationBootstrap() {
    const fromDB = await this.prisma.settings.findFirst();

    if (!fromDB) {
      const defaultDataFolder = path.join(process.cwd(), 'data');

      if (!fs.existsSync(defaultDataFolder)) {
        fs.mkdirSync(defaultDataFolder);
      }

      const defaultTempFolder = path.join(process.cwd(), 'temp');

      if (!fs.existsSync(defaultTempFolder)) {
        fs.mkdirSync(defaultTempFolder);
      }

      await this.prisma.settings.create({
        data: { dataPath: defaultDataFolder, tempPath: defaultTempFolder }
      });

      this.logger.log(`Setting default data path as: ${defaultDataFolder}`);
      this.logger.log(`Setting default temp path as: ${defaultTempFolder}`);
    }
  }
}
