const Login = ({tokenProp, logoutFunc}) => {
    const CLIENT_ID = "1f3d9f2fb90043fa8068342a35d8f30e";
    const REDIRECT_URI = "http://localhost:3000/";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";

    return (
        <>
            <div>
                {!!!tokenProp ? 
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
                        Login to Spotify
                    </a> :
                    <button onClick={logoutFunc}>Logout</button>
                }
            </div>
        </>
    );
}

export default Login;