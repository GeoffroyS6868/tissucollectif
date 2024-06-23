import { collections, connect } from "@/src/config/db";
import { Bale } from "@/src/types/bale";
import { ClothCreate } from "@/src/types/cloth";
import { isValidCookie } from "@/src/utils/token";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

function checkNewCloth(cloth: ClothCreate): boolean {
    if (cloth.bale === undefined || cloth.bale === "") {
        return false;
    }

    if (cloth.name === undefined || cloth.name === "") {
        return false;
    }
    return true;
}

export async function POST(request: NextRequest) {
    try {

        await connect();

        const {isValid, token} =  await isValidCookie(request.cookies.get("tissucookie")?.value);

        if (isValid) {

            let newCloth: ClothCreate;

            try {

                newCloth = await request.json() as ClothCreate;

                if (!checkNewCloth(newCloth)) {
                    return NextResponse.json({ error: "bale and name should be defined" }, { status: 400 });
                }

            } catch (error: any) {
                return NextResponse.json({ error: "bale and name should be defined" }, { status: 400 });
            }

            const bale: Bale | null = await collections.bales!.findOne<Bale>({_id: new ObjectId(newCloth.bale)});

            if (bale === null) {
                return NextResponse.json({ error: "Bale doesn't exist" }, { status: 400 });
            }

            const cloth: ClothCreate = {
                bale: newCloth.bale,
                supplier: bale.supplier,
                name: newCloth.name,
                purchaseDate: bale.purchaseDate,
                type: bale.type,
                wear: bale.wear
            }

            const result = await collections.clothes!.insertOne(cloth);

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

                const cloth = await collections.clothes!.findOne<Bale>({_id: new ObjectId(id), contract: token.contract});

                if (!cloth) {
                    return NextResponse.json({ error: "Cloth doesn't exist" }, { status: 404 });
                }

                return NextResponse.json({ cloth: cloth }, { status: 200 });
            }

            const clothes: Bale[] = await collections.clothes!.find<Bale>({contract: token.contract}).toArray();

            return NextResponse.json({ clothes: clothes }, { status: 200 });

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

            const result = await collections.clothes!.findOneAndDelete({_id: new ObjectId(id), contract: token.contract});

            if (!result) {
                return NextResponse.json({error: "Cloth doesn't exist"}, { status: 404 });
            }

            return NextResponse.json({success: true}, { status: 200 });

        } else {

            return NextResponse.json({ error: "Cookie not present in the request headers" }, { status: 401 });

        }

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}