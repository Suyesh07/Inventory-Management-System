import { Item } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export class ItemEntity implements Item {
    user_id: number;
    id: number;
    name: string;
    description: string;
    quantity: number;
    price: Decimal;
    created_at: Date;
    updated_at: Date;
    discount: Decimal;
}
