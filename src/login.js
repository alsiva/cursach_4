import React, {useState} from 'react';
import {Alert, Box, Button, CircularProgress, Link, Stack, TextField, Typography} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import RegisterIcon from '@mui/icons-material/PersonAddAlt1';
import {delay} from "./utils";
import './index.css';


export default function Login({onLogin}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const [isLoginSelected, setLoginSelected] = useState(true)

    async function login() {
        setIsLoading(true)
        setError("")

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })

        await delay(500)
        setIsLoading(false)

        if (response.status === 400) {
            setError(response.statusText)
            return
        }

        const json = await response.json()

        if (json.user.right === "ban") {
            setError("You are banned")
            return
        }

        const userInfo = {
            id: json.user.id,
            name: json.user.name,
            right: json.user.right
        }

        onLogin(userInfo)
    }

    async function register() {
        setError("")
        setIsLoading(true);

        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: username,
                email: email,
                password: password,
                right: "participant"
            }),
        })

        await delay(1000)
        setIsLoading(false)

        if (response.status === 409) {
            setError(`user ${username} already exists`)
            return
        }

        if (response.status === 400) {
            const json = await response.json()
            let error = Object.keys(json).map(key => `${key}: ${json[key]}`).join(', ');

            setError(error)
            return
        }

        if (response.status === 500) {
            setError("Don't try to register again")
            return
        }

        const json = await response.json()


        const userInfo = {
            id: json.user.id,
            name: json.user.name,
            right: json.user.right
        }

        onLogin(userInfo)
    }

    return (
        <Box>
            <Box sx={{
                height: 100,
                bgcolor: '#7afc28',
                paddingX: 5,
                paddingTop: 5
            }}>
                <Typography variant="h4" sx={{
                    color: '#ffffff',
                }}> Login/Register </Typography>
            </Box>


            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                marginY: 5,


            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    height: 400,
                    width: 400,

                    border: 1,
                    borderRadius: 5,
                    borderColor: '#ffffff',

                    flexWrap: 'wrap',
                    boxShadow: 'inset 0px 0px 5px 0px rgba(0,0,0,0.2)',
                    backgroundColor: '#f7f7f7',
                }}
                >
                    <Stack maxWidth={300} spacing={1} sx={{py: 2}}>
                        {!isLoginSelected && (
                            <TextField
                                label="Name"
                                variant="outlined"
                                value={username}
                                onChange={(e) => {
                                    setError("")
                                    setUsername(e.target.value)
                                }}
                            />
                        )}
                        <TextField
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => {
                                setError("")
                                setEmail(e.target.value)
                            }}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setError("")
                                setPassword(e.target.value)
                            }}
                        />
                    </Stack>

                    <Stack direction="row" spacing={1}>
                        {isLoginSelected
                            ? (
                                <>
                                    <Button
                                        variant="outlined"
                                        onClick={login}
                                        startIcon={isLoading ? <CircularProgress size={12}/> : null}
                                        disabled={isLoading}
                                    >
                                        Login&nbsp;<LoginIcon/>
                                    </Button>

                                    <Link
                                        component="button"
                                        variant="body2"
                                        onClick={() => setLoginSelected(false)}
                                    >No account? Register here</Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        component="button"
                                        variant="body2"
                                        onClick={() => setLoginSelected(true)}
                                    >Return to login</Link>
                                    <Button
                                        variant="outlined"
                                        onClick={register}
                                        startIcon={isLoading ? <CircularProgress size={12}/> : null}
                                        disabled={isLoading}
                                    >
                                        Register&nbsp;<RegisterIcon/>
                                    </Button>
                                </>
                            )
                        }
                    </Stack>


                    {error && (
                        <Alert severity="error">{error}</Alert>
                    )}
                </Box>
            </Box>

        </Box>
    );
}