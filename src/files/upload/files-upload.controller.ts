import { Controller, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { FilesUploadService } from "./files-upload.service";
import { JwtGuard } from "../../auth/guards/jwt.guard";
import { RequestHeaders } from "../../decorators/request-headers.decorator";
import { StartUploadHeadersDto } from "./dto/start-upload-headers.dto";
import { UploadHeadersDto } from "./dto/upload-headers.dto";
import { ParseUploadUuidPipe } from "./pipes/parse-upload-uuid.pipe";
import { UploadInfoDto } from "./dto/upload-info.dto";
import { PlainBody } from "../../decorators/plain-body.decorator";

@Controller("/files/upload")
export class FilesUploadController {
  constructor(private filesUploadService: FilesUploadService) {
  }

  @UseGuards(JwtGuard)
  @Post("/")
  async uploadStart(@RequestHeaders(StartUploadHeadersDto) headers: StartUploadHeadersDto) {
    const data = await this.filesUploadService.initializeUpload(headers);

    return data.finalUUID;
  }

  @Patch("/")
  async uploadChunk(@RequestHeaders(UploadHeadersDto) headers: UploadHeadersDto,
                    @Query("patch", ParseUploadUuidPipe) uploadData: UploadInfoDto,
                    @PlainBody() data: Buffer) {
    await this.filesUploadService.uploadChunk(headers, uploadData, data);
  }
}
