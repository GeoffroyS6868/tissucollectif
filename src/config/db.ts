import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { users?: mongoDB.Collection, contracts?: mongoDB.Collection, bales?: mongoDB.Collection, suppliers?: mongoDB.Collection, clothes?: mongoDB.Collection } = {};

function getDbUrl(): string {
    if (process.env.NODE_ENV == "production") {
        return process.env.URL_MONGO || "";
    }
    return process.env.URL_MONGO_TEST || "";
}

async function doesCollectionExist(collectionsList: mongoDB.CollectionInfo[], collectionName: string): Promise<boolean> {
    for (let i = 0; i < collectionsList.length; i += 1) {
        if (collectionsList[i].name === collectionName)
            return true;
    }
    return false;
}

async function createCollectionsIfNotExist(db: mongoDB.Db, collectionsList: (mongoDB.CollectionInfo | Pick<mongoDB.CollectionInfo, "name" | "type">)[]) {
    if (await doesCollectionExist(collectionsList, process.env.USERS_COLLECTION!) === false) {
        await db.createCollection(process.env.USERS_COLLECTION!);
    }

    if (await doesCollectionExist(collectionsList, process.env.CONTRACTS_COLLECTION!) === false) {
        await db.createCollection(process.env.CONTRACTS_COLLECTION!);
    }

    if (await doesCollectionExist(collectionsList, process.env.BALES_COLLECTION!) === false) {
        await db.createCollection(process.env.BALES_COLLECTION!);
    }

    if (await doesCollectionExist(collectionsList, process.env.SUPPLIERS_COLLECTION!) === false) {
        await db.createCollection(process.env.SUPPLIERS_COLLECTION!);
    }

    if (await doesCollectionExist(collectionsList, process.env.CLOTHES_COLLECTION!) === false) {
        await db.createCollection(process.env.CLOTHES_COLLECTION!);
    }
}

export async function connect() {

    if (collections.users !== undefined) {
        return;
    }

    dotenv.config();

    const url: string = getDbUrl();

    const client = new mongoDB.MongoClient(url);

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME!);

    const collectionsList = await db.listCollections().toArray();
    await createCollectionsIfNotExist(db, collectionsList);

    const usersCollection: mongoDB.Collection = db.collection(process.env.USERS_COLLECTION!);
    collections.users = usersCollection;

    const contractsCollection: mongoDB.Collection = db.collection(process.env.CONTRACTS_COLLECTION!);
    collections.contracts = contractsCollection;

    const balesCollection: mongoDB.Collection = db.collection(process.env.BALES_COLLECTION!);
    collections.bales = balesCollection;

    const suppliersCollection: mongoDB.Collection = db.collection(process.env.SUPPLIERS_COLLECTION!);
    collections.suppliers = suppliersCollection;

    const clothesCollection: mongoDB.Collection = db.collection(process.env.CLOTHES_COLLECTION!);
    collections.clothes = clothesCollection;

}
