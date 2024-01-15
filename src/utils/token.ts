import jwt from "jsonwebtoken";
import { Token } from "../types/token";

export function createSessionToken(id: string): string {
    return jwt.sign({id: id}, process.env.JWT_SECRET!, {expiresIn: "90d"});
}

export function verifySessionToken(token: string): Token {
    const tokendecoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof tokendecoded === "object") {
        return tokendecoded as Token;
    }
    return {id: ""} as Token;
}

