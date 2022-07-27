import { useState, useRef, useEffect } from "react"; 
import cn from "classnames";
import ButtonSection from "../components/ButtonSection";
// import "../style.scss"
import "bootstrap/dist/css/bootstrap.min.css";

function FlipCard({ card, dislikedMovies, setDislikedMovies, likedMovies,  setLikedMovies, movie }) {
  const [showBack, setShowBack] = useState(false);
  const image = useRef(null);
  const [ category, setCategory ] = useState(null);
  const [ counter, setCounter ] = useState(0);
  const [ movies, setMovies ] = useState([]);
  // const [ movie, setMovie ] = useState(movies[counter]);

  const handleChange = (e) => {
    if(e.target.value === "popular"){
      return setCategory(null);
    }
    setCategory(e.target.value);
  }
  
  function handleClick() { 
    if (card.variant === "click") { 
      setShowBack(!showBack); 
    } 
  } 

  return (
    <div
      className="flip-card-outer"
      onClick={handleClick} 
    >
      <div
        className={cn("flip-card-inner", {
          showBack, 
          "hover-trigger": card.variant === "hover"
        })}
      >
        <div className="card front">
          <div className="card-body d-flex justify-content-center align-items-center">
            <div className="movie-card_main">
           <div className="card-img" ref={image} 
            style={{backgroundImage: 'linear-gradient(to bottom, rgb(245 246 252 / 0%), rgb(0 0 0 / 82%)), url('+ `https://image.tmdb.org/t/p/w500/${movie.poster_path}`+')'}}>
            <div className="button-container">
            </div>
          </div>
          </div>
        </div>
        </div>
        <div className="card back">
          <div className="card-body d-flex justify-content-center align-items-center">
            <div className="flip-card-back"
            // style={{backgroundImage: 'url('+ `https://image.tmdb.org/t/p/w500/${movie.poster_path}`+')', backgroundSize: "100%, 100%"}}
            >
              <h2 className="movie-title">{movie.title}</h2>
              <span className="movie-releasedate">Release Date: {movie.release_date}</span>
              <p>{movie.overview}</p>
              <h5 className="movie-rating">User Rating: {movie.vote_average} / 10</h5>
            </div>
          </div>
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
  );
}

export default FlipCard;