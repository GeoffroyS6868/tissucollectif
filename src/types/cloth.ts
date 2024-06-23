import { Clothes } from "../enum/clothes";
import { Wear } from "../enum/wear";

export type Cloth = {
    _id: string;
    bale: string;
    supplier: string;
    name: string;
    purchaseDate: string;
    saleDate?: string;
    buyPrice: number;
    sellPrice?: number;
    profit?: number;
    profitInPercent?: number;
    type: Clothes;
    wear: Wear;
}

export type ClothCreate = {
    bale?: string;
    supplier?: string;
    name?: string;
    purchaseDate?: string;
    saleDate?: string;
    buyPrice?: number;
    sellPrice?: number;
    profit?: number;
    profitInPercent?: number;
    type?: Clothes;
    wear?: Wear;
}
