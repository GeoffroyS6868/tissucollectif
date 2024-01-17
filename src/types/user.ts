export type User = {
    _id?: string;
    contract: string;
    lastName: string;
    firstName: string;
    email: string;
    password: string;
}

export type UserCreate = {
    contract?: string;
    lastName?: string;
    firstName?: string;
    email?: string;
    password?: string;
}
