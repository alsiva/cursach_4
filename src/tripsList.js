import React, {useEffect, useState} from 'react';
import {Button, Chip, CircularProgress, TextField} from "@mui/material";
import TripApplication from "./tripApplication";

import {delay} from "./utils";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import TripSettlement from "./tripSettlement";

export default function TripsList({userInfo, logout}) {
    return (
        <div className={"header"}>
            <h1>Hi, {userInfo.name}</h1>
            <button onClick={logout}>logout</button>
            <TripListView userInfo={userInfo}/>
        </div>
    )
}

function TripListView({ userInfo }) {
    const [selectedTrip, setSelectedTrip] = useState(null)
    const [selectedSettlement, setSelectedSettlement] = useState(null)

    if (selectedTrip !== null) {
        return <TripApplication trip={selectedTrip} userInfo={userInfo} back={() => setSelectedTrip(null)}/>
    }

    if (selectedSettlement !== null) {
        return <TripSettlement trip={selectedSettlement} userInfo={userInfo} back={() => setSelectedSettlement(null)}/>
    }

    return <Trips setSelectedTrip={setSelectedTrip} userInfo={userInfo} setSelectedSettlement={setSelectedSettlement}/>
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

function Trips({setSelectedTrip, userInfo, setSelectedSettlement}) {
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
                        <h3>{trip.title}</h3>
                        <p>Starts on {trip.startDate}, ends on {trip.endDate}</p>
                        {trip.mainOrganizerID === userInfo.id && (
                            <Chip label="admin" color="success"/>
                        )}
                        <button onClick={() => setSelectedSettlement(trip)}>View settlement</button>
                        <button onClick={() => setSelectedTrip(trip)}>View application</button>
                        {trip.mainOrganizerID === userInfo.id && (
                            <button onClick={() => deleteTrip(trip.id)}>DeleteTrip</button>
                        )}
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
    const [endDate, setEndDate] = useState(startDate.add(1, 'week'))
    const [description, setDescription] = useState("")


    return (
        <div>
            <h2>Create trip</h2>
            <div className="login-form">
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
                    renderInput={(params) => <TextField {...params} />}
                />
                <DesktopDatePicker
                    label="End date"
                    inputFormat={DATEPICKER_FORMAT}
                    value={endDate}
                    onChange={(date) => {
                        setEndDate(date)
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                <textarea
                    value={description}
                    onChange={e => setDescription(e.currentTarget.value)}
                />
                <Button
                    variant="outlined"
                    onClick={() => addTrip(title, description, startDate, endDate)}
                >
                    Add trip
                </Button>
            </div>
        </div>
    )
}
