import React, { useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react"; 

const ButtonSection = ({ counter, setCounter, dislikedMovies, setDislikedMovies, likedMovies, setLikedMovies, movie }) => {
  const { user } = useAuth0();
  const like = useRef(null);
  const dislike = useRef(null);
  
  const sendList = () => {
    fetch('/addMovie', {  
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        email: user.email,
        likedMovies: [...likedMovies],
        dislikedMovies: [...dislikedMovies]
      }) 
    })
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
    let newMovieList;
    // TODO: Refactor this
    if(e.target === like.current){
      newMovieList = likedMovies.slice();
      newMovieList.push(newMovie);
      setLikedMovies(newMovieList);
    }
    if(e.target === dislike.current){
      newMovieList = dislikedMovies.slice(); 
      newMovieList.push(newMovie);
      setDislikedMovies(newMovieList);
    }

    sendList();
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