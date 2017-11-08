const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', __dirname + '/views');
app.set('view engine','ejs');

// our first Route:
let data = {
  chuckValue: "",
  categoriesValue: "",
  jokeByCategory: "",
  searchValue: ""
};
app.get('/random', (request, response, next) => {
  client.getRandomJoke().then(dataResponse => {
    data.chuckValue = dataResponse.value;
    response.render('index',data);
    next();
  });
});

app.get('/categories', (request, response, next) => {
  let cat = request.query.cat;
  if (!cat){
  client.getJokeCategories().then(dataResponse => {
    data.categoriesValue = dataResponse;
    response.render('categories',data);
    next();
  });
} else {
  client.getRandomJoke(cat).then(dataResponse => {
    console.log(dataResponse);
    data.jokeByCategory = dataResponse.value;
    response.render('joke-by-category',data);
    next();
  });
}
});
app.get('/search', (request, response, next) => {
  response.render('search-form',data);
  next();
});

app.post('/search', (request, response, next) => {
    client.search(request.body.toSearch).then(dataResponse => {
    let random = Math.round(Math.random() * dataResponse.items.length);
    data.searchValue = dataResponse.items[random].value;
    response.render('search-form',data);
    next();
  });
});
// Server Started
app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});
