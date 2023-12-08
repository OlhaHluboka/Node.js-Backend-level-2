import express, { Request, Response, Express } from 'express';
import path from 'path';
import bodyParser, { text } from 'body-parser';
import cors from 'cors';
import { MongoClient, Collection, WithId } from "mongodb";
import session, { Store } from 'express-session';
import fileStore, { FileStore } from 'session-file-store';


// Extends module: adds a second field "userLogin" in the main user session object
// that already contains a field "cookies".
declare module 'express-session' {
    interface SessionData {
        userLogin: string
    }
}

const app: Express = express();
const port: number = 3005;
const urlMongo: string = "mongodb://127.0.0.1:27017/";
const client: MongoClient = new MongoClient(urlMongo);
const todoItems: Collection = client.db("todo").collection("items");
const todoCounter: Collection = client.db("todo").collection("counter");
let todoCount: number;
const FileStore: FileStore = fileStore(session);

type Item = {
    id: number,
    text: string,
    checked: boolean
}

type User = {
    name: string,
    pass: string,
    items: Item[]
}

type Counter = {
    counter: number
}


app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../static')));
app.use(cors({

    origin: 'http://localhost:3005',
    credentials: true

}));
app.use(session({
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

        let countBuffer: any = await todoCounter.find().next();

        if (countBuffer === null) {

            todoCount = 0;
            todoCounter.insertOne({ counter: 0 });
        } else {

            todoCount = countBuffer.counter;
        }
        // Creates and listens server in the port specified from index.html
        app.listen(port, () => {
            console.log(`Fourth iteration - deploy users! This server started and is listening the port ${port}`);
        });

    } catch (err) {
        console.log("An error occurred!");
        console.log(err);
    }
}

run();

app.get('/api/v1/items', async (req: Request, res: Response) => { //+

    let user: string | undefined = req.session.userLogin;

    if (user) {
        try {

            let userContain: any = await todoItems.findOne({ name: user });

            res.json({ items: userContain.items });

        } catch (err) {
            res.status(500).send({ "error": `${(err as Error).message}` })
        }

    } else {
        res.status(403).send({ error: 'forbidden' });
    }
});

app.post('/api/v1/items', async (req: Request, res: Response) => {

    try {
        let user: string | undefined = req.session.userLogin;

        if (user) {
            // Pop an object from MongoDB in the buffer variable. (Object is a mongo document). 
            let collectionCounter: any = await todoCounter.findOne();
            todoCount = collectionCounter.counter;
            // Raise up to one
            todoCount++;

            // Changes a value of id in mongodb "todo" collection "counter".
            await todoCounter.updateOne({ counter: todoCount - 1 }, { $set: { counter: todoCount } });

            let newTodo: Item = { id: todoCount, text: req.body.text, checked: false };


            await todoItems.updateOne({ name: user }, { $push: { items: newTodo } });

            // Retrieves a response to frontend client.
            res.json({ id: todoCount });
        } else {
            res.status(401).send('Not found');
        }

    } catch (err) {

        res.status(500).send({ "error ": `${(err as Error).message}` });
    }

});

app.post('/api/v1/register', async (req: Request, res: Response) => {

    try {
        let userLog: string = req.body.login;
        let password: string = req.body.pass;

        let userContain: any = await todoItems.findOne({ name: userLog });

        if (!userContain) {
            let newUser: User = { name: userLog, pass: password, items: [] };
            await todoItems.insertOne(newUser);  //+
            req.session.userLogin = userLog;
            res.json({ ok: true });
        } else {

            res.status(500).send({ error: 'Failed to add user' });

        }

    } catch (err) {
        res.status(500).send({ "error: ": `${(err as Error).message}` });
    }

})

app.post('/api/v1/login', async (req: Request, res: Response) => {
    try {
        let userLog: string = req.body.login;
        let password: string = req.body.pass;

        let userContain: any = await todoItems.findOne({ name: userLog, pass: password });

        if (userContain) {
            req.session.userLogin = userLog;
            res.json({ ok: true });
        } else {

            res.status(401).send('Not found');

        }

    } catch (err) {
        res.status(500).send({ "error: ": `${(err as Error).message}` });
    }

})

app.post('/api/v1/logout', async (req: Request, res: Response) => {

    req.session.destroy((err) => {
        if (err) res.status(500).send({ "error": `${(err as Error).message}` });
        else res.json({ ok: true });
    });

})

app.put('/api/v1/items', async (req: Request, res: Response) => {
    let newText: string = req.body.text;
    let newCheck: boolean = req.body.checked;
    let newItem: Item = req.body;
    let username: string|undefined = req.session.userLogin
    let itemID: number = req.body.id
    try {

        // Buffered variables for recieving a new text and a new checked

        /*   
          let objectDB:any = await todoItems.findOne({name: req.session.userLogin});
          let array:[] = objectDB.items;
          let seekedIndex:number = array.findIndex(({id}) => id === req.body.id);
          let seekedItem:Item = array[seekedIndex]; */

        /* todoList.updateOne({ username }, { $set: { 'items.$[item]': item } },
            { arrayFilters: [{ "item.id": itemID }] }) */

        await todoItems.updateOne({ username },
            { $set: { 'items.$[item].text': newText } },
            { arrayFilters: [{ 'item.id': itemID }] }
        );

    ///    await todoItems.updateOne({name: req.session.userLogin}, {$set: {pass: '456'}}); ///+

        res.json({ ok: true });
    } catch (err) {

        res.status(500).send({ "error": `${(err as Error).message}` });
    }

})

// npm run dev

