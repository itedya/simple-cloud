import { Body, Controller, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { FilesUploadService } from "./files-upload.service";
import { JwtGuard } from "../../auth/guards/jwt.guard";
import { RequestHeaders } from "../../decorators/request-headers.decorator";
import { StartUploadHeadersDto } from "./dto/start-upload-headers.dto";

@Controller("/files/upload")
export class FilesUploadController {
  constructor(private filesUploadService: FilesUploadService) {
  }

  @UseGuards(JwtGuard)
  @Post("/")
  async uploadStart(@RequestHeaders(StartUploadHeadersDto) headers: StartUploadHeadersDto) {
    const data = await this.filesUploadService.generateUploadInfo(headers);

    return data.finalUUID;
  }
}
