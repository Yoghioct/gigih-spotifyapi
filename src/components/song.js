import React from 'react';
import data from "./data";

const Song = () => {
        return (
        <header className="App-body">
            <h1>Spotify React</h1>
            <div className="card"> 
                <img src={data.album.images[0].url} alt="imageAlbum" id="imageAlbum" /> 
                <h2 id="songTitle">{data.album.name}</h2>
                <p className="title" id="artists">{data.album.artists[0].name}</p>
                <button className="button">Select</button>   
            </div>
        </header>
        );
    }
 
export default Song;