import React, {useEffect, useState} from 'react'
import {Button, CircularProgress} from "@mui/material";
import {delay} from "./utils";


//todo Не отображать людей которые подали заявку

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
                {applications.filter(application => application.approved === false).map((application, index) => {
                    const {berryPerson, letter} = application

                    return (
                        <li key={berryPerson.id}>
                            <h5>{berryPerson.name}</h5>
                            <p>
                                {letter}
                            </p>

                            <Button
                                variant="outlined"

                                onClick={() => {
                                    changeParticipantStatus(tripId, berryPerson.id)
                                    setApplications(applications.filter(application => application.berryPerson !== berryPerson.id))
                                }}
                            >
                                Add person
                            </Button>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}


async function changeParticipantStatus(tripId, userId) {
    const response = await fetch(`/api/trips/${tripId}/users?personID=${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return await response.json()
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

    if (array.status === 500) {
        return {state: 'idle'}
    } else {
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


        const json = await response.json()


        if (json.approved === true) {
            setStatus({ state: 'confirmed' })
        } else if (json.approved === false) {
            setStatus({ state: 'idle' })
        }

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