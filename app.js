var express = require('express');
var morgan = require('morgan');
var todoControllers = require('./controllers/todoController')
var app = express();
var port = 4000;

// HTTP logger
app.use(morgan('combined'));

// Template engine (ejs)
app.set('view engine', 'ejs');

// Static files
app.use(express.static('./public'));

// fire controllers
todoControllers(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})