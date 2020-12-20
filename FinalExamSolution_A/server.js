var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var pgp = require('pg-promise')();

const dbConfig = {
	host: 'localhost',
	port: 5432,
	database: 'movie_reviews',
	user: 'postgres',
	password: 'pwd'
};

var db = pgp(dbConfig);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));

app.get('/home', function(req,res){
  res.render('pages/main',{
    my_title: 'Home Page'
  })
});

app.post('/addReview', function(req,res){
  var title = req.body.movie_name;
  var review = req.body.review;
  //getting date for insert
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  var timestamp = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

  var insert_query = `insert into reviews(title, review, review_date) values ('${title}', '${review}', '${timestamp}');`
	var select_query = `select * from reviews;`;
  // console.log(query);
	db.task('get-everything', task => {
        return task.batch([
            task.any(insert_query),
            task.any(select_query)
        ]);
    })
  .then(data => {
    res.render('pages/reviews',{
      my_title: 'Movie Reviews',
			data: data[1]
    })
  })
  .catch(err => {
    console.log(err);
  });
});

app.get('/getReviews', function(req,res){
  var query = `select * from reviews;`;
  db.any(query)
  .then(data => {
    res.render('pages/reviews',{
      my_title: 'Movie Reviews',
      data:data
    })
  })
  .catch(err => {
    console.log("Error: "+err);
  });
});

console.log("app is listening on port: 8000")
app.listen(8000);
