import { Module } from "@nestjs/common";
import { ConfigModule } from "../config/config.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [ConfigModule, PrismaModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {
}
