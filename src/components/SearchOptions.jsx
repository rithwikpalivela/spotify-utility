import { useState } from "react";
import axios from "axios";
import PlaylistList from "./PlaylistList";
import PlaylistModal from "./PlaylistModal";
import "react-dropdown/style.css";
import Button from "react-bootstrap/Button";

const SearchOptions = ({tokenProp}) => {
    const [playlistResults, setPlaylistResults] = useState();
    const [showPlaylistModal, setShowPlaylistModal] = useState(false);
    const [playlistModalDetails, setPlaylistModalDetails] = useState();

    const handlePlaylistSearch = async (e) => {
        e.preventDefault();

        const {data} = await axios.get("https://api.spotify.com/v1/me/playlists", {
            headers: {
                Authorization: `Bearer ${tokenProp}`
            }
        });

        setPlaylistResults(data.items);
    }

    const viewPlaylist = (playlist) => {
        setPlaylistModalDetails(playlist);
        (setShowPlaylistModal(true));
    }

    const hidePlaylist = () => {
        setPlaylistModalDetails();
        setShowPlaylistModal(false);
    }

    return (
        <>
            {showPlaylistModal && <div onClick={hidePlaylist} style={{position: "fixed", top: "0", left: "0", width: "100%", height: "100%", background: "rgba(0,0,0,0.6)"}}></div>}
            {!!!playlistResults && <Button onClick={handlePlaylistSearch}>Retrieve My Playlists</Button>}
            {!!playlistResults && <div style={{marginTop: "5px"}}><PlaylistList results={playlistResults} viewPlaylist={viewPlaylist} /></div>}
            {showPlaylistModal && <PlaylistModal playlist={playlistModalDetails} hidePlaylist={hidePlaylist} token={tokenProp} />}
        </>
    );
}

export default SearchOptions;