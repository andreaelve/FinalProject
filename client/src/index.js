import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Auth0Provider } from "@auth0/auth0-react";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import LikedMovies from "./pages/LikedMovies";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import Match from "./pages/Match";
import './style.css';
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENTID;

export default function App() {
  const { isAuthenticated, user } = useAuth0();
  const [ dislikedMovies,  setDislikedMovies ] = useState([]);
  const [ likedMovies,  setLikedMovies ] = useState([]);
  // loadingLikedMovies={loadingFetchedMovies}
  const [ loading, setLoading ] = useState([false]);

  useEffect(() => {
    if(isAuthenticated){
      console.log('fetch');
      setLoading(true);
      fetch('/storedLists', {  
        method: 'POST', 
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          email: user.email,
        })
      })
      .then(res => res.json())
      .then(data => {
        setLikedMovies([...data.liked_movies])
        setDislikedMovies([...data.disliked_movies])
      })
      .then(() => setLoading(false));
    }
  }, [user])

  if(!isAuthenticated ){
    return <Login />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home 
            dislikedMovies={dislikedMovies}  
            setDislikedMovies={setDislikedMovies}
            likedMovies={likedMovies}  
            setLikedMovies={setLikedMovies}
            />} />
          <Route path="login" element={<Login />} />
          <Route path="match" element={<Match likedMovies={likedMovies} />} />
          <Route path="profile" element={<Profile />} />
          <Route path="likedmovies" element={<LikedMovies 
            likedMovies={likedMovies} 
            setLikedMovies={setLikedMovies}
            loading={loading} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
  >
      <App />
  </Auth0Provider>
);