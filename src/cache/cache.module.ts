import { Module, CacheModule as NestCacheModule } from "@nestjs/common";

@Module({
  imports: [NestCacheModule.register()],
  exports: [NestCacheModule]
})
export class CacheModule {
}
