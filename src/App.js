import React from 'react';
import './App.css';
import data from "./components/data"
import axios from 'axios';
import {useEffect, useState} from 'react';


function App() {
  const CLIENT_ID = "19e6247f9dbc465ea843ec067d08622c"
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  
  const [token, setToken] = useState("")

  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState([])  
    
  const image = data.album.images[0].url
  const title = data.name
  const artist = data.album.artists[0].name

  useEffect(() => {
      const hash = window.location.hash
      let token = window.localStorage.getItem("token")

      if (!token && hash) {
          token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

          window.location.hash = ""
          window.localStorage.setItem("token", token)
      }

      setToken(token)

  }, [])

  const logout = () => {
      setToken("")
      window.localStorage.removeItem("token")
  }

  const Song = () => {
    <Song />
  }

  const searchArtists = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            q: searchKey,
            type: "artist"
        }
    })

    setArtists(data.artists.items)
}

const renderArtists = () => {
  return artists.map(artist => (
      <div key={artist.id}>
          {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
          {artist.name}
          <Song />
      </div>
  ))
}

  return (

      <div className="App">
          <header className="App-header">
              <h1>Spotify React</h1>

              
              {!token ?
                  <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                      to Spotify</a> 
                   : <button onClick={logout}>Logout</button>
                   }
         {token ? 

        // {!token ?
        //     <a href={`${process.env.REACT_APP_AUTH_ENDPOINT}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=${process.env.REACT_APP_RESPONSE_TYPE}`}>Login
        //         to Spotify</a>
        //     : <button onClick={logout}>Logout</button>}
        // {token ? 
        
        <div className="card"> 
        <img src={image} alt="imageAlbum" id="imageAlbum" /> 
        <h2 id="songTitle">{title}</h2>
        <p className="title" id="artists">{artist}</p>
        <button className="button">Select</button>   
        
      <form onSubmit={searchArtists}>
          <input type="text" onChange={e => setSearchKey(e.target.value)}/>
          <button type={"submit"}>Search</button>
      </form>
      </div>
      : <h3>Please Login Terlebih Dahulu</h3>

      }
{renderArtists()}
          </header>
      </div>
  );
}

export default App;




 
