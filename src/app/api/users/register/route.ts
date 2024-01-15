import { collections, connect } from "@/src/config/db";
import { getHashPassword } from "@/src/utils/password";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        await connect();

        const reqBody = await request.json();
        const {firstName, lastName, email, password} = reqBody;

        if (firstName === "" || lastName === "" || email === "" || password === "") {
            return NextResponse.json({error: "email, firstName, lastName and password should be defined"}, {status: 400});
        }

        const user = await collections.users!.findOne({ email: email });

        if (user !== null) {
            return NextResponse.json({ error: "Email already in use" }, { status: 409 });
        }

        const hashedPassword: string = getHashPassword(password);

        await collections.users!.insertOne({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword
        });

        return NextResponse.json({message: "User created successfully"}, {status: 200});

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}