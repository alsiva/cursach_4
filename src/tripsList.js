import React, {useEffect, useState} from 'react';
import {Button, Chip, CircularProgress, TextField} from "@mui/material";
import TripPage from "./tripPage";
import DatePicker from 'react-datepicker'
import {delay} from "./utils";

export default function TripsList({userInfo, logout}) {
    const [selectedTrip, setSelectedTrip] = useState(null)


    return (
        <div className={"header"}>
            <h1>Hi, {userInfo.name}</h1>
            <button onClick={logout}>logout</button>

            {selectedTrip == null
                ? <Trips setSelectedTrip={setSelectedTrip} userInfo={userInfo}/>
                : <TripPage trip={selectedTrip} userInfo={userInfo} back={() => setSelectedTrip(null)}/>
            }
        </div>
    )
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

function Trips({setSelectedTrip, userInfo}) {
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
                        <button onClick={() => setSelectedTrip(trip)}>View trip</button>
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

function CreateTrip({addTrip}) {
    const [title, setTitle] = useState("")
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
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
                <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                        setStartDate(date)
                    }}
                />
                <DatePicker
                    selected={endDate}
                    onChange={(date) => {
                        setEndDate(date)
                    }}
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
