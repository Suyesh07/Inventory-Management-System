import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength,} from "class-validator";

export class CreateUserDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    first_name: string;

    @IsString()
    @MaxLength(30)
    @IsOptional()
    middle_name?: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    last_name: string;

    @IsString()
    @IsEmail()
    @MaxLength(50)
    @IsNotEmpty()
    email: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    password: string;   // string is small in js and capatalized in prisma

    @IsNumber()
    @IsNotEmpty()
    role_id: number;
}
