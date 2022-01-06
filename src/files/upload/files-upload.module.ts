import { Module } from "@nestjs/common";
import { FilesUploadController } from "./files-upload.controller";
import { CacheModule } from "../../cache/cache.module";
import { FilesUploadService } from "./files-upload.service";

@Module({
  imports: [CacheModule],
  controllers: [FilesUploadController],
  providers: [FilesUploadService],
})
export class FilesUploadModule {

}
