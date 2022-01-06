import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class StartUploadHeadersDto {
  constructor(data) {
    Object.assign(this, {
      contentLength: data['content-length'],
      uploadLength: data['upload-length']
    });
  }

  @IsNotEmpty({ message: "You have to provide content-length header!" })
  @IsNumberString({ message: "Invalid format in content-length header!" })
  contentLength: string;

  @IsNotEmpty({ message: "You have to provide upload-length header!" })
  @IsNumberString({ message: "Invalid format in upload-length header!" })
  uploadLength: string;
}
