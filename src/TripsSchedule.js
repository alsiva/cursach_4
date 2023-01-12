import React, {useEffect, useState} from "react";
import {delay} from "./utils";
import {Box, Button, CircularProgress, Divider, Stack, TextField} from "@mui/material";
import dayjs from "dayjs";
import {DateTimePicker} from "@mui/x-date-pickers";

async function getSchedule(tripId) {
    await delay(500)

    const response = await fetch(`/api/trips/${tripId}/schedule`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    console.log('Response')
    console.log(response)

    if (response.status === 404) {
        return []
    }

    return (await response.json()).map(schedule => (
        {
            id: schedule.id,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            description: schedule.description
        }
    ))
}

export default function TripSchedule({trip, userInfo, back}) {
    const [schedules, setSchedules] = useState(null)

    useEffect(() => {
        getSchedule(trip.id).then(schedule => setSchedules(schedule))
    }, [trip.id])

    if (schedules === null) {
        return <CircularProgress/>
    }

    return (
        <div>
            <Button onClick={back}>Go back</Button>
            <Box sx={{ p: 2, border: '1px dashed grey' }}>
                <ul>
                    {schedules.map(schedule => (
                        <li key={schedule.id}>
                            <Stack divider={<Divider orientation="vertical" flexItem/>}
                                   direction={"row"}
                                   spacing={1}
                                   alignItems={"center"}
                            >
                                {userInfo.right === 'organizer' &&
                                    <Button onClick={() => deleteSchedule(schedule.id)}>Delete</Button>
                                }
                                <h3>{schedule.startTime} - {schedule.endTime}:</h3>
                                <h3>{schedule.description}</h3>
                            </Stack>
                        </li>
                    ))}
                </ul>
            </Box>

            {userInfo.right === 'organizer' &&
                <div>
                    <h1>Adding schedule</h1>
                    <CreateSchedule addSchedule={addSchedule}/>
                </div>
            }
        </div>
    )

    async function deleteSchedule(toRemoveId) {
        const response = await fetch('/api/schedule/' + toRemoveId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        await response.json()

        setSchedules(prev => prev.filter(schedule => schedule.id !== toRemoveId))
    }

    async function addSchedule(startTime, endTime, description) {


        const BACK_FORMAT = 'YYYY-MM-DDTHH:mm'
        startTime = dayjs(startTime).format(BACK_FORMAT)
        endTime = dayjs(endTime).format(BACK_FORMAT)
        console.log('startTime')
        console.log(startTime)

        const response = await fetch(`/api/trips/${trip.id}/schedule?startTime=${startTime}&endTime=${endTime}&description=${description}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const json = await response.json()
        console.log('json')
        console.log(json)

        setSchedules(prev => [
            ...prev, {
                id: json.id,
                startTime: json.startTime,
                endTime: json.endTime,
                description: json.description
            }
        ])

        console.log('schedules')
        console.log(schedules)
    }
}

const TIMESTAMP_FORMAT = "DD/MM/YYYY HH:mm:ss"

function CreateSchedule({addSchedule}) {
    const [startTime, setStartTime] = useState(dayjs())
    const [endTime, setEndTime] = useState(dayjs())
    const [description, setDescription] = useState("")


    return (
        <div>
            <Stack maxWidth={400} spacing={1}>
                <DateTimePicker
                    label="StartTime"
                    inputFormat={TIMESTAMP_FORMAT}
                    value={startTime}
                    onChange={(dateTime) => {
                        setStartTime(dateTime)
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                <DateTimePicker
                    label="EndTime"
                    inputFormat={TIMESTAMP_FORMAT}
                    value={endTime}
                    onChange={(dateTime) => {
                        setEndTime(dateTime)
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                <textarea
                    value={description}
                    onChange={e => setDescription(e.currentTarget.value)}
                />
                <Button
                    variant="outlined"
                    onClick={() => addSchedule(startTime.format(TIMESTAMP_FORMAT), endTime.format(TIMESTAMP_FORMAT), description)}
                >
                    Add Schedule
                </Button>
            </Stack>
        </div>
    )
}