import { BadRequestException } from "@nestjs/common";

export class CredentialsDoesntMatchException extends BadRequestException {
  constructor() {
    super("Credentials doesn't match!");
  }
}
