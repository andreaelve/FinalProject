import { MongoClient } from 'mongodb';
import { useInRouterContext } from 'react-router-dom';


const PASSWORD = 'M3Gj5PNCsHH4fY5K';
const uri = 'mongodb+srv://codeClub:'+PASSWORD+'@movie-project.rhbq4r1.mongodb.net/?retryWrites=true&w=majority';

async function main() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        await createListing(client,
          {
            user: "andreaelvegard@gmail.com",
            liked_movies: [
            ],
            disliked_movies: [

            ]
          }
        )
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function createListing(client, newListing){
  const result = await client.db("movies_db").collection("movie_collection").insertOne(newListing);
  console.log(`Added a new movie for user ${newListing.user} to the database!`);
}

const addMovie = () => {
  MongoClient.connect(uri, function(err, db) {
  if (err) throw err;
  const dbo = db.db("movies_db");
  const myquery = { user: "user1@gmail.com" };
  const newValues = { $set: { liked_movies: {
     name: "The Karate Kid 2",
     summary: "After some violent confrontations with his new classmates, Daniel LaRusso learns karate from Japanese handyman Mr. Miyagi, in order to defend himself.",
     img: 'someurlstringhere',
     gene: [1, 22, 48],
     userScore: 72,
     id: 1671
  } } };
  dbo.collection("movie_collection").updateOne(myquery, newValues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
  });
  });
}

// addMovie();

const deleteUser = () => {
  const uri = 'mongodb+srv://codeClub:'+PASSWORD+'@movie-project.rhbq4r1.mongodb.net/?retryWrites=true&w=majority';
  MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    const dbo = db.db("movies_db");
    const myquery = { user: "andreaelvegard@gmail.com" };
    dbo.collection("movie_collection").deleteOne(myquery, function(err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      db.close();
    });
  });
}

// deleteUser();

// function create(user, callback) {
//   const bcrypt = require('bcrypt');
//   const MongoClient = require('mongodb@3.1.4').MongoClient;
//   const client = new MongoClient('mongodb+srv://codeClub:1234SALT@movie-project.rhbq4r1.mongodb.net/?retryWrites=true&w=majority');

//   client.connect(function (err) {
//     if (err) return callback(err);

//     const db = client.db('movies_db');
//     const users = db.collection('movie_collection');

//     users.findOne({ email: user.email }, function (err, withSameMail) {
//       if (err || withSameMail) {
//         client.close();
//         return callback(err || new Error('the user already exists'));
//       }

//       bcrypt.hash(user.password, 10, function (err, hash) {
//         if (err) {
//           client.close();
//           return callback(err);
//         }

//         user.password = hash;
//         users.insert(user, function (err, inserted) {
//           client.close();

//           if (err) return callback(err);
//           callback(null);
//         });
//       });
//     });
//   });
// }

