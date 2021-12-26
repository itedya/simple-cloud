import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserDto } from "./dtos/user.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {
  }

  async getByUsername(username: string): Promise<UserDto | null> {
    const user = await this.prisma.user.findUnique({ where: {username} });

    if (!user) return null;

    return new UserDto(user);
  }

  async create(data: Prisma.UserCreateInput) {
    const result = await this.prisma.user.create({ data });

    if (!result) return null;

    return new UserDto(data);
  }
}
