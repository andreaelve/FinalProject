import { useRef } from "react";

const Match = ({ likedMovies }) => {

  const search = useRef(null);
  const matches = useRef(null);
  const matchList = [];



  const handleSubmit = (e) => {
    matches.current.innerHTML = '';
    e.preventDefault();
    // E-mail of user to serach for
    const searchWord = search.current.value;
    // Fetching to the endpoint that responds with all information about a user
    fetch('/storedLists', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: searchWord,
      })
    })
      .then(res => res.json())
      .then(data => {
        return data.liked_movies;
      })
      .then(movies => movies.forEach(el => {
        likedMovies.forEach(movie => {
          if (movie.id === el.id) {
            console.log(movie, el);
            const img = `https://image.tmdb.org/t/p/w500/${el.image}`;
            matches.current.innerHTML += (`<div class="match-card"><h2 class="match-card-title">${el.title}</h2><img class="match-img" src=${img} /></div>`);
            return matchList.push(el);
          }
        });
      }));
    console.log(matchList)
  }

  return (
    <div className="match">
      <h1 className="match-heading">Match</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="match-input"
          placeholder="What's your friends email?"
          ref={search} />
      </form>
      <div ref={matches}>
      </div>
    </div>
  );
};

export default Match;