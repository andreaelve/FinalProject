import express from 'express';
import cors from 'cors';
import fetch from'node-fetch';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';
import path, { dirname } from "path";
import { fileURLToPath } from 'url';
const PASSWORD = '1234SALT';
const PORT = process.env.PORT || 5002;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname)

app.use(express.static(path.join(__dirname, "../client", "build")));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors());

app.get('/movie', async (req, res) => {
  const url = "https://api.themoviedb.org/3/discover/movie?with_genres=18&api_key=2b61576c6129138ce5beeb3937518565&language=en-US";
  const option= {
    "method" : "GET",
  }
  const response = await fetch(url, option)
  .then(res => res.json())
  .catch(e => {
    console.log({
      "message" : "oh noes",
      error : e,
    });
  })

  console.log("RESPONSE", response);
  res.json(response)
})

app.post('/storedLists', async (req, res) => {
  console.log('heisann', req.body);
  const uri = 'mongodb+srv://codeClub:'+PASSWORD+'@movie-project.rhbq4r1.mongodb.net/?retryWrites=true&w=majority';
  MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    const dbo = db.db("movies_db");
    const myquery = { user: req.body.user };
    dbo.collection("movie_collection").findOne(myquery, function(err, result) {
      if (err) throw err;
      console.log('hei', result);
      res.send(result);
      db.close();
    });
  });
})

// we should work on this--------------------------------------------
app.post('/register', async (req, res) => {
  console.log('heisann2', req.body);
  const uri = 'mongodb+srv://codeClub:'+PASSWORD+'@movie-project.rhbq4r1.mongodb.net/?retryWrites=true&w=majority';
  MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    const dbo = db.db("movies_db");
    dbo.collection("movie_collection").insertOne({user: res.body, liked_movies: [], disliked_movies: []}, function (err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    })
  });
})

// Get for the initial setup when a user logs in. 

// If user does not exists yet, we should have a post for making a user in the database. 

// Updates the liked list of the user.
// There's a problem with the database. Maybe because the user does not exist in the database yet.
 app.post('/movie', async (req, res) => {
  console.log('heisann', req.body);
  const uri = 'mongodb+srv://codeClub:'+PASSWORD+'@movie-project.rhbq4r1.mongodb.net/?retryWrites=true&w=majority';
  console.log('yo')
  MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    const dbo = db.db("movies_db");
    const myquery = { user: req.body.user };
    console.log('wwwwwwww', req.body)
    const newvalues = { $set: { user_name: req.body.user ,liked_movies: req.body.likedMovies,  disliked_movies: req.body.dislikedMovies}  };
    dbo.collection("movie_collection").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
      console.log('closed');
    });
  });
})



// app.post('/movie', async (req, res) => {
//   console.log('heisann', req.body);
//   const uri = 'mongodb+srv://codeClub:'+PASSWORD+'@movie-project.rhbq4r1.mongodb.net/?retryWrites=true&w=majority';
//   console.log('yo')
//   MongoClient.connect(uri, function(err, db) {
//     if (err) throw err;
//     const dbo = db.db("movies_db");
//     const myquery = { user: req.body.user };
//     const newvalues = { $set: { disliked_movies: req.body.disliked_movies } };
//     dbo.collection("movie_collection").updateOne(myquery, newvalues, function(err, res) {
//       if (err) throw err;
//       console.log("1 document updated");
//       db.close();
//       console.log('dislikeeeeeee', newvalues);
//     });
//   });
// })

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'static/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
