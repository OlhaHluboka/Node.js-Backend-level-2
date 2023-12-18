"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const session_file_store_1 = __importDefault(require("session-file-store"));
exports.app = (0, express_1.default)();
exports.port = 3005;
const FileStoreSession = (0, session_file_store_1.default)(express_session_1.default);
exports.app.use(express_1.default.json());
exports.app.use(body_parser_1.default.json());
exports.app.use(express_1.default.static(path_1.default.join(__dirname, '../static')));
exports.app.use((0, cors_1.default)({
    origin: 'http://localhost:3005',
    credentials: true
}));
exports.app.use((0, express_session_1.default)({
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
