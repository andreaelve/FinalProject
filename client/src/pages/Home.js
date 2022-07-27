import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useRef, useState } from "react";
import ButtonSection from "../components/ButtonSection";
// import "../App.scss"
import FlipCard from "../components/FlipCard";
import "bootstrap/dist/css/bootstrap.min.css";


const Home = ({ dislikedMovies, setDislikedMovies, likedMovies, setLikedMovies }) => {
  const { user, post } = useAuth0();
  const [category, setCategory] = useState(null);
  const [email, setEmail] = useState(null);
  const [counter, setCounter] = useState(0);
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(movies[counter]);
  const [page, setPage] = useState(1);
  const info = useRef(null);
  const infoContent = useRef(null);
  const image = useRef(null);

  const cards = [
    {
      id: "2",
      variant: "click",
      front: "This is the Front - Click to flip",
      back: "Back"
    }
  ];

  useEffect(() => {
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
        .then((res) => res.json())
        .then(data => {
          console.log(user.email);

        })
        .catch(error => console.log(error))

      localStorage.setItem("user", JSON.stringify(user.email))
    }
  }, [])

  useEffect(() => {
    // Defaults to popular movies
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=2b61576c6129138ce5beeb3937518565&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`)
      .then(res => res.json())
      .then(data => {
        let nope = data.results.map(el => {
          if (!dislikedMovies.find(movie => movie.id === el.id)) {
            if (!likedMovies.find(movie => movie.id === el.id)) {
              return el;
            }
          }

        });
        console.log('hei')
        setMovies(nope.filter(el => el !== undefined));
      });
  }, [likedMovies, dislikedMovies]);

  useEffect(() => {
    if (counter === movies.length - 1) {
      setCounter(0);
      const newPage = page + 1;
      setPage(newPage);
    }
    setMovie(movies[counter]);
    console.log("movie", movie);
    console.log("counter", counter);
  }, [movies, counter])

  useEffect(() => {
    if (category === null) {
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=2b61576c6129138ce5beeb3937518565&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`)
        .then(res => res.json())
        .then(data => {
          let nope = data.results.map(el => {
            if (!dislikedMovies.find(movie => movie.id === el.id)) {
              if (!likedMovies.find(movie => movie.id === el.id)) {
                return el;
              }
            }

          });
          console.log('hei')
          setMovies(nope.filter(el => el !== undefined));
        });
      return;
    }

    fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${category}&api_key=2b61576c6129138ce5beeb3937518565&language=en-US`)
      .then(res => res.json())
      .then(data => {
        let nope = data.results.map(el => {
          if (!dislikedMovies.find(movie => movie.id === el.id)) {
            if (!likedMovies.find(movie => movie.id === el.id)) {
              return el;
            }
          }

        });
        console.log('change')
        setMovies(nope.filter(el => el !== undefined));
      });
  }, [category, page]);

  // Changing category of films when changing option in dropdown
  const handleChange = (e) => {
    if (e.target.value === "popular") {
      return setCategory(null);
    }
    setCategory(e.target.value);
    setCounter(0);
  }

  const Filter = () => {
    return (
      <div className="option">
        <select className="category_bar" name="category" id="category" onChange={(e) => handleChange(e)}>
          <option className="option_item" value="" disabled selected>Category</option>
          <option className="option_item" value="popular">Popular</option>
          <option className="option_item" value="28">Action</option>
          <option className="option_item" value="18">Drama</option>
          <option className="option_item" value="12">Adventure</option>
          <option className="option_item" value="16">Animation</option>
          <option className="option_item" value="35">Comedy</option>
          <option className="option_item" value="80">Crime</option>
          <option className="option_item" value="99">Documentry</option>
          <option className="option_item" value="10751">Family</option>
          <option className="option_item" value="14">Fantasy</option>
          <option className="option_item" value="36">History</option>
          <option className="option_item" value="27">Horror</option>
          <option className="option_item" value="10402">Music</option>
          <option className="option_item" value="9648">Mystery</option>
          <option className="option_item" value="10749">Romance</option>
          <option className="option_item" value="878">Sience-Fiction</option>
          <option className="option_item" value="10770">Tv-Movie</option>
          <option className="option_item" value="53">Triller</option>
          <option className="option_item" value="10752">War</option>
          <option className="option_item" value="37">Western</option>
        </select >
      </div>
    )
  }

  const Movie = () => {
    const visibilityChange = (e) => {
      if (e.target === image.current) {
        infoContent.current.className = infoContent.current.className === 'none' ? '' : 'none';
        info.current.className = info.current.className === "movie__description hidden" ? "movie__description visible" : "movie__description hidden";
      }
    }

    const imgUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    console.log('hei', imgUrl);


    return (
      <div className="container">
      <div className="row h-100">
        <div class="col d-flex flex-column flex-md-row justify-content-around align-items-center">
          {cards.map((card) => (
            <FlipCard key={card.id} card={card} dislikedMovies={dislikedMovies} setDislikedMovies={setDislikedMovies} likedMovies={likedMovies}  setLikedMovies={setLikedMovies} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
 }

  return (
    <div className="main">
      <Filter />
      {movie && <Movie key={movie.id} />}
    </div>
  );
};

export default Home;
