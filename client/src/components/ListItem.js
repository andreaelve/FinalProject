import React from "react";

const ListItem = ({ movie }) => {
  console.log(movie)
  return (
    <div>
      <h2 style={{color: 'white'}}>{movie.title}</h2>
      <img src={`https://image.tmdb.org/t/p/w500/${movie.image}`} style={{width: '100px'}} />
      <p style={{color: 'white'}}>Rating: {movie.rating} / 10</p>
    </div>
  )
}

export default ListItem;