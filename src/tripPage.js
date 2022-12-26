import React, {useEffect, useState} from 'react'
import {CircularProgress, MenuItem, Select} from "@mui/material";

function delay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms)
    })
}


export default function TripPage({trip, userInfo, back}) {
    return (
        <div>
            <button onClick={back}>back to trip list</button>
            <h3>{trip.title}</h3>
            <p>Starts on {trip.startDate}, ends on {trip.endDate}</p>
            <h4>Application status</h4>
            {trip.mainOrganizerID === userInfo.id
                ? <TripManagement tripId={trip.id}/>
                : <ApplicationStatus/>}

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
                                approved={application.status}
                                changeStatus={status => {
                                    setApplications(prev => [
                                        ...prev.slice(0, index),
                                        {...application, status: status},
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

function ParticipantStatus({approved, changeStatus}) {

    //todo onChangeUpdateAplicantState

    return (
        <Select
            value={approved}
            label="Aplicant status"
            onChange={e => {
                changeStatus(e.target.value)
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

function ApplicationStatus() {
    const [status, setState] = useState(null)

    useEffect(() => {
        setTimeout(() => {
            // select to database
            // select from tripparticipant where user = currentUser and trip = currentTrip
            // if no record - 'idle'
            // if there is record - see 'approved'
            // null - 'applied'
            // true - 'confirmed'
            // false - 'rejected'

            setState({
                state: 'idle'
            })
        }, 1000)
    }, [])

    async function submitApplication(text) {
        setState(null)
        await delay(500)
        setState({
            state: 'applied'
        })

        await (5000)
        setState({
            state: Math.random() > 0.5 ? 'confirmed' : 'rejected'
        })
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