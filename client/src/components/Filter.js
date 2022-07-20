import React, { useContext, useState } from "react";
import AppContext from "..";

const Filter = () => {
  const { setCategory } = useContext(AppContext);
  // const { setCategory, categoryOptions, setCategoryOptions } = useContext(AppContext);

  // fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=2b61576c6129138ce5beeb3937518565&language=en-US')
  //   .then(res => res.json())
  //   .then(data => setCategoryOptions(data.genres.map(el => <option key={el.id} value={el.id}>{el.name}</option>)));

  
  // Changing the category
  const handleChange = (e) => {
    if(e.target.value === "popular"){
      return setCategory(null);
    }
    setCategory(e.target.value);
  }

  // With the api we can make this list dynamic by fetching all the categories
  return (
      <select name="category" id="category" onChange={(e) => handleChange(e)}>
        <option value="popular">Popular</option>
        {/* {categoryOptions} */}
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
  );
}

export default Filter;