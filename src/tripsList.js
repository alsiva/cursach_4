import React, {useEffect, useState} from 'react';
import {Box, Button, Chip, CircularProgress, Link, Stack, TextField} from "@mui/material";
import TripApplication from "./tripApplication";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import {delay} from "./utils";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import TripSettlement from "./tripSettlement";
import TripSchedule from "./TripsSchedule";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import DateRangeIcon from '@mui/icons-material/DateRange';


export default function TripsList({userInfo, logout}) {
    return (
        <div>
            <Stack alignItems="center" direction="row" spacing={2}>
                <h2>Hi, {userInfo.name}</h2>
                <Button
                    size="small"
                    startIcon={<LogoutIcon/>}
                    onClick={logout}
                >
                    Logout
                </Button>
            </Stack>
            <TripListView userInfo={userInfo}/>
        </div>
    )
}

function TripListView({userInfo}) {
    const [current, setCurrent] = useState({page: 'trips'})

    function returnToMainPage() {
        setCurrent({page: 'trips'})
    }

    switch (current.page) {
        case 'trips':
            return (
                <Trips
                    setSelectedTrip={trip => setCurrent({page: 'application', trip: trip})}
                    userInfo={userInfo}
                    setSelectedSettlement={trip => setCurrent({page: 'settlement', trip: trip})}
                    setSelectedSchedule={trip => setCurrent({page: 'schedule', trip: trip})}
                />
            )
        case 'application':
            return (
                <TripApplication
                    trip={current.trip}
                    userInfo={userInfo}
                    back={returnToMainPage}
                />
            )
        case 'settlement':
            return (
                <TripSettlement
                    trip={current.trip}
                    userInfo={userInfo}
                    back={returnToMainPage}
                />
            )
        case 'schedule':
            return (
                <TripSchedule
                    trip={current.trip}
                    userInfo={userInfo}
                    back={returnToMainPage}
                />
            )
    }
}

async function getTrips() {
    await delay(1000)

    const response = await fetch('/api/trips', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    return await response.json()
}

function Trips({setSelectedTrip, userInfo, setSelectedSettlement, setSelectedSchedule}) {
    const [trips, setTrips] = useState(null)

    useEffect(() => {
        getTrips().then(json => setTrips(json))
    }, [])

    if (trips == null) {
        return <CircularProgress/>
    }

    async function addTrip(title, description, startDate, endDate) {
        const response = await fetch('/api/trips', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                startDate: startDate,
                endDate: endDate,
                mainOrganizerID: userInfo.id
            }),
        })

        const json = await response.json()

        setTrips(prev => [
            ...prev, {
                id: json.id,
                title: json.title,
                startDate: json.startDate,
                endDate: json.endDate,
                mainOrganizerID: userInfo.id
            }
        ])
    }

    async function deleteTrip(tripToRemoveId) {
        const response = await fetch('/api/trips/' + tripToRemoveId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        await response.json()

        setTrips(prev => prev.filter(trip => trip.id !== tripToRemoveId))

    }

    return (
        <div>
            <h2>List of trips</h2>
            <ul>
                {trips.map(trip => (
                    <li key={trip.id}>
                        <Box sx={{ p: 2, border: '1px dashed grey' }}>
                            <Stack alignItems="center" direction="row" spacing={2}>
                                <h3>{trip.title}</h3>
                                {trip.mainOrganizerID === userInfo.id && (
                                    <>
                                        <Chip icon={<SupervisorAccountIcon/>} label="admin" variant="outlined"/>
                                        <Button
                                            size="small"
                                            startIcon={<DeleteIcon/>}
                                            onClick={() => deleteTrip(trip.id)}
                                        >
                                            Delete trip
                                        </Button>
                                    </>
                                )}
                            </Stack>
                            <Stack direction="row" spacing={0} alignItems="center">
                                <DateRangeIcon />&nbsp;
                                <span>{trip.startDate}</span>&nbsp;-&nbsp;<span>{trip.endDate}</span>
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <Link
                                    component="button"
                                    variant="body2"
                                    onClick={() => setSelectedSettlement(trip)}
                                >View settlement</Link>

                                <Link
                                    component="button"
                                    variant="body2"
                                    onClick={() => setSelectedTrip(trip)}
                                >View application</Link>
                                <Link
                                    component="button"
                                    variant="body2"
                                    onClick={() => setSelectedSchedule(trip)}
                                >View schedule</Link>
                            </Stack>
                        </Box>
                    </li>
                ))}
            </ul>

            {userInfo.right === 'organizer' && (
                <CreateTrip addTrip={addTrip}/>
            )}
        </div>
    )
}

const DATEPICKER_FORMAT = "DD/MM/YYYY"

function CreateTrip({addTrip}) {
    const [title, setTitle] = useState("")
    const [startDate, setStartDate] = useState(dayjs().add(1, 'week'))
    const [endDate, setEndDate] = useState(dayjs().add(2, 'week'))
    const [description, setDescription] = useState("")


    return (
        <div>
            <h2>Create trip</h2>
            <div>
                <Stack maxWidth={400} spacing={2}>
                    <TextField
                        label="Title"
                        variant="outlined"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                    />
                    <DesktopDatePicker
                        label="Start date"
                        inputFormat={DATEPICKER_FORMAT}
                        value={startDate}
                        onChange={(date) => {
                            setStartDate(date)
                        }}
                        renderInput={({error, helperText, ...restParams}) => (
                            <TextField
                                error={startDate == null ? true : error}
                                helperText={startDate == null ? 'Can\'t be empty' : helperText}
                                {...restParams}
                            />
                        )}
                    />
                    <DesktopDatePicker
                        label="End date"
                        inputFormat={DATEPICKER_FORMAT}
                        value={endDate}
                        onChange={(date) => {
                            setEndDate(date)
                        }}
                        renderInput={({error, helperText, ...restParams}) => (
                            <TextField
                                error={startDate == null ? true : error}
                                helperText={startDate == null ? 'Can\'t be empty' : helperText}
                                {...restParams}
                            />
                        )}
                    />
                    <TextareaAutosize
                        minRows={3}
                        placeholder="Trip description"
                        onChange={e => setDescription(e.currentTarget.value)}
                    />
                    <Button
                        variant="outlined"
                        disabled={startDate == null || endDate == null}
                        onClick={() => {
                            addTrip(title, description, startDate.format(API_FORMAT), endDate.format(API_FORMAT));
                        }}
                    >
                        Add trip
                    </Button>
                </Stack>
            </div>
        </div>
    )
}

const API_FORMAT = 'YYYY/MM/DD';
