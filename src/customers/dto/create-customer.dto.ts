import { IsBoolean, IsNotEmpty, isNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCustomerDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsString()
    email?: string;

    @IsNotEmpty()
    @IsNumber()
    phone?: number;

    @IsString()
    @IsNotEmpty()
    street_address?: string;

    @IsNotEmpty()
    @IsString()
    city?: string;

    @IsNotEmpty()
    @IsString()
    province?: string;

    @IsNotEmpty()
    @IsNumber()
    zip_code?: number;

    @IsNotEmpty()
    @IsBoolean()
    is_vendor?: boolean;

}
