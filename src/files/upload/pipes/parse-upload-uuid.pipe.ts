import {
  ArgumentMetadata,
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
  PipeTransform
} from "@nestjs/common";
import { Cache } from "cache-manager";
import { UploadInfoDto } from "../dto/upload-info.dto";

@Injectable()
export class ParseUploadUuidPipe implements PipeTransform {
  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {
  }

  async transform(value: any, metadata: ArgumentMetadata): Promise<UploadInfoDto> {
    const upload = await this.cacheService.get<Partial<UploadInfoDto>>(`upload_${value}`);

    if (!upload) throw new BadRequestException("Invalid upload uuid");

    return new UploadInfoDto(upload);
  }
}
