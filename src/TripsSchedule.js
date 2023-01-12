import React, {useEffect, useState} from "react";
import {delay} from "./utils";
import {Box, Button, CircularProgress, Divider, Stack, TextField} from "@mui/material";
import dayjs from "dayjs";
import {DateTimePicker} from "@mui/x-date-pickers";


export default function TripSchedule({trip, userInfo, back}) {
    const [schedules, setSchedules] = useState(null)

    const BACK_FORMAT = 'YYYY-MM-DDTHH:mm'

    async function getSchedule(tripId) {
        await delay(500)

        const response = await fetch(`/api/trips/${tripId}/schedule`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })



        if (response.status === 404) {
            return []
        }

        return (await response.json()).map(schedule => (
            {
                start: dayjs(schedule.start).format(BACK_FORMAT),
                end: dayjs(schedule.end).format(BACK_FORMAT),
                description: schedule.description
            }
        ))
    }

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
                        <li key={schedule.start}>
                            <Stack divider={<Divider orientation="vertical" flexItem/>}
                                   direction={"row"}
                                   spacing={1}
                                   alignItems={"center"}
                            >
                                {userInfo.right === 'organizer' &&
                                    <Button onClick={() => deleteSchedule(trip.id, schedule.start, schedule.end)}>Delete</Button>
                                }
                                <h3>{schedule.start} - {schedule.end}:</h3>
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



    async function deleteSchedule(tripId, startTime, endTime) {

        startTime = dayjs(startTime).format(BACK_FORMAT)
        endTime = dayjs(endTime).format(BACK_FORMAT)

        await fetch(`/api/trips/${tripId}/schedule?startTime=${startTime}&endTime=${endTime}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })


        setSchedules(prev => prev.filter(schedule => schedule.start !== startTime))
    }




    async function addSchedule(startTime, endTime, description) {



        console.log('startTime')
        console.log(startTime)

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


        setSchedules(prev => [
            ...prev, {
                start: dayjs(json.start).format(BACK_FORMAT),
                end: dayjs(json.end).format(BACK_FORMAT),
                description: json.description
            }
        ])

        console.log('schedules')
        console.log(schedules)
    }

    function CreateSchedule({addSchedule}) {
        const [startTime, setStartTime] = useState(dayjs())
        const [endTime, setEndTime] = useState(dayjs())
        const [description, setDescription] = useState("")


        return (
            <div>
                <Stack maxWidth={400} spacing={1}>
                    <DateTimePicker
                        label="StartTime"
                        inputFormat={BACK_FORMAT}
                        value={startTime}
                        onChange={(dateTime) => {
                            setStartTime(dateTime)
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <DateTimePicker
                        label="EndTime"
                        inputFormat={BACK_FORMAT}
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
                        onClick={() => addSchedule(startTime.format(BACK_FORMAT), endTime.format(BACK_FORMAT), description)}
                    >
                        Add Schedule
                    </Button>
                </Stack>
            </div>
        )
    }
}



