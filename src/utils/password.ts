import Crypto from 'crypto-js';

export function getHashPassword(password: string) : string {
    return Crypto.AES.encrypt(password, process.env.PASSWORD_KEY!).toString();
}

export function getPassword(hashedPassword: string) : string {
    return Crypto.AES.decrypt(hashedPassword, process.env.PASSWORD_KEY!).toString(Crypto.enc.Utf8);
}
