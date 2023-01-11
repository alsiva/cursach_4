import React, {useEffect, useState} from 'react'
import {Button, CircularProgress, MenuItem, Select} from "@mui/material";
import {delay} from "./utils";


export default function TripApplication({trip, userInfo, back}) {
    return (
        <div>
            <Button onClick={back}>back to trip list</Button>
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

    const response = await fetch(`/api/trips/${tripId}/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    const json = await response.json()
    console.log('JSON')
    console.log(json)
    return json
}

function TripManagement({tripId}) {
    const [applications, setApplications] = useState(null)
    const [seeType, setSeeType] = useState('applied')

    useEffect(() => {
        getTripApplications(tripId).then(applications => setApplications(applications))
    }, [tripId])

    if (applications == null) {
        return <CircularProgress/>
    }

    return (
        <div>
            <h4>List of applications</h4>
            <SetType seeType={seeType} setSeeType={setSeeType}/>
            <ul>
                {applications.filter(application => application.state === seeType).map((application, index) => {
                    const {user, letter, tripId, userId} = application

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


    const response = await fetch(`/api/applications/${id}`, {
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

function SetType({seeType, setSeeType}) {
    return (
        <Select
            value={seeType}
            label="SeeType"
            onChange={e => setSeeType(e.target.value)}
        >
            <MenuItem value='applied'>{'applied'}</MenuItem>
            <MenuItem value='confirmed'>{'confirmed'}</MenuItem>
            <MenuItem value='rejected'>{'rejected'}</MenuItem>
        </Select>
    )
}

function ParticipantStatus({state, changeStatus, id}) {
    const [isLoading, setIsLoading] = useState(false)

    if (isLoading) {
        return <CircularProgress/>
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

    const response = await fetch(`/api/trips/${tripId}/application?personID=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    const array = await response.json()

    if (array.status === 404) {
        return {state: 'idle'}
    } else {
        console.log('Application status')
        console.log(array)
        if (array.approved === false) {
            return {state: 'applied'}
        } else if (array.approved === true) {
            return {state: 'confirmed'}
        }
    }
}

function ApplicationStatus({tripId, userId}) {
    const [status, setStatus] = useState(null)

    useEffect(() => {
        getApplicationStatus(tripId, userId).then(status => {
            setStatus(status)
        })
    }, [tripId, userId])

    async function submitApplication(letter) {
        setStatus(null)
        await delay(500)


        const response = await fetch(`api/trips/${tripId}/application?personID=${userId}&letter=${letter}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
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