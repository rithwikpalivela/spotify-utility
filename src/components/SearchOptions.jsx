import { useState } from "react";
import axios from "axios";
import SearchResults from "./SearchResults";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const SearchOptions = ({tokenProp}) => {
    const [playlistResults, setPlaylistResults] = useState();
    const [trackResults, setTrackResults] = useState();
    const [options, setOptions] = useState();

    const handlePlaylistSearch = async (e) => {
        e.preventDefault();

        const {data} = await axios.get("https://api.spotify.com/v1/me/playlists", {
            headers: {
                Authorization: `Bearer ${tokenProp}`
            }
        });

        setPlaylistResults(data.items);

        const options = data.items.map((result) => {
            return {value: result.id, label: result.name};
        });
        setOptions(options);
    }

    const handleTrackSearch = async (e) => {
        const {data} = await axios.get(`https://api.spotify.com/v1/playlists/${e.value}/tracks`, {
            headers: {
                Authorization: `Bearer ${tokenProp}`
            },
            params: {
                fields: "items(track(name,id,artists(name)))"
            }
        });

        setTrackResults(data.items.map((item) => item.track));
    }

    return (
        <>
            <button onClick={handlePlaylistSearch}>Retrieve My Playlists</button>
            {!!playlistResults && <SearchResults results={playlistResults} />}
            {!!playlistResults && <Dropdown options={options} onChange={handleTrackSearch} value={options[0]} placeholder="Select a playlist to transfer:" />}
            {!!trackResults && <SearchResults results={trackResults} />}
        </>
    );
}

export default SearchOptions;