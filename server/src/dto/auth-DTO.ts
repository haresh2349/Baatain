import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthDTO {
  @IsEmail({}, { message: "invalid email!" })
  email: string;

  @IsNotEmpty()
  password: string;
}
