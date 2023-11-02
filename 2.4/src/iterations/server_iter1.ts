import express from 'express';
import http from 'http';
import path from 'path';
import bodyParser, { text } from 'body-parser';
import cors from 'cors'

const app = express();
const jsonParser = bodyParser.json();

const port:number = 3005;

// A built-in intermediary that parses incoming requests into a JSON object.
app.use(express.json());
app.use(express.static(path.join(__dirname, '../static')));

//app.use(express.static('/static'));

/* app.use(cors({
  
  origin: 'http://127.0.0.1:3005'
  
}));
 */

// Entity (or module) for first iteration api when we save data in the memory of computer (in array of Objects)
const todoList: { items: { id: number, text: string, checked: boolean }[] } = { items:[] };

// We need to define a new Id to new task every time.
let todoId = 0;

// Creates and listens server in the port specified from index.html
let serverHttp = http.createServer(app).listen(port, () => {
    console.log(`Our HTTP server started and is listening the port ${port}`);
});

// The first route for entity "Todo list". Retrieves to front all todo list and it shows it in browsers.  
app.get('/api/v1/items', (req, res) => { 

  res.send(JSON.stringify(todoList));   
});

// The second route of todo app. Add the new task in the array (for iteration 1 - in memory of computer.)
// Retrieves to front the new ID of Task.
app.post('/api/v1/items', jsonParser, (req, res) => {

 todoList.items.push({id:++todoId, text:req.body.text, checked: true });

 res.send(JSON.stringify({id:todoId}));
});

// The third route of todo app. Changes a text in the task received from front. Retrieves to front an 
// object {ok: true} 
app.put('/api/v1/items2', jsonParser, (req, res) => {
  
  // Fields for new information from the front.
  let newText:string = req.body.text;
  let newCheck:boolean = req.body.checked;

  // Find the task in our memory structure - array.
  let indexOfTask:number = todoList.items.findIndex((item) => item.id === req.body.id);

  // Changes properties in our object.
  todoList.items[indexOfTask].text = newText;
  todoList.items[indexOfTask].checked = newCheck;

  res.send (JSON.stringify({ok: true}));

})

app.delete('/api/v1/items2', (req, res) => {

  // Find the task in our memory structure - array.
  let index:number = todoList.items.findIndex((item) => item.id === req.body.id);

  // Deletes from array this task.
  todoList.items.splice(index, 1);

  res.send (JSON.stringify({ok: true}));
})

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
