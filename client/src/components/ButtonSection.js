import React, { useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ButtonSection = ({ counter, setCounter, dislikedMovies, setDislikedMovies, likedMovies, setLikedMovies, movie }) => {
  const { user } = useAuth0();
  const like = useRef(null);
  const dislike = useRef(null);

  const sendList = (newLikedMovies, newDislikedMovies) => {
    console.log(newLikedMovies);
    console.log(newDislikedMovies);
    fetch('http://localhost:3001/movie', {
      method: 'POST',
      // mode: 'cors', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: user.email,
        likedMovies: [...newLikedMovies],
        dislikedMovies: [...newDislikedMovies]
      })
    }).then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.log(error))
  }

  const handleClick = (e) => {
    const newMovie = {
      title: movie.title,
      image: movie.poster_path,
      category: [...movie.genre_ids],
      rating: movie.vote_average,
      id: movie.id,
    }
    let newLikedMovies = likedMovies
    let newDislikedMovies = dislikedMovies
    if (e.target === like.current) {
      newLikedMovies = likedMovies.slice()
      newLikedMovies.push(newMovie)
      setLikedMovies(newLikedMovies);
    }
    if (e.target === dislike.current) {
      newDislikedMovies = dislikedMovies.slice()
      newDislikedMovies.push(newMovie)
      setDislikedMovies(newDislikedMovies);

    }

    sendList(newLikedMovies, newDislikedMovies);
    const newNum = counter + 1;
    setCounter(newNum);
  }

  return (
    <section className="voting-buttons">
      <button className="voting-buttons_btn dislike_btn" ref={dislike} onClick={(e) => handleClick(e)}></button>
      <button className="voting-buttons_btn like_btn" ref={like} onClick={(e) => handleClick(e)}></button>
    </section>
  )
}

export default ButtonSection;