import { collections, connect } from "@/src/config/db";
import { Supplier, SupplierCreate } from "@/src/types/supplier";
import { isValidCookie } from "@/src/utils/token";
import { NextRequest, NextResponse } from "next/server";

function checkNewSupplier(supplier: SupplierCreate): boolean {
    if (supplier.email === undefined || supplier.email === "") {
        return false;
    }
    if (supplier.name === undefined || supplier.name === "") {
        return false;
    }
    if (supplier.website === undefined || supplier.website === "") {
        return false;
    }
    return true;
}

export async function POST(request: NextRequest) {
    try {

        await connect();

        const {isValid, token} =  await isValidCookie(request.cookies.get("tissucookie")?.value);

        if (isValid) {

            let newSupplier: SupplierCreate;

            try {

                newSupplier = await request.json() as SupplierCreate;

                if (!checkNewSupplier(newSupplier)) {
                    return NextResponse.json({ error: "name, website and email should be defined" }, { status: 400 });
                }

            } catch (error: any) {
                return NextResponse.json({ error: "name, website and email should be defined" }, { status: 400 });
            }

            const oldSuppliers = await collections.suppliers!.findOne({$or : [{'website': newSupplier.website}, {'email': newSupplier.email}]});

            if (oldSuppliers !== undefined && oldSuppliers !== null) {
                return NextResponse.json({ error: "Supplier already exists" }, { status: 409 });
            }

            newSupplier.contract = token.contract;

            const result = await collections.suppliers!.insertOne(newSupplier);

            return NextResponse.json({ message: "Supplier has been successfully created", id: result.insertedId.toString() }, { status: 200 });

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

            const name: string | null = request.nextUrl.searchParams.get("name");

            if (name !== null) {

                const suppliers = await collections.suppliers!.find<Supplier>({ name: { $regex: new RegExp(name, 'i') }, contract: token.contract }).toArray();

                return NextResponse.json({ suppliers: suppliers }, { status: 200 });

            }

            const suppliers = await collections.suppliers!.find<Supplier>({}).toArray();

            return NextResponse.json({ suppliers: suppliers }, { status: 200 });

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

        if (await isValidCookie(request.cookies.get("tissucookie")?.value)) {



        } else {

            return NextResponse.json({ error: "Cookie not present in the request headers" }, { status: 401 });

        }

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
