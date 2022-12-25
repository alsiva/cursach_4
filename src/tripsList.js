import React, {useEffect, useState} from 'react';
import {Alert, Button, Chip, CircularProgress, TextField} from "@mui/material";
import TripPage from "./tripPage";
import DatePicker from 'react-datepicker'

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

function Trips({setSelectedTrip, userInfo}) {
    const [trips, setTrips] = useState(null)
    useEffect(() => {
        setTimeout(() => {
            setTrips([
                {
                    id: 1,
                    title: 'Первый весенний выезд',
                    startDate: '1 марта 2023',
                    endDate: '7 марта 2023',
                    mainOrganizerID: 1
                },
                {
                    id: 4,
                    title: 'В середине лета',
                    startDate: '7 июля 2023',
                    endDate: '21 июля 2023',
                    mainOrganizerID: 4,
                },
            ])
        }, 1000)
    }, [])

    if (trips == null) {
        return <CircularProgress/>
    }

    async function addTrip(title, description, startDate, endDate) {
        console.log(title)
        console.log(description)
        console.log(startDate)
        console.log(endDate)

        setTrips(prev => [
            ...prev, {
                id: prev.length + 1,
                title: title,
                startDate: startDate.toString(),
                endDate: endDate.toString(),
                mainOrganizerID: userInfo.id
            }
        ])
    }

    async function deleteTrip(tripIndex) {
        setTrips(prev => [
            ...prev.slice(0, tripIndex), ...prev.slice(tripIndex + 1)
        ])

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
                        <button onClick={() => deleteTrip(trips.indexOf(trip))}>DeleteTrip</button>
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
