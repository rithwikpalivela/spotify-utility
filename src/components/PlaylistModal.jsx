import { useState } from "react";
import axios from "axios";

const PlaylistModal = ({ playlist, hidePlaylist, token }) => {
    const [willTransfer, setWillTransfer] = useState(false);

    let newPlaylistName;
    let newPlaylistDesc;
    let trackUris;
    const numCalls = Math.ceil(playlist.tracks.total / 100);

    const beginTransfer = () => {
        setWillTransfer(true);
    }

    const handleTransfer = async (e) => {
        e.preventDefault();
        
        await getPlaylistTracks(playlist.id)
            .then(async () => await getUserId())
            .then(async (data) => await createPlaylist(data.id))
            .then(async (playlist) => await addTracks(playlist.id));
    }

    const getUserId = async () => {
        const {data} = await axios.get(`https://api.spotify.com/v1/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return data;
    }

    const createPlaylist = async (id) => {
        const {data} = await axios({
            method: 'post',
            url: `https://api.spotify.com/v1/users/${id}/playlists`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                name: newPlaylistName,
                description: newPlaylistDesc,
                public: true
            }
        });

        return data;
    }

    const addTracks = async (id) => {
        let currTrackUris;
        
        for (let i = 0; i < numCalls; i++) {
            if (i === numCalls - 1) {
                currTrackUris = trackUris.slice(100 * i);
            } else {
                currTrackUris = trackUris.slice(100 * i, 100 * i + 100);
            }

            const {data} = await axios({
                method: 'post',
                url: `https://api.spotify.com/v1/playlists/${id}/tracks`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {
                    uris: currTrackUris,
                    position: 100 * i
                }
            });
        }
    }

    const getPlaylistTracks = async (e) => {
        let trackItems = [];

        for (let i = 0; i < numCalls; i++) {
            const {data} = await axios.get(`https://api.spotify.com/v1/playlists/${e}/tracks`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    fields: "items(track(name,id,uri))",
                    offset: 100 * i
                }
            });

            trackItems = [...trackItems, ...data.items];
        }

        trackUris = trackItems.filter((trackItem) => trackItem && trackItem.track).map((trackItem) => trackItem.track.uri);
    }

    return (
        <>
            <div style={{position: "fixed", top: "10%", bottom: "10%", left: "25%", width: "50%", height: "80%", background: "white"}}>
                <button onClick={hidePlaylist} style={{color: "white", backgroundColor: "gray", position: "absolute", top: "-8px", right: "-8px", fontSize: "15px", borderRadius: "50%", border: "2px solid black"}}>
                    &times;
                </button>
                <h1>{playlist.name}</h1>
                {willTransfer && <figure>
                    <img src={playlist.images[0].url} alt="Playlist Cover" width="40%" height="40%"></img>
                </figure>}
                {!willTransfer && <figure>
                    <img src={playlist.images[0].url} alt="Playlist Cover" width="50%" height="50%"></img>
                </figure>}
                <p>{playlist.description}</p>
                <h3>Number of songs: {playlist.tracks.total}</h3>
                {!willTransfer && <button onClick={beginTransfer}>Initiate Transfer</button>}
                {willTransfer && <div>
                    <h2>New Playlist Details</h2>
                    <form onSubmit={handleTransfer}>
                        <label>
                            Name:
                            <input type="text" onChange={(e) => newPlaylistName = e.target.value}></input>
                        </label>
                        <label>
                            Description:
                            <input type="text" onChange={(e) => newPlaylistDesc = e.target.value}></input>
                        </label>
                        <button type="submit">Transfer</button>
                    </form>
                </div>}
            </div>
        </>
    );
}

export default PlaylistModal;