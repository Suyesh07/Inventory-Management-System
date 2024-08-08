import { CostumerVender } from "@prisma/client";

export class CustomerEntity implements CostumerVender {
    id: number;
    name: string;
    email: string;
    phone: number;
    street_address: string;
    city: string;
    province: string;
    zip_code: number;
    is_vender: boolean;
}
