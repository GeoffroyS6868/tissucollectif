import { collections, connect } from "@/src/config/db";
import { Bale, BaleCreate, BaleEdit } from "@/src/types/bale";
import { Supplier } from "@/src/types/supplier";
import { isValidCookie } from "@/src/utils/token";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

interface BaleMongoQuery {
    contract: string,
    supplier?: string
}

async function getBales(contract: string, supplier: string | null): Promise<Bale[]> {

    let mongoQuery: BaleMongoQuery = { contract: contract };

    if (supplier !== null) {
        mongoQuery.supplier = supplier;
    }

    return await collections.bales!.find<Bale>({ contract: contract }).toArray();
}

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

            const supplier: Supplier | null = await collections.suppliers!.findOne<Supplier>({_id: new ObjectId(newBale.supplier)});

            if (supplier === null) {
                return NextResponse.json({ error: "Supplier doesn't exist" }, { status: 400 });
            }

            const bale: BaleCreate = {
                contract: token.contract!,
                purchaseDate: newBale.purchaseDate!,
                saleDate: newBale.saleDate || "",
                supplier: newBale.supplier!,
                supplierName: supplier.name,
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

            const id: string | null = request.nextUrl.searchParams.get("id");

            if (id) {

                const bale = await collections.bales!.findOne<Bale>({_id: new ObjectId(id), contract: token.contract});

                if (!bale) {
                    return NextResponse.json({ error: "Bale doesn't exist" }, { status: 404 });
                }

                return NextResponse.json({ bale: bale }, { status: 200 });
            }

            const supplier: string | null = request.nextUrl.searchParams.get("supplier");

            const bales: Bale[] = await getBales(token.contract!, supplier);

            return NextResponse.json({ bales: bales }, { status: 200 });

        } else {

            return NextResponse.json({ error: "Cookie not present in the request headers" }, { status: 401 });

        }

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {

        await connect();

        const {isValid, token} =  await isValidCookie(request.cookies.get("tissucookie")?.value);

        if (isValid) {

            let bale: BaleEdit;

            try {

                bale = await request.json() as BaleEdit;

                if (!bale.id) {
                    return NextResponse.json({ error: "id should be defined" }, { status: 400 });
                }

            } catch (error: any) {
                return NextResponse.json({ error: "id should be defined" }, { status: 400 });
            }

            /*const result = collections.bales!.findOneAndUpdate({_id: new ObjectId(bale.id), contract: token.contract}, {
                $set: {}
            });

            if (!result) {
                return NextResponse.json({error: "bale doesn't exist"}, { status: 404 });
            }*/

            return NextResponse.json({success: true}, { status: 200 });

        } else {

            return NextResponse.json({ error: "Cookie not present in the request headers" }, { status: 401 });

        }

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {

        await connect();

        const {isValid, token} =  await isValidCookie(request.cookies.get("tissucookie")?.value);

        if (isValid) {

            const id: string | null = request.nextUrl.searchParams.get("id");

            if (!id) {
                return NextResponse.json({error: "id should be defined in the url"}, { status: 400 });
            }

            const result = await collections.bales!.findOneAndDelete({_id: new ObjectId(id), contract: token.contract});

            if (!result) {
                return NextResponse.json({error: "bale doesn't exist"}, { status: 404 });
            }

            return NextResponse.json({success: true}, { status: 200 });

        } else {

            return NextResponse.json({ error: "Cookie not present in the request headers" }, { status: 401 });

        }

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}