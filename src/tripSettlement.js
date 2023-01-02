import React, {useEffect, useState} from 'react'
import {Box, Button, Chip, CircularProgress, FormControl, InputLabel, MenuItem, Select, Stack} from "@mui/material";
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
            <Button onClick={back}>back to trip list</Button>
            <SettlementManagement tripId={trip.id} userInfo={userInfo}/>
        </div>
    )
}


function SettlementManagement({tripId, userInfo}) {
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

    const housesWithCapacity = info.filter(it => it.settled.length < it.house.capacity).map(it => it.house)

    return (
        <div>
            <ul>
                {info.map(({house, settled}) => {
                    return (
                        <li key={house.id}>
                            <h4>{house.name}</h4>
                            <Stack direction={"row"} spacing={1}>
                                {settled.map(settlement => (
                                    <Chip
                                        key={settlement.id}
                                        label={settlement.user.name}
                                        variant="outlined"
                                        onClick={() => {
                                            if (userInfo.right === 'organizer') {
                                                removeSettler(settlement.id).then(() => {
                                                        setSettlements(prev => prev.filter(toDelete => toDelete.id !== settlement.id))
                                                    }
                                                )
                                            }
                                        }}
                                    />
                                ))}
                            </Stack>
                        </li>
                    )
                })}
            </ul>
            <div>
                <h4>Not settled</h4>
                <ul>
                    {notSettled.map((participant) => {
                        return (
                            <Box key={participant.id} sx={{maxWidth: 120}}>
                                {userInfo.right === 'organizer'
                                    ? (
                                        <FormControl fullWidth>
                                            <InputLabel id={participant.id.toString()}>{participant.name}</InputLabel>
                                            <Select
                                                labelId={participant.id.toString()}
                                                key={participant.id}
                                                value={''}
                                                label={participant.name}
                                                onChange={e => {
                                                    const houseId = Number(e.target.value)
                                                    addSettler(participant.id, tripId, houseId).then(settlement => {
                                                        setSettlements(prev => {
                                                            const newSettlement = {
                                                                id: settlement.id,
                                                                tripId: settlement.tripId,
                                                                houseId: settlement.houseId,
                                                                userId: settlement.userId,
                                                                user: participant,
                                                            }
                                                            return [...prev, newSettlement]
                                                        })
                                                    })
                                                }}
                                            >
                                                {housesWithCapacity.map(house => (
                                                    <MenuItem key={house.id} value={house.id}>{house.name}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    ) : (
                                        <h4>{participant.name}</h4>
                                    )
                                }
                            </Box>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

async function removeSettler(settlementId) {
    await delay(500)

    const response = await fetch('/api/settlements/' + settlementId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const json = await response.json()

    console.log(json)
    return json
}

async function addSettler(userId, tripId, houseId) {
    await delay(500)

    const response = await fetch('/api/settlements', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: userId,
            tripId: tripId,
            houseId: houseId
        }),
    })

    return await response.json()
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

