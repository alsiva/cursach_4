import React, {useEffect, useState} from "react";
import {delay} from "./utils";
import {Button, CircularProgress, TextField} from "@mui/material";
import dayjs from "dayjs";
import {DateTimePicker} from "@mui/x-date-pickers";

async function getSchedule(tripId) {
    await delay(500)

    const response = await fetch('/api/schedule?tripId=' + tripId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

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
            <button onClick={back}>Go back</button>
            <ul>
                {schedules.map(schedule => (
                    <li key={schedule.id}>
                        <h3>{schedule.startTime} - {schedule.endTime}:
                            {userInfo.right === 'organizer' &&
                                <button onClick={() => deleteSchedule(schedule.id)}>Delete</button>
                            }
                        </h3>
                        <h5>{schedule.description}</h5>
                    </li>
                ))}
            </ul>

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

        const response = await fetch('/api/schedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tripId: trip.id,
                startTime: startTime,
                endTime: endTime,
                description: description
            }),
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
            <h2>Create schedule</h2>
            <div className="login-form">
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
            </div>
        </div>
    )
}