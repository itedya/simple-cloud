import * as isValid from "is-valid-path";
import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import * as path from "path";

export default class ParsePathPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): string {
    if (value === undefined) return path.sep;
    if (typeof value !== "string") throw new BadRequestException("Path must be a string!");
    if (value.includes("..")) throw new BadRequestException("Whoa! What are you doing!? Don't do that!");
    if (! isValid(value)) throw new BadRequestException("Path is not valid!");

    return value;
  }
}
