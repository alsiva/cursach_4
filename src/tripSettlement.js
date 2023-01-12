import React, {useEffect, useState} from 'react'
import {
    Avatar,
    Box,
    Button, CardContent,
    CardHeader,
    Chip,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack
} from "@mui/material";
import {delay} from "./utils";
import Card from "@mui/material/Card";


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

    const notSettled = participants.filter(candidate => !settlements.some(settlement => settlement.berryPerson.id === candidate.id))

    const info = houses.map(house => {
        const settledInThisHouse = settlements.filter(settlement => settlement.house.id === house.id)

        return {
            house: house,
            settled: settledInThisHouse,
        }
    })


    const housesWithCapacity = info.filter(it => it.settled.length < it.house.maxPeople).map(it => it.house)

    return (
        <div>
            {info.map(({house, settled}) => {
                return (
                    <Card key={house.id}
                          sx={{margin: 1, boxShadow: 1, border: 1, borderColor: '#dbdbdb', flex: '1 1 400px'}}>

                        <CardHeader
                            avatar={
                                <Avatar sx={{bgcolor: "#f0d400"}} aria-label="house_name">
                                    {house.name}
                                </Avatar>
                            }
                        />
                        <CardContent>
                            <Stack direction={"row"} spacing={1}>
                                {settled.map(settlement => (
                                    <Chip
                                        key={settlement.berryPerson.id}
                                        label={settlement.berryPerson.name}
                                        variant="outlined"
                                        onClick={() => {
                                            if (userInfo.right === 'organizer') {
                                                removeSettler(settlement.trip.id, settlement.house.id, settlement.berryPerson.id).then(() => {
                                                        console.log('TO DELETE !!!!!!!!!!!!!!')
                                                        console.log(settlements)
                                                        setSettlements(prev => prev.filter(toDelete => toDelete.berryPerson.id !== settlement.berryPerson.id))
                                                    }
                                                )
                                            }
                                        }}
                                    />
                                ))}
                            </Stack>
                        </CardContent>
                    </Card>
                )
            })}

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
                                                        console.log("Settlement")
                                                        console.log(settlement)
                                                        setSettlements(prev => {
                                                            return [...prev, settlement]
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

async function removeSettler(tripId, houseId, berryPersonId) {
    await delay(500)

    await fetch(`/api/trips/${tripId}/settlement?houseID=${houseId}&personID=${berryPersonId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

async function addSettler(userId, tripId, houseId) {
    await delay(500)

    const response = await fetch(`/api/trips/${tripId}/settlement?houseID=${houseId}&personID=${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        }

    })


    return await response.json()
}

async function getTripSettlement(tripId) {
    await delay(500)

    const response = await fetch(`/api/trips/${tripId}/settlement`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    const json = await response.json()

    console.log('JSON')
    console.log(json)
    if (json.length === 0) return []


    return json
}

async function getTripParticipants(tripId) {
    await delay(500)

    const response = await fetch(`/api/trips/${tripId}/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    if (response.status === 404) {
        return []
    }

    return (await response.json()).map(application => application.berryPerson)
}

