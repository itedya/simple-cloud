import { Exclude } from "class-transformer";

export class UserDto {
  constructor(data) {
    Object.assign(this, data);
  }

  id: number;

  username: string;

  @Exclude()
  password: string;

  createdAt: Date;
}
