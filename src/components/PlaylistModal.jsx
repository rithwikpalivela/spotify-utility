import { useState } from "react";
import axios from "axios";
// import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

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
                {!willTransfer && <h1 style={{marginTop: "10px"}}>{playlist.name}</h1>}
                {willTransfer && <h2 style={{marginTop: "10px"}}>{playlist.name}</h2>}
                {!willTransfer && <figure style={{marginTop: "10px"}}>
                    <img src={playlist.images[0].url} alt="Playlist Cover" width="50%" height="50%"></img>
                </figure>}
                {willTransfer && <figure style={{marginTop: "5px"}}>
                    <img src={playlist.images[0].url} alt="Playlist Cover" width="25%" height="25%"></img>
                </figure>}
                <p>{playlist.description}</p>
                <h5>Number of songs: {playlist.tracks.total}</h5>
                {!willTransfer && <button onClick={beginTransfer}>Initiate Transfer</button>}
                {willTransfer && <div style={{marginTop: "3%"}}>
                    <h3>New Playlist Details</h3>
                    <form onSubmit={handleTransfer} style={{marginTop: "3%"}}>
                        <div className="flexbox-container" style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
                            <div className="flex-item">
                                <label style={{display: "flex", flexDirection: "column"}}>
                                    Name:
                                    <input style={{display: "flex", flexDirection: "column"}} type="text" onChange={(e) => newPlaylistName = e.target.value}></input>
                                </label>
                            </div>
                            <div className="flex-item">
                                <label style={{display: "flex", flexDirection: "column"}}>
                                    Description:
                                    <textarea style={{display: "flex", flexDirection: "column"}} onChange={(e) => newPlaylistDesc = e.target.value}></textarea>
                                </label>
                            </div>
                        </div>
                        <Button variant="primary" type="submit" style={{marginTop: "5%", width: "50%"}}>Transfer</Button>
                    </form>
                </div>}
            </div>
        </>
    );
}

export default PlaylistModal;