import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto } from "./dtos/login.dto";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";

@Controller("/auth")
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {
  }

  @Post("/login")
  async login(@Body() data: LoginDto) {
    const user = await this.authService.validateUser(data);
    const token = await this.authService.signToken(user);

    return { token, user }
  }
}
