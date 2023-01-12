import React, {useState} from 'react';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Link,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import RegisterIcon from '@mui/icons-material/PersonAddAlt1';
import {delay} from "./utils";
import './index.css';
import {DesktopDatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";


export default function Login({onLogin}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [surname, setSurname] = useState("");
    const [sex, setSex] = useState('man');
    const [dob, setDob] = useState(dayjs())

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const [isLoginSelected, setLoginSelected] = useState(true)

    async function login() {
        setIsLoading(true)
        setError("")



        const response = await fetch(`/api/login?credential=${email}&password=${password}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        await delay(500)
        setIsLoading(false)

        if (response.status === 500) {
            setError('Wrong credentials')
            return
        }

        const json = await response.json()


        let rightValue = '';
        if (json.rightId === 1) {
            rightValue = 'participant'
        } else if (json.rightId === 2) {
            setError("You are banned")
            return
        } else if (json.rightId === 3) {
            rightValue = 'organizer'
        }

        //todo Обработай различные статусы, например когда человек заходит, а респонс при этом был не 200ok
        const userInfo = {
            id: json.id,
            name: json.name,
            username: json.username,
            right: rightValue
        }

        onLogin(userInfo)
    }

    async function register() {
        setError("")
        setIsLoading(true);


        const response = await fetch(`/api/users?email=${email}&username=${username}&password=${password}&name=${firstName}&surname=${surname}&sex=${sex}&dateOfBirth=${dayjs(dob).format('YYYY-MM-DD')}&telegram=&vk=`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
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



        let rightValue = '';
        if (json.rightId === 1) {
            rightValue = 'participant'
        } else if (json.rightId === 2) {
            setError("You are banned")
            return
        } else if (json.rightId === 3) {
            rightValue = 'organizer'
        }

        const userInfo = {
            id: json.id,
            name: json.name,
            right: rightValue
        }

        onLogin(userInfo)
    }

    return (
        <Box sx={{height: '100vh'}}>
            <Box sx={{
                height: '15vh',
                bgcolor: '#7afc28',

            }}>
                <Typography variant="h4" sx={{
                    color: '#ffffff',
                    paddingX: 5,
                    paddingTop: 5
                }}> Login/Register </Typography>
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '85vh'
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    maxHeight: 700,
                    width: 400,
                    paddingY: 1,

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
                            <>

                                <TextField
                                    label="Name"
                                    variant="outlined"
                                    value={username}
                                    onChange={(e) => {
                                        setError("")
                                        setUsername(e.target.value)
                                    }}
                                />

                                <TextField
                                    label="FirstName"
                                    variant="outlined"
                                    value={firstName}
                                    onChange={(e) => {
                                        setError("")
                                        setFirstName(e.target.value)
                                    }}
                                />

                                <TextField
                                    label="LastName"
                                    variant="outlined"
                                    value={surname}
                                    onChange={(e) => {
                                        setError("")
                                        setSurname(e.target.value)
                                    }}
                                />

                                <Select
                                    value={sex}
                                    label="Sex"
                                    onChange={e => setSex(e.target.value)}
                                >
                                    <MenuItem value='man'>{'man'}</MenuItem>
                                    <MenuItem value='woman'>{'woman'}</MenuItem>
                                </Select>

                                <DesktopDatePicker
                                    label="Date of birth"
                                    inputFormat={"DD/MM/YYYY"}
                                    value={dob}
                                    onChange={(date) => {
                                        setDob(date)
                                    }}
                                    renderInput={({error, helperText, ...restParams}) => (
                                        <TextField
                                            error={dob == null ? true : error}
                                            helperText={dob == null ? 'Can\'t be empty' : helperText}
                                            {...restParams}
                                        />
                                    )}
                                />


                            </>
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