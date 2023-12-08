"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = require("mongodb");
const express_session_1 = __importDefault(require("express-session"));
const session_file_store_1 = __importDefault(require("session-file-store"));
const app = (0, express_1.default)();
const port = 3005;
const urlMongo = "mongodb://127.0.0.1:27017/";
const client = new mongodb_1.MongoClient(urlMongo);
const todoItems = client.db("todo").collection("items");
const todoCounter = client.db("todo").collection("counter");
let todoCount;
const FileStore = (0, session_file_store_1.default)(express_session_1.default);
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '../static')));
app.use((0, cors_1.default)({
    origin: 'http://localhost:3005',
    credentials: true
}));
app.use((0, express_session_1.default)({
    store: new FileStore({ retries: 0 }),
    secret: 'verysecretword',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 2 * 60 * 60 * 1000, // 2 hours
    }
}));
async function run() {
    try {
        // Connecting to the Mongo server
        await client.connect();
        console.log('DB connection established!');
        let countBuffer = await todoCounter.find().next();
        if (countBuffer === null) {
            todoCount = 0;
            todoCounter.insertOne({ counter: 0 });
        }
        else {
            todoCount = countBuffer.counter;
        }
        // Creates and listens server in the port specified from index.html
        app.listen(port, () => {
            console.log(`Fourth iteration - deploy users! This server started and is listening the port ${port}`);
        });
    }
    catch (err) {
        console.log("An error occurred!");
        console.log(err);
    }
}
run();
app.get('/api/v1/items', async (req, res) => {
    let user = req.session.userLogin;
    if (user) {
        try {
            let userContain = await todoItems.findOne({ name: user });
            res.json({ items: userContain.items });
        }
        catch (err) {
            res.status(500).send({ "error": `${err.message}` });
        }
    }
    else {
        res.status(403).send({ error: 'forbidden' });
    }
});
app.post('/api/v1/items', async (req, res) => {
    try {
        let user = req.session.userLogin;
        if (user) {
            // Pop an object from MongoDB in the buffer variable. (Object is a mongo document). 
            let collectionCounter = await todoCounter.findOne();
            todoCount = collectionCounter.counter;
            // Raise up to one
            todoCount++;
            // Changes a value of id in mongodb "todo" collection "counter".
            await todoCounter.updateOne({ counter: todoCount - 1 }, { $set: { counter: todoCount } });
            let newTodo = { id: todoCount, text: req.body.text, checked: false };
            await todoItems.updateOne({ name: user }, { $push: { items: newTodo } });
            // Retrieves a response to frontend client.
            res.json({ id: todoCount });
        }
        else {
            res.status(401).send('Not found');
        }
    }
    catch (err) {
        res.status(500).send({ "error ": `${err.message}` });
    }
});
app.post('/api/v1/register', async (req, res) => {
    try {
        let userLog = req.body.login;
        let password = req.body.pass;
        let userContain = await todoItems.findOne({ name: userLog });
        if (!userContain) {
            let newUser = { name: userLog, pass: password, items: [] };
            await todoItems.insertOne(newUser); //+
            req.session.userLogin = userLog;
            res.json({ ok: true });
        }
        else {
            res.status(500).send({ error: 'Failed to add user' });
        }
    }
    catch (err) {
        res.status(500).send({ "error: ": `${err.message}` });
    }
});
app.post('/api/v1/login', async (req, res) => {
    try {
        let userLog = req.body.login;
        let password = req.body.pass;
        let userContain = await todoItems.findOne({ name: userLog, pass: password });
        if (userContain) {
            req.session.userLogin = userLog;
            res.json({ ok: true });
        }
        else {
            res.status(401).send('Not found');
        }
    }
    catch (err) {
        res.status(500).send({ "error: ": `${err.message}` });
    }
});
app.post('/api/v1/logout', async (req, res) => {
    req.session.destroy((err) => {
        if (err)
            res.status(500).send({ "error": `${err.message}` });
        else
            res.json({ ok: true });
    });
});
app.put('/api/v1/items', async (req, res) => {
    let newText = req.body.text;
    let newCheck = req.body.checked;
    let newItem = req.body;
    let username = req.session.userLogin;
    let itemID = req.body.id;
    try {
        // Buffered variables for recieving a new text and a new checked
        /*
          let objectDB:any = await todoItems.findOne({name: req.session.userLogin});
          let array:[] = objectDB.items;
          let seekedIndex:number = array.findIndex(({id}) => id === req.body.id);
          let seekedItem:Item = array[seekedIndex]; */
        /* todoList.updateOne({ username }, { $set: { 'items.$[item]': item } },
            { arrayFilters: [{ "item.id": itemID }] }) */
        /* await todoItems.updateOne({ username },
            { $set: { 'items.$[item].text': newText } },
            { arrayFilters: [{ 'item.id': itemID }] }
        ); */
        await todoItems.updateOne({ name: req.session.userLogin }, { $set: { pass: '456' } });
        res.json({ ok: true });
    }
    catch (err) {
        res.status(500).send({ "error": `${err.message}` });
    }
});
// npm run dev
