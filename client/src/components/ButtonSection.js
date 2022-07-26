import React, { useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../App.css"


const ButtonSection = ({ counter, setCounter, dislikedMovies, setDislikedMovies, likedMovies, setLikedMovies, movie }) => {
  const { user } = useAuth0();
  const like = useRef(null);
  const dislike = useRef(null);
  
  const sendList = () => {
    fetch('http://localhost:3001/movie', {  
      method: 'POST', 
      mode: 'cors', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        user: user.email,
        likedMovies: [...likedMovies],
        dislikedMovies: [...dislikedMovies]
      }) 
    })
  }
  
  const handleClick = (e, action) => {
    const newMovie = {
      title: movie.title,
      image: movie.poster_path,
      category: [...movie.genre_ids],
      rating: movie.vote_average,
      id: movie.id,
    }

    if(action === 'like'){
      console.log(likedMovies);
      const newLikedMovies = likedMovies.slice() 
      newLikedMovies.push(newMovie)
      setLikedMovies(newLikedMovies);
    }
    if(action === 'dislike'){
      const newDislikedMovies = dislikedMovies.slice() 
      newDislikedMovies.push(newMovie)
      setDislikedMovies(newDislikedMovies);
    }

    sendList();
    const newNum = counter + 1;
    setCounter(newNum);
  }

  return (
    <section>
      <button ref={dislike} onClick={(e) => handleClick(e, 'dislike')}>Dislike</button>
      <button ref={like} onClick={(e) => handleClick(e, 'like')}>Like</button>
    </section>
  )
}

export default ButtonSection;