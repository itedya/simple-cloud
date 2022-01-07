import { IsNotEmpty, IsString, Length, Validate } from "class-validator";
import { PipeValidationValidator } from "../validators/pipe-validation.validator";
import ParsePathPipe from "../pipes/parse-path.pipe";

export class CreateDirectoryDto {
  @IsNotEmpty()
  @IsString()
  @Length(1)
  @Validate(PipeValidationValidator, [ParsePathPipe])
  path: string;

  @IsNotEmpty()
  @IsString()
  @Length(1)
  name: string;
}
