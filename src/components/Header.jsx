import Login from "./Login";

const Header = ({ token, logout}) => {
    return (
        <>
            <header style={{backgroundColor: "green", padding: "1.75%", position: "fixed", width: "100%"}}>
                <h1 style={{position: "fixed", left: "50%", transform: "translate(-50%, 0)", top: "0"}}>Spotify React</h1>
                <div style={{position: "fixed", top: "5px", right: "5px"}}><Login tokenProp={token} logoutFunc={logout} /></div>
            </header>
        </>
    );
}

export default Header;