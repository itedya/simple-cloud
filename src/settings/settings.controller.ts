import { Controller, Get, UseGuards } from "@nestjs/common";
import { SettingsService } from "./settings.service";
import { JwtGuard } from "../auth/guards/jwt.guard";

@Controller("/settings")
export class SettingsController {
  constructor(private settingsService: SettingsService) {
  }

  @UseGuards(JwtGuard)
  @Get("/")
  get() {
    return this.settingsService.get();
  }
}
