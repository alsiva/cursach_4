import React, {useState} from 'react';
import {Alert, Button, CircularProgress, TextField} from "@mui/material";
import {delay} from "./utils";


export default function Login({onLogin}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState("");


    async function login() {
        setIsLoading(true)
        setIsRegistering(false)
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


        if (response.status === 400) {
            setError(response.statusText)
            setIsLoading(false)
            return
        }

        await delay(1000)
        setIsLoading(false)

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
        setIsRegistering(true);
        await delay(1000)
        setIsRegistering(false)


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



        if (response.status === 409) {
            setIsRegistering(false)
            setError(`user ${username} already exists`)
            return
        }

        if (response.status === 400) {
            const json = await response.json()
            let error = Object.keys(json).map(key => `${key}: ${json[key]}`).join(', ');

            setIsRegistering(false)
            setError(error)

            return
        }

        if (response.status === 500) {
            setIsRegistering(false)
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
        <header>
            <div className="about">
                <h1>Курсовая работа №4</h1>
                <ul>
                    <li>Студент: <span className="author-name">Иванов Алексей Анатольевич</span></li>
                    <li>Группа: <span className="cursive">P33131</span></li>
                </ul>
            </div>

            <div className="login-form">
                <TextField
                    label="User"
                    variant="outlined"
                    value={username}
                    onChange={(e) => {
                        setError("")
                        setUsername(e.target.value)
                    }}
                />
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
                <Button
                    variant="outlined"
                    onClick={login}
                    startIcon={isLoading ? <CircularProgress size={12}/> : null}
                    disabled={isLoading}
                >
                    Login
                </Button>

                <Button
                    variant="outlined"
                    onClick={register}
                    startIcon={isRegistering ? <CircularProgress size={12}/> : null}
                    disabled={isRegistering}
                >
                    Register
                </Button>

                {error && (
                    <Alert severity="error">{error}</Alert>
                )}
            </div>
        </header>
    );
}