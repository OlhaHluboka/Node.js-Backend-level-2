"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const jsonParser = body_parser_1.default.json();
const port = 3005;
// A built-in intermediary that parses incoming requests into a JSON object.
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '../static')));
//app.use(express.static('/static'));
/* app.use(cors({
  
  origin: 'http://127.0.0.1:3005'
  
}));
 */
// Entity (or module) for first iteration api when we save data in the memory of computer (in array of Objects)
const todoList = { items: [] };
// We need to define a new Id to new task every time.
let todoId = 0;
// Creates and listens server in the port specified from index.html
let serverHttp = http_1.default.createServer(app).listen(port, () => {
    console.log(`Our HTTP server started and is listening the port ${port}`);
});
// The first route for entity "Todo list". Retrieves to front all todo list and it shows it in browsers.  
app.get('/api/v1/items', (req, res) => {
    res.send(JSON.stringify(todoList));
});

app.post('/api/v1/items', jsonParser, (req, res) => {
    todoList.items.push({ id: ++todoId, text: req.body.text, checked: true });
    res.send(JSON.stringify({ id: todoId }));
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
//  npm run start
