"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const app = (0, express_1.default)();
/* HTTP server */
const portHTTP = 8080;
// A built-in intermediary that parses incoming requests into a JSON object.
app.use(express_1.default.json());
// Creates and listens server for HTTP requests (on the task conditions).
let serverHttp = http_1.default.createServer(app).listen(portHTTP, () => {
    console.log(`Our HTTP server started and is listening the port ${portHTTP}`);
});
// Server responses by sending to client (localhost:8000) files from directory 'public'
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
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
