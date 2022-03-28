import React from 'react';
import data from "./data";
import Song from "./song";

const Playlist = () => {
    return (
        <div>
            {data.map((Song) => (
                <Playlist key={Song.id} {...Song} />
            ))}          
        </div>
    );
}

export default Playlist;
