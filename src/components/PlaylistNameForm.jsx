import { useState } from "react";

const PlaylistNameForm = ({handleTransfer}) => {
    const [playlistName, setPlaylistName] = useState();

    return (
        <>
            <div>
                <h2>Enter playlist name:</h2>
                <form onSubmit={handleTransfer}>
                    <label>
                        Name:
                        <input type="text" value={playlistName} onChange={(e) => setPlaylistName(e.target.value)}></input>
                    </label>
                    <button type="submit">Transfer</button>
                </form>
            </div>
        </>
    );
}

export default PlaylistNameForm;