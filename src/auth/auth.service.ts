import { Injectable } from "@nestjs/common";
import { LoginDto } from "./dtos/login.dto";
import { PrismaService } from "../prisma/prisma.service";
import { UsersService } from "../users/users.service";
import { CredentialsDoesntMatchException } from "./exceptions/credentials-doesnt-match.exception";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { UserDto } from "../users/dtos/user.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService,
              private usersService: UsersService,
              private configService: ConfigService) {
  }

  async validateUser(data: LoginDto): Promise<UserDto> {
    const user = await this.usersService.getByUsername(data.username);

    if (user && await bcrypt.compare(data.password, user.password)) {
      return user;
    }

    throw new CredentialsDoesntMatchException();
  }

  async signToken(user: UserDto) {
    const payload = { id: user.id, username: user.username };

    return jwt.sign(payload, this.configService.get("jwt.secret"), {
      expiresIn: this.configService.get("jwt.expiresIn")
    });
  }
}
