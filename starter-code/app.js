const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

// our first Route:
let data = {
  chuckValue: ""
};
app.get('/random', (request, response, next) => {
  client.getRandomJoke().then(response => {
    data.chuckValue = response.value;
  });
   response.render('index.ejs',data);
  next();
});

// Server Started
app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});
