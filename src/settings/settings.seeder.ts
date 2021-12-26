import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { SettingsService } from "./settings.service";
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
      const defaultFolder = path.join(process.cwd(), 'data');

      if (!fs.existsSync(defaultFolder)) {
        fs.mkdirSync(defaultFolder);
      }

      await this.prisma.settings.create({
        data: { dataPath: defaultFolder }
      });

      this.logger.log(`Setting default data path as: ${defaultFolder}`);
    }
  }
}
