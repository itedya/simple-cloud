import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersSeeder {
  constructor(private prisma: PrismaService) {
  }

  private logger = new Logger("UsersSeeder");

  async onApplicationBootstrap() {
    const users = await this.prisma.user.count();

    if (users === 0) {
      this.logger.log("Generating admin user...");
      const password = crypto.randomBytes(12).toString("hex");

      await this.prisma.user.create({
        data: { username: "admin", password: await bcrypt.hashSync(password, 12) }
      });

      const clientCredentialsPath = path.join(process.cwd(), "start-credentials.log");
      fs.writeFileSync(clientCredentialsPath, `Login: admin\r\nPassword: ${password}`);

      this.logger.warn("--- LOGIN WITH THIS CREDENTIALS ---");
      this.logger.log(`Login: admin`);
      this.logger.log(`Password: ${password}`);
      this.logger.log(`PS. It's saved in ${clientCredentialsPath}`);
      this.logger.warn("--- LOGIN WITH THIS CREDENTIALS ---");
    }
  }
}
