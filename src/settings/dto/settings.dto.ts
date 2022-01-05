export class SettingsDto {
  constructor(data) {
    Object.assign(this, data);
  }

  id: number;
  appVersion: string;
  dataPath: string;
  tempPath: string;
  createdAt: Date;
}
