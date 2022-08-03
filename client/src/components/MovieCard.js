import { useAuth0 } from "@auth0/auth0-react";

const MovieCard = ({ movie, setLikedMovies }) => {
    const { user } = useAuth0();
    const handleDelete = (e, id) =>{
     e.preventDefault();
     fetch(`/remove-movie`, {
       method: 'POST',
       mode: 'cors',
       headers: {
         'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: user.email,
          id,
          from: 'like'
        })
      })
      .then(res => res.json())
      .then(data => setLikedMovies(data.liked))
    }

    return (
      <div className="liked-movie">
        <img className="liked-movie_img" src={`https://image.tmdb.org/t/p/w500/${movie.image}`}  alt="movieImg"/>
        <div className="liked-movie_info">
          <h2>{movie.title}</h2>
          <button className="remove-btn"  id="btnDeleteMovie" onClick={(e) => handleDelete(e, movie.id)}>Remove</button>
        </div>
      </div>
    )
}

export default MovieCard;