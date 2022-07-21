import React, { useEffect, useContext } from "react";
import AppContext from "..";
import Movie from "./Movie";
import Filter from "./Filter";
import LikeButton from "./LikeButton";
import DislikeButton from "./DislikeButton";
import { useAuth0 } from "@auth0/auth0-react";


function Swiper() {
  const { category, setCategory, movie, setMovie, movies, setMovies, counter, setCounter } = useContext(AppContext);
  const { user } = useAuth0();

  // Defaults to popular movies
  const setUp = () => {
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=2b61576c6129138ce5beeb3937518565&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate')
    .then(res => res.json())
    .then(data => { 
      setMovies(data.results);
      setMovie(movies[counter]);
    });
  }

 
  useEffect(() => {
    fetch('http://localhost:3001/register', {  
      method: 'POST', 
      mode: 'cors', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        user: user.email
        }) 
    })
  }, []);

  // Changes category of films


  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${category}&api_key=2b61576c6129138ce5beeb3937518565&language=en-US`)
      .then(res => res.json())
      .then(data => setMovies(data.results));
  }, [category]);

  // Unsure if this really does anything
  if(category === null){
    <div className="App">
      <Filter setCategory={setCategory}/>
      {movies.map(movie => 
      <Movie key={movie.id} {...movie}/>)}
    </div>
  };

  // Gives us the newt movie after a like
  useEffect(() => {
    const newMovie = movies[counter];
    setMovie(newMovie);
  }, [counter, movies])

  // Increases the counter on click
  const handleClick = () => {
    const newNum = counter + 1;
    setCounter(newNum)
  }

  return (
    <div className="App">
       <Filter />
       {!movie ? setUp() : <Movie key={movie.id} />}
      <LikeButton />
      <DislikeButton />
    </div>
  );
}
export default Swiper;