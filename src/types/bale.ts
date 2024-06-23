import { Clothes } from "../enum/clothes";
import { Wear } from "../enum/wear";

export type Bale = {
    _id: string;
    contract: string;
    purchaseDate: string;
    saleDate?: string;
    supplier: string;
    supplierName: string;
    price: number;
    type: Clothes;
    wear: Wear;
    amount?: number;
    pricePer?: number;
}

export type BaleCreate = {
    contract?: string;
    purchaseDate?: string;
    saleDate?: string;
    supplier?: string;
    supplierName?: string;
    price?: number;
    type?: Clothes;
    wear?: Wear;
    pricePer?: number;
}

export type BaleEdit = {
    id?: string;
    contract?: string;
    purchaseDate?: string;
    saleDate?: string;
    supplier?: string;
    supplierName?: string;
    price?: number;
    type?: Clothes;
    wear?: Wear;
    pricePer?: number;
}

export type BalesListRow = {
    _id: string;
    purchaseDate: string;
    supplierName: string;
    price: number;
    wear: Wear;
    type: Clothes;
}
