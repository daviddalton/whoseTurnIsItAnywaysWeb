import {Button, Container, TextField} from "@mui/material";
import {useState} from "react";
import {createNewAccount} from "../../api/firebase/auth";
import {useNavigate} from "react-router-dom";

function SignUpPage() {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    function attemptSignUp() {
        if (password === confirmPassword) {
            if (email !== '' && password !== '' && confirmPassword !== '' && displayName !== '') {
                createNewAccount(email, password, displayName).then(r => {
                    navigate('/')
                })
            } else {
                console.log("Must input all fields.")
            }
        } else {
            console.log("Passwords must match.")
            //inform the user of this
        }
    }

    return (
        <Container sx={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center', paddingTop: '50px'}}>
            <TextField
                sx={{margin: '8px', width: '300px'}}
                id="outlined-basic"
                label="display name"
                variant="outlined"
                type={"text"}
                onChange={text => setDisplayName(text.target.value)}
            />
            <TextField
                sx={{margin: '8px', width: '300px'}}
                id="outlined-basic"
                label="email"
                variant="outlined"
                type={"email"}
                onChange={text => setEmail(text.target.value)}
            />
            <TextField
                sx={{margin: '8px', width: '300px'}}
                id="outlined-basic"
                label="password"
                variant="outlined"
                type={'password'}
                onChange={text => setPassword(text.target.value)}
            />
            <TextField
                sx={{margin: '8px', width: '300px'}}
                id="outlined-basic"
                label="confirm password"
                variant="outlined"
                type={'password'}
                onChange={text => setConfirmPassword(text.target.value)}
            />
            <Button
                sx={{color: 'navy', fontFamily: 'Ubuntu', marginTop: '8px', fontSize: '24px'}}
                onClick={attemptSignUp}
            >
                Sign Up
            </Button>
        </Container>
    )
}

export default SignUpPage