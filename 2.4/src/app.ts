import express, { Express } from 'express';
import path from 'path';
import bodyParser, { text } from 'body-parser';
import cors from 'cors';
import session, { Store } from 'express-session';
import fileStore, { FileStore } from 'session-file-store';

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