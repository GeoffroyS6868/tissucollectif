import { Clothes } from "../enum/clothes";
import { Wear } from "../enum/wear";

const typeArray: string[] = [
    "T-Shirts",
    "Sweaters",
    "Hoodies",
    "Jackets",
    "Puffers",
    "Jeans",
    "Polos",
    "Shors",
    "Cargos",
    "Blazers",
    "Shirts",
    "Sweatpants",
    "Pull",
    "Top",
    "Bottom",
    "Spring",
    "Summer",
    "Fall",
    "Winter",
    "Branded",
    "Vintage"
]

export function typeToString(type: Clothes): string {
    return typeArray[type];
}

const wearArray: string[] = [
    "New",
    "Cream",
    "Grade A",
    "Grade B",
    "Grade C",
    "Grade D"
]

export function wearToString(wear: Wear): string {
    return wearArray[wear];
}