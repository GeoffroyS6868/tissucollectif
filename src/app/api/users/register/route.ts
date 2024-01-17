import { collections, connect } from "@/src/config/db";
import { ContractCreate } from "@/src/types/contract";
import { UserCreate } from "@/src/types/user";
import { getHashPassword } from "@/src/utils/password";
import { NextRequest, NextResponse } from "next/server";

function checkNewUser(user: UserCreate): boolean {
    if (user.email === undefined || user.email === "") {
        return false;
    }
    if (user.lastName === undefined || user.lastName === "") {
        return false;
    }
    if (user.firstName === undefined || user.firstName === "") {
        return false;
    }
    if (user.password === undefined || user.password === "") {
        return false;
    }
    return true
}

export async function POST(request: NextRequest) {
    try {

        await connect();

        let newUser: UserCreate;

        try {
            newUser = await request.json() as UserCreate;
            if (!checkNewUser(newUser)) {
                return NextResponse.json({error: "email, firstName, lastName and password should be defined"}, {status: 400});
            }
        } catch (error: any) {
            return NextResponse.json({error: "email, firstName, lastName and password should be defined"}, {status: 400});
        }

        const user = await collections.users!.findOne({ email: newUser.email });

        if (user !== null) {
            return NextResponse.json({ error: "Email already in use" }, { status: 409 });
        }

        const newContract: ContractCreate = {
            lastName: newUser.lastName!,
            firstName: newUser.firstName!,
            email: newUser.email!
        }
        const contract = await collections.contracts!.insertOne(newContract);

        const hashedPassword: string = getHashPassword(newUser.password!);

        await collections.users!.insertOne({
            contract: contract.insertedId.toString(),
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            password: hashedPassword
        });

        return NextResponse.json({message: "User created successfully"}, {status: 200});

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}