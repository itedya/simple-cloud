import { Controller, Get, Query } from "@nestjs/common";
import { FilesService } from "./files.service";

@Controller("/files")
export class FilesController {
  constructor(private filesService: FilesService) {
  }

  @Get("/")
  get(@Query("path") path) {
    return this.filesService.getByPath(path);
  }
}
