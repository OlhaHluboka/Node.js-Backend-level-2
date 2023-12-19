import express, { Express, Request, Response } from 'express';
import path from 'path';
import bodyParser, { text } from 'body-parser';
import cors from 'cors';
import session, { Store } from 'express-session';
import fileStore, { FileStore } from 'session-file-store';
import { login, logout, register } from './Controllers/userController'
import { getItems, editItem, deleteItem, addItem } from './Controllers/itemsController'

declare module 'express-session' {
    export interface SessionData {
        userLogin: string
    }
}

export const app: Express = express();
export const port: number = 3005;
export const FileStoreSession: FileStore = fileStore(session);

app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../static')));
app.use(cors({

    origin: 'http://localhost:3005',
    credentials: true

}));
app.use(session({
    store: new FileStoreSession({ retries: 0 }),
    secret: 'verysecretword',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 2 * 60 * 60 * 1000, // 2 hours
    }
}));

/* app.post('/api/v2/router', (req: Request, res: Response) => {
    let query: string = req.query.action as string
    switch (query) {
        case 'login': {
            login(req, res)
            break;
        }
        case 'logout': {
            logout(req, res)
            break;
        }
        case 'register': {
            register(req, res)
            break;
        }
        case 'getItems': {
            getItems(req, res)
            break;
        }
        case 'deleteItem': {
            deleteItem(req, res)
            break;
        }
        case 'createItem': {
            addItem(req, res)
            break;
        }
        case 'editItem': {
            editItem(req, res)
            break;
        }
        default: res.status(400).send({ error: `Unknown request command: ${query}` })
    }
});
 */
app.listen(port, () => {
    console.log(`The server started and is listening the port ${port}`);
});

// npm run dev

/* async function run() {
    try {
        
        // Creates and listens server in the port specified from index.html
        app.listen(port, () => {
            console.log(`Server started and is listening the port ${port}`);
        });

    } catch (err) {
        console.log("An error occurred!");
        console.log(err);
    }
}
// Run the server.
run(); */