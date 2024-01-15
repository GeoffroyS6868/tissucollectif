import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { users?: mongoDB.Collection } = {};

export async function connect() {

    if (collections.users !== undefined) {
        return;
    }

    dotenv.config();

    const url: string = process.env.URL_MONGO_TEST || "";

    const client = new mongoDB.MongoClient(url);

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME!);

    const usersCollection: mongoDB.Collection = db.collection(process.env.USERS_COLLECTION!);

    collections.users = usersCollection;

}
