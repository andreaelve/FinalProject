import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useRef, useState } from "react";
import ButtonSection from "../components/ButtonSection";
import Filter from '../components/Filter';
import star from '../assets/star.png';

const Home = ({ dislikedMovies,  setDislikedMovies, likedMovies,  setLikedMovies }) => {
  const { user } = useAuth0();
  const [ category, setCategory ] = useState(null);
  const [ counter, setCounter ] = useState(0);
  const [ movies, setMovies ] = useState([]);
  const [ movie, setMovie ] = useState(movies[counter]);
  const [ page, setPage ] = useState(1);
  const info = useRef(null);
  const infoContent = useRef(null);
  const image = useRef(null);

  useEffect(()=>{
    if (!localStorage.getItem("user")) {
      fetch('/register', {  
        method: 'POST', 
        mode: 'cors', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          email: user.email
        }) 
      })
      .then((res)=>res.json())
      .then(() => console.log(user.email))
      .catch(error=>console.log(error));
      localStorage.setItem("user",JSON.stringify(user.email));
    }
  },[])
  
  // TODO: Fix slow fetching
  useEffect(() => {
     // Defaults to popular movies
     fetch(`https://api.themoviedb.org/3/discover/movie?api_key=2b61576c6129138ce5beeb3937518565&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`)
      .then(res => res.json())
      .then(data => {
        let nope = data.results.map(el => {
          if(!dislikedMovies.find(movie => movie.id === el.id)){
            if(!likedMovies.find(movie => movie.id === el.id)){
              return el;
          }}
          
        });
        setMovies(nope.filter(el => el !== undefined));});
  }, [likedMovies]);

  // TODO: Find a better way of handling this:
  useEffect(() => {
    if(counter === movies.length - 1){
      setCounter(0);
      const newPage = page+1;
      setPage(newPage);
    }
    setMovie(movies[counter]);
  }, [movies, counter])

  useEffect(() => {
    const fetchUrl = (category === null) 
      ? `https://api.themoviedb.org/3/discover/movie?api_key=2b61576c6129138ce5beeb3937518565&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`
      :  `https://api.themoviedb.org/3/discover/movie?with_genres=${category}&api_key=2b61576c6129138ce5beeb3937518565&language=en-US`;

    fetch(fetchUrl)
    .then(res => res.json())
      .then(data => {
        let nope = data.results.map(el => {
          if(!dislikedMovies.find(movie => movie.id === el.id)){
            if(!likedMovies.find(movie => movie.id === el.id)){
              return el;
          }}
          
        });
        setMovies(nope.filter(el => el !== undefined));
      });
  }, [category, page]);

  // TODO: Make component
  const Movie = () => {
    const visibilityChange = (e) => {
      if(e.target === image.current){
        infoContent.current.className = infoContent.current.className === 'none' ? '' : 'none';
        info.current.className = info.current.className === "movie__description hidden" ?  "movie__description visible" :  "movie__description hidden";
      }
    }
    const imgUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

    return (
      <div className="movie-card">
        <div className="movie-card_main">
          <div className="card-img" ref={image} onClick={(e) => visibilityChange(e)} 
            style={{backgroundImage: 'linear-gradient(to bottom, rgb(245 246 252 / 0%), rgb(0 0 0 / 82%)), url('+ `https://image.tmdb.org/t/p/w500/${movie.poster_path}`+')'}}>
            <div className="button-container">
            </div>
          </div>
              <ButtonSection 
                counter={counter} 
                setCounter={setCounter} 
                dislikedMovies={dislikedMovies} 
                setDislikedMovies={setDislikedMovies} 
                likedMovies={likedMovies} 
                setLikedMovies={setLikedMovies} 
                movie={movie} />
        </div>
        <div ref={info} className="movie__description hidden">
          <div ref={infoContent} class='none'>
            <h2 className="movie-title">{movie.title}</h2>
            <span className="movie-releasedate">Release Date: {movie.release_date}</span>
            <p>{movie.overview}</p>
            <p className="movie-rating">{movie.vote_average}/10<img class="star-icon" src={star}/></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Filter setCategory={setCategory} setCounter={setCounter} />
      {movie && <Movie key={movie.id} />}
    </div>
  );
};

export default Home;

