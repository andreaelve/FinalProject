import React, { useContext } from "react";
import AppContext from "..";
import ListItem from "./ListItem";

const LikedMovies = () => {
  const { likedMovies } = useContext(AppContext);
  console.log(likedMovies);


  return (
    <div>
      {likedMovies.map(el => <ListItem movie={el}/>)}
    </div>
  )
}

export default LikedMovies;