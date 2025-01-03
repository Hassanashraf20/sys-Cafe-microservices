import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SingupDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  role?: string;
}
