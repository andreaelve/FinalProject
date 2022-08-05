import express from 'express';
import cors from 'cors';
import fetch from'node-fetch';
import { MongoClient, ServerApiVersion } from 'mongodb';
import bodyParser from 'body-parser';
import path from "path";
import { fileURLToPath } from 'url';
import 'dotenv/config';
// TODO: Make variable accessible in heroku
const url = process.env.DB_URL;
const client = new MongoClient(url,{ useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const PORT = process.env.PORT || 3001;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors());

// Fetches the movies form api
app.get('/movie', async (req, res) => {
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
  res.json(response)
})

// Fetches all lists from the db
app.post('/storedLists', async (req, res) => {
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    const dbo = db.db("movies_db");
    const myquery = { email: req.body.email };
    dbo.collection("movie_collection").findOne(myquery, function(err, result) {
      if (err) throw err;
      res.send(result);
      db.close();
    });
  });
})

// Updates the liked list of the user.
app.post('/addMovie', async (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    const dbo = db.db("movies_db");
    const myquery = { email: req.body.email };
    const newvalues = { 
      $set: { 
        email: req.body.email,
        liked_movies: req.body.likedMovies,
        disliked_movies: req.body.dislikedMovies
      }};
    dbo.collection("movie_collection").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      db.close();     
    })
  });
  return res.send({message:"ok"})
})

// deletes one movie from the list
app.post('/removeMovie', async (req, res) => {
  console.log('remove')
  MongoClient.connect(url, async (err, db) => {
    if (err) throw err;
    try {
      const dbo = db.db("movies_db");
      const movie_db = dbo.collection('movie_collection');
      const my_query = { email: req.body.email };
      const new_values = { 
        $set: { 
          liked_movies: req.body.likedMovies
        }  
      };
      movie_db.updateOne(my_query, new_values);
      await client.close();
    } catch (e) {
      console.log(e.message)
      throw e;
    }
  })
});

// Registers a new user
app.post('/register', async (req, res) => {
  console.log('register');
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    const dbo = db.db("movies_db");
    const myquery = { email: req.body.email };
    dbo.collection("movie_collection").findOne(myquery, function (err, result) {
      console.log(result);
      if (err) throw err;
      if (!result) {
        console.log('making a new one')
        dbo.collection("movie_collection").insertOne({ email: req.body.email, liked_movies: [], disliked_movies: [] }, function (err, result) {
          console.log('tomt')
          if (err) throw err;
          db.close();
        })
      } else {
        res.send(result);
        db.close();
      }
    });
  });
});

// Deletes user from db
// Todo: Make delete in Auth0 too;
app.delete('/deleteuser', async (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    const dbo = db.db("movies_db");
    const myquery = { email: req.body.email };
    dbo.collection("movie_collection").deleteOne(myquery, function(err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      db.close();
    });
  });
});


app.use(express.static(path.join(__dirname, 'static')));
app.get('*', function (req, res) {
  const indexPath = path.join(__dirname, 'static/index.html');
  res.type('html').sendFile(indexPath);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
