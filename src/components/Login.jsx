import Button from "react-bootstrap/Button";

const Login = ({tokenProp, logoutFunc}) => {
    const CLIENT_ID = "1f3d9f2fb90043fa8068342a35d8f30e";
    const REDIRECT_URI = "http://localhost:3000/";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";
    const SCOPE = "user-read-private%20playlist-read-private%20playlist-modify-public%20playlist-modify-private";

    return (
        <>
            <div>
                {!!!tokenProp ? 
                    <Button href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>
                        Login to Spotify
                    </Button> :
                    <Button onClick={logoutFunc}>Logout</Button>
                }
            </div>
        </>
    );
}

export default Login;