import { collections, connect } from "@/src/config/db";
import { Bale, BaleCreate } from "@/src/types/bale";
import { isValidCookie } from "@/src/utils/token";
import { NextRequest, NextResponse } from "next/server";

function checkNewBale(bale: BaleCreate): boolean {
    if (bale.supplier === undefined || bale.supplier === "") {
        return false;
    }
    if (bale.price === undefined) {
        return false;
    }
    if (bale.purchaseDate === undefined || bale.purchaseDate === "") {
        return false;
    }
    if (bale.type === undefined || bale.wear === undefined) {
        return false
    }
    return true;
}

export async function POST(request: NextRequest) {
    try {

        await connect();

        const {isValid, token} =  await isValidCookie(request.cookies.get("tissucookie")?.value);

        if (isValid) {

            let newBale: BaleCreate;

            try {

                newBale = await request.json() as BaleCreate;

                if (!checkNewBale(newBale)) {
                    return NextResponse.json({ error: "supplier, purchaseDate, price, type and wear should be defined" }, { status: 400 });
                }

            } catch (error: any) {
                return NextResponse.json({ error: "supplier, purchaseDate, price, type and wear should be defined" }, { status: 400 });
            }

            const bale: BaleCreate = {
                contract: token.contract!,
                purchaseDate: newBale.purchaseDate!,
                saleDate: newBale.saleDate || "",
                supplier: newBale.supplier!,
                price: newBale.price!,
                type: newBale.type!,
                wear: newBale.wear!,
            }

            const result = await collections.bales!.insertOne(bale);

            return NextResponse.json({ message: "Bale has been successfully created", id: result.insertedId.toString() }, { status: 200 });

        } else {

            return NextResponse.json({ error: "Cookie not present in the request headers" }, { status: 401 });

        }

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {

        await connect();

        const {isValid, token} =  await isValidCookie(request.cookies.get("tissucookie")?.value);

        if (isValid) {

            const bales: Bale[] = await collections.bales!.find<Bale>({ contract: token.contract }).toArray();

            return NextResponse.json({ bales: bales }, { status: 200 });

        } else {

            return NextResponse.json({ error: "Cookie not present in the request headers" }, { status: 401 });

        }

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
