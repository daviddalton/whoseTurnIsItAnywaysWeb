import {Button, Container, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {signIn} from "../../api/firebase/auth";

function SignInPage() {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function signUp() {
        navigate('/signUp')
    }

    function attemptSignIn() {
        if (email !== '' && password !== '') {
            signIn(email, password).then(r => {
                navigate('/')
            })
        } else {
            console.log("Must input an email and password to sign in.")
        }
    }

    return (
        <Container sx={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center', paddingTop: '50px'}}>
            <TextField
                sx={{margin: '8px', width: '300px'}}
                id="outlined-basic"
                label="email"
                variant="outlined"
                type={"email"}
                onChange={(text => setEmail(text.target.value))}
            />
            <TextField
                sx={{margin: '8px', width: '300px'}}
                id="outlined-basic"
                label="password"
                variant="outlined"
                type={"password"}
                onChange={(text => setPassword(text.target.value))}
            />
            <Button
                sx={{color: 'navy', fontFamily: 'Ubuntu', marginTop: '8px', fontSize: '24px'}}
                onClick={attemptSignIn}
            >
                Sign In
            </Button>
            <p className={"create-button"} onClick={signUp}>
                Create Account
            </p>
        </Container>
    )
}

export default SignInPage