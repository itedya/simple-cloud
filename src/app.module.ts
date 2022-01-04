import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { SettingsModule } from "./settings/settings.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { FilesModule } from "./files/files.module";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "dist", "client")
    }),
    AuthModule,
    UsersModule,
    SettingsModule,
    FilesModule
  ]
})
export class AppModule {
  // source: https://www.valentinog.com/blog/node-usage/
  constructor() {
    setInterval(() => {
      const used = process.memoryUsage().heapUsed / 1024 / 1024;
      console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
    }, 500);
  }
}
