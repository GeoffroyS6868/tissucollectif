import { collections, connect } from "@/src/config/db";
import { User } from "@/src/types/user";
import { getPassword } from "@/src/utils/password";
import { createSessionToken } from "@/src/utils/token";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        await connect();

        const reqBody = await request.json();
        const {email, password} = reqBody;

        if (email === "" || password === "") {
            return NextResponse.json({error: "email and password should be defined"}, {status: 400});
        }

        const user = await collections.users!.findOne({ email: email }) as unknown as User;

        if (user === null || user === undefined || user._id === undefined) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }

        if (getPassword(user.password) !== password) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }

        const token = createSessionToken(user._id, user.contract);

        const response = NextResponse.json({message: "Successfully login"}, {status: 200});

        response.cookies.set("tissucookie", token, {
            httpOnly: true
        });

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}