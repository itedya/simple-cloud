import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { PrismaModule } from "../prisma/prisma.module";
import { UsersSeeder } from "./users.seeder";

@Module({
  imports: [PrismaModule],
  providers: [UsersService, UsersSeeder],
  exports: [UsersService]
})
export class UsersModule {

}
