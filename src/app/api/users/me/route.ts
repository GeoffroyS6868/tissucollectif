import { connect } from "@/src/config/db";
import { isValidCookie } from "@/src/utils/token";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {

        await connect();

        const isValid =  (await isValidCookie(request.cookies.get("tissucookie")?.value)).isValid;

        if (isValid) {

            return NextResponse.json({ message: "Cookie is valid" }, { status: 200 });

        } else {

            return NextResponse.json({ error: "Cookie not present in the request headers" }, { status: 401 });

        }

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
