import React, {useState, useEffect} from 'react';
import './App.css';
import Auth from './auth/Auth';
import ConcertIndex from './concerts/ConcertIndex';
import Sitebar from './nav/navbar';

function App() {
  const [sessionToken, setSessionToken] = useState('');

  useEffect(() => {
    if(localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'));
    }
  }, [])

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  }

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  }

  const protectedViews = () => {
    return(sessionToken === localStorage.getItem('token') ? <ConcertIndex token={sessionToken} /> 
    : <Auth updateToken={updateToken} /> )
  }

  return (
    <div>
      <Sitebar clickLogout={clearToken}/>
      {protectedViews()}
    </div>

  );
}

export default App;
