import express from 'express';
import http from 'http';
import path from 'path'
import cors from 'cors'

const app = express();

const port:number = 3005;

// A built-in intermediary that parses incoming requests into a JSON object.
app.use(express.json());
app.use(express.static(path.join(__dirname, '../static')));

app.use(cors({
  
  origin: 'http://127.0.0.1:3005'

  
}));

const todoList: { items: { id: number, text: string, checked: boolean }[] } 
= { items: [{id:1, text:"coffe", checked: true}] };

// Creates and listens server for HTTP requests (on the task conditions).
let serverHttp = http.createServer(app).listen(port, () => {
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
