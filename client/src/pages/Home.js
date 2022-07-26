import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useRef, useState } from "react";
import ButtonSection from "../components/ButtonSection";
import "../App.css"

const Home = ({ dislikedMovies,  setDislikedMovies, likedMovies,  setLikedMovies }) => {
  const { user } = useAuth0();
  const [ category, setCategory ] = useState(null);
  const [ counter, setCounter ] = useState(0);
  const [ movies, setMovies ] = useState([]);
  const [ movie, setMovie ] = useState(movies[counter]);
  const info = useRef(null)
  const image = useRef(null)

  useEffect(() => {
     // Defaults to popular movies
     fetch('https://api.themoviedb.org/3/discover/movie?api_key=2b61576c6129138ce5beeb3937518565&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate')
      .then(res => res.json())
      .then(data => {
        let nope = data.results.map(el => {
          if(!dislikedMovies.find(movie => movie.id === el.id)){
            if(!likedMovies.find(movie => movie.id === el.id)){
              return el;
          }}
          
        });
        console.log('hei')
        setMovies(nope.filter(el => el !== undefined));});
  }, [likedMovies]);

  // useEffect(() => {
  //   // Defaults to popular movies
  //   fetch('https://api.themoviedb.org/3/discover/movie?api_key=2b61576c6129138ce5beeb3937518565&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate')
  //   .then(res => res.json())
  //   .then(data => { 
  //     console.log(data.results)
  //     let nope = data.results.filter(el => dislikedMovies.find(movie => movie.id === !el.id));
  //     nope.push(data.results.filter(el => likedMovies.find(movie => movie.id === !el.id))) 
  //     console.log('nope', nope);
  //     setMovies(nope);
  //   });
  // }, [])

  useEffect(() => {
    setMovie(movies[counter]);
  }, [movies, counter])

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${category}&api_key=2b61576c6129138ce5beeb3937518565&language=en-US`)
      .then(res => res.json())
      .then(data => {
        let nope = data.results.map(el => {
          if(!dislikedMovies.find(movie => movie.id === el.id)){
            if(!likedMovies.find(movie => movie.id === el.id)){
              return el;
          }}
          
        });
        console.log('change')
        setMovies(nope.filter(el => el !== undefined));
      });
  }, [category]);

  // Changing category of films when changing option in dropdown
  const handleChange = (e) => {
    if(e.target.value === "popular"){
      return setCategory(null);
    }
    setCategory(e.target.value);
  }

  const Filter = () => {
    return (
      <div className="option">
        <select name="category" id="category" onChange={(e) => handleChange(e)}>
         <option value="popular">Popular</option>
          <option value="28">Action</option>
          <option value="18">Drama</option>
          <option value="12">Adventure</option>
          <option value="16">Animation</option>
          <option value="35">Comedy</option>
          <option value="80">Crime</option>
          <option value="99">Documentry</option>
          <option value="10751">Family</option>
          <option value="14">Fantasy</option>
          <option value="36">History</option>
          <option value="27">Horror</option>
          <option value="10402">Music</option>
          <option value="9648">Mystery</option>
          <option value="10749">Romance</option>
          <option value="878">Sience-Fiction</option>
          <option value="10770">Tv-Movie</option>
          <option value="53">Triller</option>
          <option value="10752">War</option>
          <option value="37">Western</option>
        </select>
      </div>
    )
  }

  const Movie = () => {
    const visibilityChange = () => {
      info.current.className = info.current.className === "movie__description-hidden" ?  "movie__description-visible" :  "movie__description-hidden";
       image.current.className = image.current.className === "card-img-small" ? "card-img" : "card-img-small"
      //  console.log("info",info.current.className);
    }

    return (
      <div className="movie-card">
        <h1>{movie.title}</h1>
        <img  ref={image} src={"https://image.tmdb.org/t/p/w500/"+movie.poster_path} alt={movie.title} onClick={visibilityChange} className="card-img"></img>
        <div ref={info} className="movie__description-hidden">
          <h4>Release Date: {movie.release_date}</h4>
          <p>{movie.overview}</p>
          <h3>User Rating: {movie.vote_average} / 10</h3>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* <h1>Home</h1> */}
      <Filter />
      {movie && <Movie key={movie.id} />}
      <ButtonSection 
        counter={counter} 
        setCounter={setCounter} 
        dislikedMovies={dislikedMovies} 
        setDislikedMovies={setDislikedMovies} 
        likedMovies={likedMovies} 
        setLikedMovies={setLikedMovies} 
        movie={movie} />
    </div>
  );
};

export default Home;

