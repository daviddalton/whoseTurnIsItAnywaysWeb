import {Button, Container} from "@mui/material";
import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import {signOut} from "../../api/firebase/auth";

function NavBar() {

    const navigate = useNavigate()
    const location = useLocation()
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

    function goToTurnIsIt() {
        navigate('/')
    }

    function goToStillIn() {
        navigate('/still-in')
    }

    function goToInMeeting() {
        navigate('/in-meeting')
    }

    function buildTitle(): string {
        if (location.pathname.includes("/still-in")) {
            return "Whose Still In Anyways";
        } else if (location.pathname.includes("/in-meeting")) {
            return "Who's David Talking To"
        } else {
            return "Whose Turn Is It Anyways"
        }
    }

    return (
        <div>
            <Container sx={{display: 'flex', justifyContent: 'space-between'}}>
                <h1 className={"title application-text"} onClick={goHome}>{buildTitle()}</h1>
                <Button onClick={goToTurnIsIt} sx={{color: 'navy', fontFamily: 'Ubuntu'}}>Turn Is It</Button>
                <Button onClick={goToStillIn} sx={{color: 'navy', fontFamily: 'Ubuntu'}}>Still In</Button>
                <Button onClick={goToInMeeting} sx={{color: 'navy', fontFamily: 'Ubuntu'}}>In Meeting</Button>

                { user ? <div><h1 className={"user-name-text"}>{user?.displayName}</h1><h2 onClick={attemptSignOut}>Sign Out</h2></div> : <Button sx={{color: 'navy', fontFamily: 'Ubuntu'}} onClick={signIn}>Sign In</Button> }
            </Container>
        </div>
    )
}

export default NavBar