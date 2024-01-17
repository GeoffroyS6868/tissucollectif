export type Contract = {
    _id?: string;
    lastName: string;
    firstName: string;
    email: string;
}

export type ContractCreate = {
    lastName: string;
    firstName: string;
    email: string;
}