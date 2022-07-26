import { useAuth0 } from "@auth0/auth0-react";
import "../App.css"


const LikedMovies = ({ likedMovies, setLikedMovies, setDislikedMovies }) => {
  // TODO: Delete list button ?? 
  const { user } = useAuth0();
  
  const MovieCard = ({ movie}) => {
    // movie remove method handler
    const handleDelete = (e, id) => {
      e.preventDefault();

      /**
       * Call remove-movie api to delete target movie fro liked page
       */
      fetch(`http://localhost:3001/remove-movie`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: user.email, // user email
                id, // movie id
                from: 'like' // page
            })
        })
            .then(res => res.json())
            .then(data =>{
               // update the list
                setLikedMovies([...data.liked]);
                setDislikedMovies([...data.disliked]);
            })
    }
    return (
      <div className="moveList">
        {/* <h2>{movie.title}</h2> */}
        <img src={`https://image.tmdb.org/t/p/w500/${movie.image}`} alt='movieImg' />
        <p>Rating: {movie.rating}/10</p>
        <div className="btnDeleteMovie">
          <button className="btn btn--remove" id="btnDeleteMovie" onClick={(e) => {
            handleDelete(e, movie.id)
          }}> Delete</button>
        </div>`;
      </div>
    )
  }

  return (
    <section>
      {/* <h1>My Movies</h1> */}
      {likedMovies.map(el => <MovieCard key={el.id} movie={el} />)}
    </section>
  );
};

export default LikedMovies;
