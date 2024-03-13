import { useEffect, useState } from "react";
import Login from "./Login";

const Home = () => {
    const [token, setToken] = useState('');

    useEffect(() => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem("token");
    
        if (!!!token && hash) {
            token = hash.substring(1).split('&').find(el => el.startsWith("access_token")).split('=')[1];
            window.location.hash = '';
            window.localStorage.setItem("token", token);
        }
    
        setToken(token);
    }, []);

    const logout = () => {
        setToken('');
        window.localStorage.removeItem("token");
    }

    return (
        <>
            <h1>Spotify React</h1>
            <Login tokenProp={token} logoutFunc={logout}/>
        </>
    );
}

export default Home;