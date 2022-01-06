import { Controller, Patch, Post, Req } from "@nestjs/common";
import { FilesUploadService } from "./files-upload.service";

@Controller("/files/upload")
export class FilesUploadController {
  constructor(private filesUploadService: FilesUploadService) {
  }

  @Post("/")
  async uploadStart() {
    return this.filesUploadService.generateUUIDForUpload();
  }

  @Patch("/")
  async uploadChunk(@Req() request) {
    console.log()
  }
}
