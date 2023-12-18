"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoCounter = exports.todoItems = exports.client = void 0;
const app_1 = require("./app");
const mongodb_1 = require("mongodb");
const urlMongo = "mongodb://127.0.0.1:27017/";
exports.client = new mongodb_1.MongoClient(urlMongo);
exports.todoItems = exports.client.db("todo").collection("items");
exports.todoCounter = exports.client.db("todo").collection("counter");
let todoCount;
async function run() {
    try {
        // Connecting to the Mongo server
        await exports.client.connect();
        console.log('DB connection established!');
        // If there is no value in the count database we insert zero.
        let countBuffer = await exports.todoCounter.find().next();
        if (countBuffer === null) {
            todoCount = 0;
            exports.todoCounter.insertOne({ counter: 0 });
            // The connection between variable and database value.
        }
        else {
            todoCount = countBuffer.counter;
        }
        app_1.app.listen(app_1.port, () => {
            console.log(`The server started and is listening the port ${app_1.port}`);
        });
    }
    catch (err) {
        console.log("An error occurred!");
        console.log(err);
    }
}
run();
