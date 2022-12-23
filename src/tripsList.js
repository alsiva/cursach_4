import React, {useEffect, useState} from 'react';
import {CircularProgress} from "@mui/material";

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
    const [trips, setTrips] = useState(null)
    useEffect(() => {
        setTimeout(() => {
            setTrips(initialTrips)
        }, 1000)
    }, [])

    return (
        <div className={"header"}>
            <h1>Hi, {userInfo.name}</h1>
            <button onClick={logout}>logout</button>

            <h2>List of trips</h2>
            {trips == null
                ? <CircularProgress />
                : (
                    <ul>
                        {trips.map(trip => (
                            <li key={trip.id}>
                                <h3>{trip.title}</h3>
                                <p>Starts on {trip.startDate}, ends on {trip.endDate}</p>
                            </li>
                        ))}
                    </ul>
                )}
        </div>
    )
}
