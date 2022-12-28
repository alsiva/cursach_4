import React, {useEffect, useState} from 'react'
import {CircularProgress} from "@mui/material";
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
    const [settlements, setSettlements] = useState(null)

    useEffect(() => {
        getHouses().then(houses => setHouses(houses))
        getTripParticipants(tripId).then(participants => setParticipants(participants))
        getTripSettlement(tripId).then(settlement => setSettlements(settlement))
    }, [tripId])

    if (houses == null || participants == null || settlements == null) {
        return <CircularProgress/>
    }

    const notSettled = participants.filter(candidate => !settlements.some(settlement => settlement.userId === candidate.id))

    const info = houses.map(house => {
        const settledInThisHouse = settlements.filter(settlement => settlement.houseId === house.id)

        return {
            house: house,
            settled: settledInThisHouse,
        }
    })


    return (
        <div>
            <div>
                {info.map(({ house, settled }) => {
                    return (
                        <li key={house.id}>
                            <h4>{house.name}</h4>
                            <ul>
                                {settled.map(settlement => (
                                    <li key={settlement.id}>
                                        {settlement.user.name}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    )
                })}
            </div>
            <div>
                <h4>Not settled</h4>
                <ul>
                    {notSettled.map((participant) => {
                        return (
                            <li key={participant.id}>
                                {participant.name}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}


async function getTripSettlement(tripId) {
    await delay(500)

    const response = await fetch('/api/settlements?_expand=user&tripId=' + tripId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    return await response.json()
}

async function getTripParticipants(tripId) {
    await delay(500)

    const response = await fetch('/api/applications?_expand=user&state=confirmed&tripId=' + tripId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    return (await response.json()).map(application => application.user)
}

function SettlementParticipant({tripId, houses}) {
    return <div>There will be settlement for participants</div>
}

