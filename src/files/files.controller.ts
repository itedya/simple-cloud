import { Body, Controller, Delete, Get, Put, Query, UseGuards } from "@nestjs/common";
import { FilesService } from "./files.service";
import { JwtGuard } from "../auth/guards/jwt.guard";
import ParsePathPipe from "./pipes/parse-path.pipe";
import * as nodePath from "path";
import { RenameDto } from "./dtos/rename.dto";

@Controller("/files")
export class FilesController {
  constructor(private filesService: FilesService) {
  }

  @Get("/")
  async get(@Query("path", ParsePathPipe) path) {
    const files = await this.filesService.getFilesInFolder(path);

    const filesMapped = [];

    for (const ele of files) {
      filesMapped.push(await this.filesService.getFileDetails(ele));
    }

    const previousDirectory = await this.filesService.getPreviousDirectory(path);

    return {
      separator: nodePath.sep,
      directory: nodePath.join(path),
      previousDirectory,
      files: filesMapped
    };
  }

  @UseGuards(JwtGuard)
  @Delete("/")
  delete(@Query("path", ParsePathPipe) path) {
    return this.filesService.delete(path);
  }

  @Put("/")
  rename(@Body() data: RenameDto) {
    return this.filesService.rename(data.path, data.name);
  }
}
