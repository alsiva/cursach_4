import React, {useState} from 'react';
import {Alert, Button, CircularProgress, TextField} from "@mui/material";

function delay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms)
    })
}

const registeredUsers = new Map([
    ["alex", {
        password: "ivanov",
        id: "1",
        right: "organizer"
    }],
    ["ilya", {
        password: "gerasim",
        id: "2",
        right: "ban"
    }],
    ["danya", {
        password: "lena",
        id: "3",
        right: "participant"
    }]
]);

export default function Login({onLogin}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState("");


    async function login() {
        setIsLoading(true)
        setIsRegistering(false)
        setError("")
        /*
        const response = await fetch('http://localhost:3100/users', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + btoa(username + ":" + password),
                'X-Requested-With': 'XMLHttpRequest',
            },
        })

        setIsLoading(false)
        if (response.status === 401) {
            setError("Wrong credentials")
            return;
        }
        setError("")

        // todo: use later
        const userInfo = await response.json()
        */
        await delay(1000)
        setIsLoading(false)

        if (!registeredUsers.has(username)) {
            setError("No such user")
            return
        }

        const realPassword = registeredUsers.get(username).password
        if (realPassword !== password) {
            setError("Wrong credentials")
            return
        }

        if (registeredUsers.get(username).right === "ban") {
            setError("You are banned")
            return
        }

        const userData = registeredUsers.get(username);

        const userInfo = {
            id: 1,
            name: username,
            right: userData.right
        }

        onLogin(userInfo)
    }

    async function register() {
        setIsRegistering(true);
        await delay(1000)
        setIsRegistering(false)

        if (registeredUsers.has(username)) {
            setError(`user ${username} already exists`)
            return
        }

        setError("")

        registeredUsers.set(username, password)

        const userInfo = {
            name: username,
        }

        onLogin(userInfo)

        /*const response = await fetch('/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
            body: JSON.stringify({ name: username, password: password }),
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
        }*/
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