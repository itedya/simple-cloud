export class SettingsDto {
  constructor(data) {
    Object.assign(this, data);
  }

  id: number;
  dataPath: string;
  tempPath: string;
  createdAt: Date;
}
