import { app, port } from "./app";
import { MongoClient, Collection } from "mongodb";

const urlMongo: string = "mongodb://127.0.0.1:27017/";
export const client: MongoClient = new MongoClient(urlMongo);
export const todoItems: Collection = client.db("todo").collection("items");
export const todoCounter: Collection = client.db("todo").collection("counter");
let todoCount: number;

async function run() {
    try {
        // Connecting to the Mongo server
        await client.connect();

        console.log('DB connection established!');

        // If there is no value in the count database we insert zero.
        let countBuffer: any = await todoCounter.find().next();

        if (countBuffer === null) {

            todoCount = 0;
            todoCounter.insertOne({ counter: 0 });
        
        // The connection between variable and database value.
        } else {

            todoCount = countBuffer.counter;
        }
        app.listen(port, () => {
            console.log(`The server started and is listening the port ${port}`);
        });
        

    } catch (err) {
        console.log("An error occurred!");
        console.log(err);
    }
}

run();


