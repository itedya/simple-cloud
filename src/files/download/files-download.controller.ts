import { Body, Controller, Get, Post, Query, Res } from "@nestjs/common";
import { ParseHashPipe } from "../pipes/parse-hash.pipe";
import { Response } from "express";
import ParsePathPipe from "../pipes/parse-path.pipe";
import { FilesDownloadService } from "./files-download.service";

@Controller("/files/download")
export class FilesDownloadController {
  constructor(private filesDownloadService: FilesDownloadService) {
  }

  @Get("/")
  async download(@Query("hash", ParseHashPipe) path: string,
                 @Res() response: Response) {
    return response.sendFile(path);
  }

  @Post("/")
  async generateDownloadHash(@Body("path", ParsePathPipe) path: string) {
    const hash = await this.filesDownloadService.generateDownloadHash(path);

    return { hash };
  }
}
