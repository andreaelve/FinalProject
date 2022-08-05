import { Link } from "react-router-dom";
import MovieCard from '../components/MovieCard';
import { useEffect } from 'react';

const LikedMovies = ({ likedMovies, setLikedMovies, loading }) => {
  useEffect(() => {
    console.log(likedMovies);
  }, [likedMovies])
  // TODO: Delete list button
  if(likedMovies.length === 0){
    return (
      <section className="liked-movies_section">
        <h1 className="liked-movies_heading">My Movies</h1>
        <div className="no-liked-movies">
          <p>Oh no! You haven't liked any movies yet!</p>
          <Link to="/">
            <button className="return-btn mx2">Let's start liking!</button>
          </Link>
        </div>
      </section>
    )
  }
  
  return (
    <section className="liked-movies_section">
      <h1 className="liked-movies_heading">My Movies</h1>
      <div className="liked-movies_list">
      {likedMovies.map(el => <MovieCard 
        key={el.id} 
        movie={el} 
        setLikedMovies={setLikedMovies} 
        likedMovies={likedMovies}
        loading={loading} />)}
      </div>
    </section>
  );
}

export default LikedMovies;
