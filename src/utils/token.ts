import jwt from "jsonwebtoken";
import { Token } from "../types/token";
import { User } from "../types/user";
import { collections } from "../config/db";

export function createSessionToken(id: string, contract: string): string {
    return jwt.sign({id: id, contract: contract}, process.env.JWT_SECRET!, {expiresIn: "90d"});
}

export function verifySessionToken(token: string): Token {
    const tokendecoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof tokendecoded === "object") {
        return tokendecoded as Token;
    }
    return {} as Token;
}

export async function isValidCookie(cookie: string | undefined): Promise<{isValid: boolean, token: Token}> {
    if (cookie === undefined || cookie === "") {
        return {isValid: false, token: {}};
    }

    const decodedToken = verifySessionToken(cookie);

    if (decodedToken.id === undefined || decodedToken.id === "" || decodedToken.contract === undefined || decodedToken.contract === "") {
        return {isValid: false, token: {}};
    }

    const user: User = await collections.users!.findOne({}) as unknown as User;

    if (user === null) {
        return {isValid: false, token: {}};
    }

    return {isValid: true, token: decodedToken};
}

