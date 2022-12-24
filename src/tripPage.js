import React, {useState, useEffect } from 'react'
import {Chip, CircularProgress} from "@mui/material";

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
                ? <TripManagement/>
                : <ApplicationStatus /> }

        </div>
    )
}

function TripManagement() {
    const [applicants, setApplicants] = useState(null)

    useEffect(() => {
        setTimeout(() => {
            setApplicants([
                { id: 2, name: 'john', letter: 'I really want to be there', status: 'denied'}
            ])
        }, 1000)
    }, [])

    if (applicants == null) {
        return <CircularProgress />
    }

    return (
        <div>
            <h4>List of applicants</h4>
            <ul>
                {applicants.map(applicant => (
                    <li>
                        <h5>{applicant.name}</h5>
                        <p>
                            {applicant.letter}
                        </p>
                        {applicant.status === 'confirmed'
                            ? <Chip label="confirmed" color="success" />
                            : <Chip label="applied" color="primary" />
                        }
                    </li>
                ))}
            </ul>
        </div>
    )
}

function ApplicationStatus() {
    const [status, setState] = useState(null)

    useEffect(() => {
        setTimeout(() => {
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

        await(5000)
        setState({
            state: Math.random() > 0.5 ? 'confirmed' : 'denied'
        })
    }

    if (status === null) {
        return <CircularProgress/>
    }

    if (status.state === 'idle') {
        return (
            <ApplicationSubmit onSubmit={submitApplication} />
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