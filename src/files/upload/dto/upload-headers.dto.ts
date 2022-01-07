import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class UploadHeadersDto {
  constructor(data) {
    Object.assign(this, {
      contentLength: data['content-length'],
      uploadLength: data['upload-length'],
      uploadName: data['upload-name'],
      uploadOffset: data['upload-offset']
    });
  }

  @IsNotEmpty({ message: "You have to provide content-length header!" })
  @IsNumberString({ message: "Invalid format in content-length header!" })
  contentLength: string;

  @IsNotEmpty({ message: "You have to provide upload-length header!" })
  @IsNumberString({ message: "Invalid format in upload-length header!" })
  uploadLength: string;

  @IsNotEmpty({ message: "You have to provide upload-name header!" })
  @IsString({ message: "Invalid format in upload-name header!" })
  uploadName: string;

  @IsNotEmpty({ message: "You have to provide upload-offset header!" })
  @IsNumberString({ message: "Invalid format in upload-offset header!" })
  uploadOffset: string;
}
