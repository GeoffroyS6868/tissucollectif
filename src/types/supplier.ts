export type Supplier = {
    _id?: string;
    contract: string;
    name: string;
    website: string;
    email: string;
    phone?: string;
}

export type SupplierCreate = {
    contract?: string;
    name: string;
    website: string;
    email: string;
    phone?: string;
}
