import { useEffect, useState } from "react";
import SearchOptions from "./SearchOptions";
import Header from "./Header";

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
            <div style={{width: "100%", backgroundColor: "green", zIndex: "100"}}><Header token={token} logout={logout}/></div>
            {!!token && <div><br /><br /><br /><SearchOptions tokenProp={token}/></div>}
        </>
    );
}

export default Home;