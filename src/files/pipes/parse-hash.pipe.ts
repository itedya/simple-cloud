import { ArgumentMetadata, BadRequestException, CACHE_MANAGER, Inject, PipeTransform } from "@nestjs/common";
import { Cache } from "cache-manager";

export class ParseHashPipe implements PipeTransform {
  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {
  }

  async transform(value: any, metadata: ArgumentMetadata): Promise<string> {
    if (value === undefined) throw new BadRequestException("You have to provide hash!");
    if (typeof value !== "string") throw new BadRequestException("Hash must be a string");

    const path = await this.cacheService.get<string>(`download_link_${value}`);
    if (!path) throw new BadRequestException("Hash is not valid");

    await this.cacheService.del(`download_link_${value}`);

    return path;
  }
}
