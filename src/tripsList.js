import React, {useEffect, useState} from 'react';
import {CircularProgress} from "@mui/material";
import TripPage from "./tripPage";

const initialTrips = [
    {
        id: 1,
        title: 'Первый весенний выезд',
        startDate: '1 марта 2023',
        endDate: '7 марта 2023',
        mainOrgId: 38,
    },
    {
        id: 4,
        title: 'В середине лета',
        startDate: '7 июля 2023',
        endDate: '21 июля 2023',
        mainOrgId: 38,
    },
]

export default function TripsList({ userInfo, logout }) {
    const [selectedTrip, setSelectedTrip] = useState(null)

    return (
        <div className={"header"}>
            <h1>Hi, {userInfo.name}</h1>
            <button onClick={logout}>logout</button>

            {selectedTrip == null
                ? <Trips setSelectedTrip={setSelectedTrip}/>
                : <TripPage trip={selectedTrip} userInfo={userInfo} back={() => setSelectedTrip(null)} />
            }
        </div>
    )
}

function Trips({setSelectedTrip}) {
    const [trips, setTrips] = useState(null)
    useEffect(() => {
        setTimeout(() => {
            setTrips(initialTrips)
        }, 1000)
    }, [])

    if (trips == null) {
        return <CircularProgress />
    }

    return (
        <div>
            <h2>List of trips</h2>
            <ul>
                {trips.map(trip => (
                    <li key={trip.id}>
                        <h3>{trip.title}</h3>
                        <p>Starts on {trip.startDate}, ends on {trip.endDate}</p>
                        <button onClick={() => setSelectedTrip(trip)}>View trip</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
