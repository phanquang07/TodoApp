var bodyParser = require('body-parser');
var db = require('mongoose');

// Connect database
db.connect('mongodb://localhost:27017/todoapp');

// Create s Schema
var todoShema = new db.Schema({
  item: String,
});

var Todo = db.model('Todo', todoShema);
var urlendcodedParser = bodyParser.urlencoded({ extended: false });
// var itemFirst = Todo({item: 'learning'}).save(function(err) {
//    if(err) throw err;
//    console.log('Item save succcess!');
// });

// var data = [
//    {item: 'learning'},
//    {item: 'watching tv'},
//    {item: 'go camping'},
// ]

module.exports = function (app) {
  //Show todo
  app.get('/todo', function (req, res) {
    // get data from mongodb and pass it to views directory
    Todo.find({}, function (err, data) {
      if (err) throw err;
      res.render('todo', { todos: data });
    });
  });
  // Fill info todo
  app.post('/todo', urlendcodedParser, function (req, res) {
    var newTodo = Todo(req.body).save(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item', function (req, res) {
    Todo.find({ item: req.params.item.replace(/\-/g, " ") }).remove(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });
}

