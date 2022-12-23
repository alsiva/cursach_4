import React, {useState, useEffect } from 'react'
import {CircularProgress} from "@mui/material";

// denied, confirmed, applied, idle


export default function TripPage({trip, userInfo, back}) {
    const [applicationStatus, setApplicationStatus] = useState(null)
    useEffect(() => {
        setTimeout(() => {
            setApplicationStatus({
                state: 'idle'
            })
        }, 1000)
    }, [])

    return (
        <div>
            <button onClick={back}>back to trip list</button>
            <h3>{trip.title}</h3>
            <p>Starts on {trip.startDate}, ends on {trip.endDate}</p>
            <h4>Application status</h4>
            <ApplicationStatus status={applicationStatus}/>
        </div>
    )
}

function ApplicationStatus(status) {
    if (status === null) {
        return <CircularProgress/>
    }

    if (status.state === 'idle') {
        return (
            <div>
                <h4>Submit your letter</h4>
                <textarea></textarea>
                <button>Submit</button>
            </div>
        )
    }

    if (status.state === 'applied') {
        return (
            <p>Your application has been submitted. Please wait for review</p>
        )
    }

    if (status.state === 'denied') {
        return (
            <p>You has been denied for this trip</p>
        )
    }

    if (status.state === 'confirmed') {
        return (
            <p>Congratulation! You has been selected for this trip!</p>
        )
    }
}