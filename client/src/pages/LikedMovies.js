import { useAuth0 } from "@auth0/auth0-react";


const LikedMovies = ({ likedMovies, setLikedMovies }) => {
  const { user } = useAuth0();

  const MovieCard = ({ movie }) => {

    const handleDelete = (e, id) => {
      e.preventDefault();
      fetch(`/remove-movie`, {
        method: 'Post',
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
        .then(data => {
          setLikedMovies(data.liked);
          console.log("click",);
        })
    }

    return (
      <div className="liked-movie">
        <img className="liked-movie_img" src={`https://image.tmdb.org/t/p/w500/${movie.image}`} alt="movieImg" />
        <div className="liked-movie_info">
          <h2>{movie.title}</h2>
          <button className="remove-btn" id="btnDeleteMovie" onClick={(e) => {
            handleDelete(e, movie.id)
          }}>Remove</button>
        </div>
      </div>
    )

  }

  return (
    <section className="liked-movies_section">
      <h1 className="liked-movies_heading">My Movies</h1>
      <div className="liked-movies_list">
        {likedMovies.map(el => <MovieCard key={el.id} movie={el} />)}
      </div>
    </section>
  );

}



export default LikedMovies;