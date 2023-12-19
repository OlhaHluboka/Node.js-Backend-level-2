"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStoreSession = exports.port = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const session_file_store_1 = __importDefault(require("session-file-store"));
exports.app = (0, express_1.default)();
exports.port = 3005;
exports.FileStoreSession = (0, session_file_store_1.default)(express_session_1.default);
exports.app.use(express_1.default.json());
exports.app.use(body_parser_1.default.json());
exports.app.use(express_1.default.static(path_1.default.join(__dirname, '../static')));
exports.app.use((0, cors_1.default)({
    origin: 'http://localhost:3005',
    credentials: true
}));
exports.app.use((0, express_session_1.default)({
    store: new exports.FileStoreSession({ retries: 0 }),
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
exports.app.listen(exports.port, () => {
    console.log(`The server started and is listening the port ${exports.port}`);
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
