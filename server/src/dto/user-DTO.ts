import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
export class UserDTO {
  @IsNotEmpty({ message: "Username is required" })
  username: string;

  @IsEmail({}, { message: "Invalid email format" })
  email: string;

  @MinLength(6, { message: "Password must be at least 6 characters" })
  password: string;

  @IsOptional()
  profilePhoto?: string;
}
