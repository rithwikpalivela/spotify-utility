import { useState } from "react";

const PlaylistListItem = ({playlist, viewPlaylist}) => {
    const [hover, setHover] = useState(false);
    
    const handleEnter = () => {
        setHover(true);
    }
    const handleExit = () => {
        setHover(false);
    }

    const handleViewPlaylist = () => {
        viewPlaylist(playlist);
    }

    return (
        <>
            <div className="flex-item" onMouseOver={handleEnter} onMouseLeave={handleExit} onClick={handleViewPlaylist} style={{width: "20%", background: "white", ...(hover && {cursor: "pointer", boxShadow: "3px 3px 3px rgba(0,0,0,0.2), 8px 8px 10px rgba(0,0,0,0.2), 0px 0px 20px rgba(0,0,0,0.5)"})}}>
                <figure>
                    <img src={playlist.images[0].url} alt="Playlist Cover" width="100%" height="100%"></img>
                    <figcaption style={{color: "black"}}>{playlist.name}</figcaption>
                </figure>
            </div>
        </>
    );
}

export default PlaylistListItem;