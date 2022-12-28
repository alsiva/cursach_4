import React, {useEffect, useState} from 'react'
import {CircularProgress, MenuItem, Select} from "@mui/material";
import {delay} from "./utils";


async function getHouses() {
    await delay(500)

    const response = await fetch('/api/houses', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })


    return await response.json()
}

export default function TripSettlement({trip, userInfo, back}) {


    return (
        <div>
            <h1>There will be settlement</h1>
            <button onClick={back}>back to trip list</button>
            {trip.mainOrganizerID === userInfo.id
                ? <SettlementManagement tripId={trip.id}/>
                : <SettlementParticipant tripId={trip.id}/>
            }
        </div>
    )
}



function SettlementManagement({ tripId }) {
    const [houses, setHouses] = useState(null)
    const [participants, setParticipants] = useState(null)
    const [settlement, setSettlement] = useState(null)

    useEffect(() => {
        getHouses().then(houses => setHouses(houses))
        getTripParticipants(tripId).then(participants => setParticipants(participants))
    }, [tripId])

    if (houses == null || participants == null) {
        return <CircularProgress/>
    }

    return (
        <div>
            <div>
                {houses.map((house) => {
                    return (
                        <li key={house.id}>
                            {house.name}

                        </li>
                    )
                })}
            </div>
            <div>
                Ability to add settlers
                {participants.map((participant) => {
                    return (
                        <li key={participant.userId}>
                            {participant.user.name}
                        </li>
                    )
                })}
            </div>
        </div>
    )
}



async function getTripParticipants(tripId) {
    await delay(500)

    const response = await fetch('/api/applications?_expand=user&state=confirmed&tripId=' + tripId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    return await response.json()
}

function SettlementParticipant({tripId, houses}) {
    return <div>There will be settlement for participants</div>
}

