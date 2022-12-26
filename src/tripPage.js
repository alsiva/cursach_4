import React, {useEffect, useState} from 'react'
import {CircularProgress, MenuItem, Select} from "@mui/material";
import {delay} from "./utils";


export default function TripPage({trip, userInfo, back}) {
    return (
        <div>
            <button onClick={back}>back to trip list</button>
            <h3>{trip.title}</h3>
            <p>Starts on {trip.startDate}, ends on {trip.endDate}</p>
            <h4>Application status</h4>
            {trip.mainOrganizerID === userInfo.id
                ? <TripManagement tripId={trip.id}/>
                : <ApplicationStatus tripId={trip.id} userId={userInfo.id}/>
            }
        </div>
    )
}


async function getTripApplications(tripId) {
    await delay(500)

    const response = await fetch('/api/participants?_expand=user&tripId=' + tripId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    return await response.json()
}
function TripManagement({ tripId }) {
    const [applications, setApplications] = useState(null)

    useEffect(() => {
        getTripApplications(tripId).then(applications => setApplications(applications))
    }, [tripId])

    if (applications == null) {
        return <CircularProgress/>
    }

    return (
        <div>
            <h4>List of applications</h4>
            <ul>
                {applications.map((application, index) => {
                    const { user, letter, tripId, userId } = application

                    return (
                        <li key={tripId + ":" + userId}>
                            <h5>{user.name}</h5>
                            <p>
                                {letter}
                            </p>
                            <ParticipantStatus
                                id={application.id}
                                state={application.state}
                                changeStatus={status => {
                                    setApplications(prev => [
                                        ...prev.slice(0, index),
                                        {...application, state: status},
                                        ...prev.slice(index + 1)
                                    ])
                                }}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}


async function changeParticipantStatus(id, newState) {
    const response = await fetch(`/api/participants/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            state: newState,
        }),
    })

    return await response.json()
}


function ParticipantStatus({state, changeStatus, id}) {
    const [isLoading, setIsLoading] = useState(false)

    if (isLoading) {
        return <CircularProgress />
    }

    return (
        <Select
            value={state}
            label="Aplicant status"
            onChange={e => {
                setIsLoading(true)
                changeParticipantStatus(id, e.target.value).then(application => {
                    changeStatus(application.state)
                    setIsLoading(false)
                })

            }}
        >
            <MenuItem value='applied'>{'applied'}</MenuItem>
            <MenuItem value='confirmed'>{'confirmed'}</MenuItem>
            <MenuItem value='rejected'>{'rejected'}</MenuItem>
        </Select>
    )


    // if (aplicantStatus === 'confirmed') {
    //     return <Chip label="confirmed" color="success" />
    // } else if (aplicantStatus === 'applied') {
    //     return <Chip label="applied" color="primary" />
    // } else if (aplicantStatus === 'rejected') {
    //     return <Chip label="rejected" color="error"/>
    // }
    // //return <Chip label="unknown status" color="warning"></Chip>


}


async function getApplicationStatus(tripId, userId) {
    await delay(500)

    const response = await fetch(`/api//participants?tripId=${tripId}&userId=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    const array = await response.json()
    if (array.length === 0) {
        return { state: 'idle' }
    } else {
        return array[0]
    }
}
function ApplicationStatus({ tripId, userId }) {
    const [status, setStatus] = useState(null)

    useEffect(() => {
        getApplicationStatus(tripId, userId).then(status => {
            setStatus(status)
        })
    }, [tripId, userId])

    async function submitApplication(letter) {
        setStatus(null)
        await delay(500)

        const response = await fetch('/api/participants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tripId: tripId,
                userId: userId,
                letter: letter,
                state: 'applied',
            }),
        })

        const status = await response.json()
        setStatus(status)
    }

    if (status === null) {
        return <CircularProgress/>
    }

    if (status.state === 'idle') {
        return (
            <ApplicationSubmit onSubmit={submitApplication}/>
        )
    }

    if (status.state === 'applied') {
        return (
            <p>Your application has been submitted. Please wait for review</p>
        )
    }

    if (status.state === 'rejected') {
        return (
            <p>You has been rejected for this trip</p>
        )
    }

    if (status.state === 'confirmed') {
        return (
            <p>Congratulation! You has been selected for this trip!</p>
        )
    }
}


function ApplicationSubmit({onSubmit}) {
    const [text, setText] = useState("")

    return (
        <div>
            <h4>Submit your letter</h4>
            <textarea value={text} onChange={e => setText(e.currentTarget.value)}/>
            <button onClick={() => onSubmit(text)}>Submit</button>
        </div>
    )
}