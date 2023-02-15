import {Button, Container} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import {signOut} from "../../api/firebase/auth";

function NavBar() {

    const navigate = useNavigate()
    const { user } = useAuth()

    function signIn() {
        navigate('/signIn')
    }

    function goHome() {
        navigate('/')
    }

    function attemptSignOut() {
        signOut()
    }

    return (
        <div>
            <Container sx={{display: 'flex', justifyContent: 'space-between'}}>
                <h1 className={"title application-text"} onClick={goHome}>Whose Turn Is It Anyway</h1>
                { user ? <div><h1 className={"user-name-text"}>{user?.displayName}</h1><h2 onClick={attemptSignOut}>Sign Out</h2></div> : <Button sx={{color: 'navy', fontFamily: 'Ubuntu'}} onClick={signIn}>Sign In</Button> }
            </Container>
        </div>
    )
}

export default NavBar