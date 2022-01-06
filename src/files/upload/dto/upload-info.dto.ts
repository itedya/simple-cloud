export class UploadInfoDto {
  constructor(data = undefined) {
    if (data) {
      Object.assign(this, {
        ...data,
        uploadLength: parseInt(data.uploadLength)
      });
    }
  }

  timestamp: number;

  randomIdentifier: string;

  uploadLength: number;

  finalUUID: string;
}
