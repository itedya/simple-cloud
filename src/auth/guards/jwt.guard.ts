import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private configService: ConfigService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const header = request.headers.authorization;

    if (!header) throw new UnauthorizedException();

    const headerSplitted = header.split(" ");
    if (headerSplitted.length !== 2) return false;
    if (headerSplitted[0].toLowerCase() !== "bearer") return false;


    let decoded;
    try {
      decoded = jwt.verify(headerSplitted[1], this.configService.get("jwt.secret"));
    } catch {
      return false;
    }

    request.user = {
      id: decoded.id,
      username: decoded.username
    }

    return true;
  }
}
