"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3005;
// A built-in intermediary that parses incoming requests into a JSON object.
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '../static')));
app.use((0, cors_1.default)({
    origin: 'http://127.0.0.1:3005'
}));
const todoList = { items: [{ id: 1, text: "coffe", checked: true }] };
// Creates and listens server for HTTP requests (on the task conditions).
let serverHttp = http_1.default.createServer(app).listen(port, () => {
    console.log(`Our HTTP server started and is listening the port ${port}`);
});
// Server responses by sending to client (localhost:8000) files from directory 'public'
app.get('/api/v1/items', (req, res) => {
    res.send(JSON.stringify(todoList));
});
// Function to gracefully shutdown the server
function shutdownServer() {
    serverHttp.close(() => {
        console.log('Server is shutting down.');
        process.exit(0);
    });
}
// Listen for SIGINT signal (Ctrl+C) to initiate server shutdown
process.on('SIGINT', shutdownServer);
// npm run build && npm run runServer
