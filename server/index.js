import express from 'express';
import cors from 'cors';
import fetch from'node-fetch';
import { MongoClient, ServerApiVersion } from 'mongodb';
import bodyParser from 'body-parser';
import path from "path";
import { fileURLToPath } from 'url';
const PASSWORD = 'M3Gj5PNCsHH4fY5K';
const uri = `mongodb+srv://codeClub:${PASSWORD}@movie-project.rhbq4r1.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri,{ useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
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
  res.json(response)
})

// Fetches all lists from the db
app.post('/storedLists', async (req, res) => {
  const uri = `mongodb+srv://codeClub:${PASSWORD}@movie-project.rhbq4r1.mongodb.net/?retryWrites=true&w=majority`;
    MongoClient.connect(uri, function(err, db) {
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
app.post('/movie', async (req, res) => {
  const uri = 'mongodb+srv://codeClub:'+PASSWORD+'@movie-project.rhbq4r1.mongodb.net/?retryWrites=true&w=majority';
  MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    const dbo = db.db("movies_db");
    const myquery = { email: req.body.email };
    const newvalues = { $set: { email: req.body.email ,
      liked_movies: req.body.likedMovies,
        disliked_movies: req.body.dislikedMovies}  
      };
    dbo.collection("movie_collection").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();     
      console.log('closed');
    });
    
  });
  return res.send({message:"ok"})
})

// deletes one movie from the list
app.post('/remove-movie', async (req,res)=>{
  const uri = 'mongodb+srv://codeClub:'+PASSWORD+'@movie-project.rhbq4r1.mongodb.net/?retryWrites=true&w=majority';
  MongoClient.connect(uri, async (err, db) => {
    if (err) throw err;
    try {
      const dbo = db.db("movies_db");
      const movie_db = dbo.collection('movie_collection')
      const my_query = {email: req.body.email};
      const exists = await movie_db.findOne(my_query);
      let result = null;
      if (exists) {
        const {id, from} = req.body;
        let likedMovies = exists.liked_movies;
        if (from === 'like') {
          let liked = likedMovies.findIndex((movie) => movie.id === id)
          if (liked > -1) {
            likedMovies.splice(liked, 1)
          }
        }
        const new_values = { $set: { liked_movies: likedMovies}  };
        await movie_db.updateOne(my_query, new_values);
        result = {
          liked: likedMovies,
        }
      }
      await client.close();
      return res.json(result);
    } catch (e) {
      console.log(e.message)
      throw e;
    }
  })
});

// Registers a new user
app.post('/register', async (req, res) => {
  const uri = 'mongodb+srv://codeClub:' + PASSWORD + '@movie-project.rhbq4r1.mongodb.net/?retryWrites=true&w=majority';
  MongoClient.connect(uri, function (err, db) {
    if (err) throw err;
    const dbo = db.db("movies_db");
    const myquery = { email: req.body.email };
    dbo.collection("movie_collection").findOne(myquery, function (err, result) {
      if (err) throw err;
      if (!result) {
        dbo.collection("movie_collection").insertOne({ email: req.body.email, liked_movies: [], disliked_movies: [] }, function (err, result) {
          console.log('new user')
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
app.delete('/deleteuser', async (req, res) => {
  const uri = 'mongodb+srv://codeClub:' + PASSWORD + '@movie-project.rhbq4r1.mongodb.net/?retryWrites=true&w=majority';
  MongoClient.connect(uri, function(err, db) {
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
