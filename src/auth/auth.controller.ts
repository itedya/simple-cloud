import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { LoginDto } from "./dtos/login.dto";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { JwtGuard } from "./guards/jwt.guard";

@UseInterceptors(ClassSerializerInterceptor)
@Controller("/auth")
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {
  }

  @UseGuards(JwtGuard)
  @Get("/user")
  async user(@Req() request) {
    return this.usersService.getByUsername(request.user.username);
  }

  @Post("/login")
  async login(@Body() data: LoginDto) {
    const user = await this.authService.validateUser(data);
    const token = await this.authService.signToken(user);

    return { token, user }
  }
}
