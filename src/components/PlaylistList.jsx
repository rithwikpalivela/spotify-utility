import PlaylistListItem from "./PlaylistListItem";

const PlaylistList = ({results, viewPlaylist}) => {
    const searchItems = results.map(result => {
        return (
            <PlaylistListItem playlist={result} viewPlaylist={viewPlaylist} />
        );
    });

    return (
        <>
            <div className="flexbox-container" style={{display: "flex", flexFlow: "row wrap", justifyContent: "space-around", gap: "20px"}}>
                {searchItems}
            </div>
        </>
    );
}

export default PlaylistList;