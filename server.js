const { json } = require('express');
const express = require('express'); 
const app = express();
 
 
// Need to import Express libraries to read POST body data (e.g. req.body)
app.use(express.json());             
app.use(express.urlencoded());

let users = [ 
  { id: 1, unit: 'sit714'}, 
  { id: 2, unit: 'sit737'}, 
  { id: 3, unit: 'sit782'},
  { id: 4, unit: 'sit740'},
  { id: 5, unit: 'sit753'},
]; 

http://localhost:3000/
app.get('/', (req, res) => { 
  res.send("Welcome to my Web Page");
}); 
 
http://localhost:3000/users
app.get('/users', (req, res) => { 
  res.json(users); 
}); 

app.get('/users/:id', function(req, res) {
    console.log("User ID " + req.params.id + " requested");
    var userID = req.params.id;
    var userFound = false;

    users.forEach((user, index, array) => {
        if (user.id == userID) {
            res.send(users[index]);
            userFound = true;
        }
    });

    if (userFound == false) {
        res.send("ERROR: User with ID " + userID + " does not exist");
    }
});

app.post('/users', (req, res) => {

  if (req.body === undefined) {
    
    console.log("ERROR: req.body is undefined");
    res.status(400).send("ERROR: req.body is undefined");
  } 
  else {
    
    userData = JSON.stringify(req.body);
    console.log("Adding new user with data: " + userData);
 
    const newUser = req.body; 
    users.push(newUser); 
    res.status(201).json(newUser); 
  }
  
}); 

app.put('/users/:id', (req, res) => { 

  const userId = parseInt(req.params.id); 
  console.log("Update user with ID: " + req.params.id);

  const updatedUser = req.body; 

  users = users.map(user => user.id === userId ? updatedUser : user); 
  res.status(200).json(updatedUser); 
}); 

app.delete('/users/:id', (req, res) => { 
  
  const userId = parseInt(req.params.id);

  
  users = users.filter(user => user.id !== userId); 
  res.status(204).send(); 
}); 

app.listen(8080, () => { 
  console.log('Server is listening on port 8080'); 
}); 