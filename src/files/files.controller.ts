import { Body, Controller, Delete, Get, Post, Put, Query, Res, UseGuards } from "@nestjs/common";
import { FilesService } from "./files.service";
import { JwtGuard } from "../auth/guards/jwt.guard";
import ParsePathPipe from "./pipes/parse-path.pipe";
import * as nodePath from "path";
import { RenameDto } from "./dtos/rename.dto";
import { SettingsService } from "../settings/settings.service";
import { ParseHashPipe } from "./pipes/parse-hash.pipe";
import { Response } from "express";
import { CreateDirectoryDto } from "./dtos/create-directory.dto";

@Controller("/files")
export class FilesController {
  constructor(private filesService: FilesService,
              private settingsService: SettingsService) {
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
  @Post("/directory")
  createDirectory(@Body() createDirectoryDto: CreateDirectoryDto) {
    return this.filesService.createDirectory(createDirectoryDto);
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
