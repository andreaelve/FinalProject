import { Auth0Provider } from "@auth0/auth0-react";
import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

//  Should make context here
const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [ counter, setCounter ] = useState(0);
  const [ movies, setMovies ] = useState([]);
  const [ movie, setMovie ] = useState(movies[counter])
  const [ category, setCategory ] = useState(null);
  const [ likedMovies, setLikedMovies ] = useState([]);
  const [ dislikedMovies, setDislikedMovies ] = useState([]);

  return (
    <AppContext.Provider 
      value={{
        counter,
        setCounter,
        movies,
        setMovies,
        movie,
        setMovie,
        category,
        setCategory,
        likedMovies, 
        setLikedMovies, 
        dislikedMovies, 
        setDislikedMovies
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppContextProvider>
    <Auth0Provider
    // Hardcoding it for now
      domain="dev-3g7shhdy.us.auth0.com"
      clientId="7TetmI8GQhtDruSdI5ymkH4aXiLcxaOz"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </AppContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export default AppContext;