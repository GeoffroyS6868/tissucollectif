import { collections, connect } from "@/src/config/db";
import { Token } from "@/src/types/token";
import { User } from "@/src/types/users";
import { verifySessionToken } from "@/src/utils/token";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await connect();

        const cookieToken: string | undefined = request.cookies.get("tissucookie")?.value;

        if (cookieToken) {

            const token: Token = verifySessionToken(cookieToken);

            if (token.id === undefined || token.id === "") {
                return NextResponse.json({ error: "Invalid user for the provided cookie" }, { status: 401 });
            }

            const user: User = collections.users!.findOne({}) as unknown as User;

            if (user === null) {
                return NextResponse.json({ error: "Invalid user for the provided cookie" }, { status: 401 });
            }

            return NextResponse.json({ message: "Cookie is valid" }, { status: 200 });

        } else {

            return NextResponse.json({ error: "Cookie not present in the request headers" }, { status: 401 });

        }

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
