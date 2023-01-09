import React, {useEffect, useState} from 'react';
import {
    Avatar,
    Box,
    Button,
    CardActions,
    CardContent,
    CardHeader,
    CircularProgress,
    Link,
    Stack,
    TextField, Typography
} from "@mui/material";
import TripApplication from "./tripApplication";
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import {delay} from "./utils";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import TripSettlement from "./tripSettlement";
import TripSchedule from "./TripsSchedule";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Card from '@mui/material/Card';


export default function TripsList({userInfo, logout}) {
    return (
        <div>
            <Stack alignItems="center" direction="row" spacing={2}>
                <h2>Hi, {userInfo.name}</h2>
                <Button
                    size="small"
                    startIcon={<LogoutIcon/>}
                    onClick={logout}
                >
                    Logout
                </Button>
            </Stack>
            <TripListView userInfo={userInfo}/>
        </div>
    )
}

function TripListView({userInfo}) {
    const [current, setCurrent] = useState({page: 'trips'})

    function returnToMainPage() {
        setCurrent({page: 'trips'})
    }

    switch (current.page) {
        case 'trips':
            return (
                <Trips
                    setSelectedTrip={trip => setCurrent({page: 'application', trip: trip})}
                    userInfo={userInfo}
                    setSelectedSettlement={trip => setCurrent({page: 'settlement', trip: trip})}
                    setSelectedSchedule={trip => setCurrent({page: 'schedule', trip: trip})}
                />
            )
        case 'application':
            return (
                <TripApplication
                    trip={current.trip}
                    userInfo={userInfo}
                    back={returnToMainPage}
                />
            )
        case 'settlement':
            return (
                <TripSettlement
                    trip={current.trip}
                    userInfo={userInfo}
                    back={returnToMainPage}
                />
            )
        case 'schedule':
            return (
                <TripSchedule
                    trip={current.trip}
                    userInfo={userInfo}
                    back={returnToMainPage}
                />
            )
    }
}

async function getFilteredTrips(filterDate) {
    await delay(1000)

    const response = await fetch('/api/trips', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    let json = await response.json();
    return json.filter(trip => {
        if (filterDate == null) {
            return true
        }

        return filterDate.startOf('month') <= dayjs(trip.startDate) && dayjs(trip.startDate) <= filterDate.endOf('month')
    })
}


const dateTripsViewFormat = 'MM/YYYY'

function Trips({setSelectedTrip, userInfo, setSelectedSettlement, setSelectedSchedule}) {
    const [trips, setTrips] = useState(null)
    const [filterDate, setFilterDate] = useState(dayjs())

    useEffect(() => {
        if (filterDate == null || filterDate.isValid()) {
            getFilteredTrips(filterDate).then(trips => setTrips(trips))
        }
    }, [filterDate])

    if (trips == null) {
        return <CircularProgress/>
    }

    async function addTrip(title, description, startDate, endDate) {
        const response = await fetch('/api/trips', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                startDate: startDate,
                endDate: endDate,
                mainOrganizerID: userInfo.id
            }),
        })

        const json = await response.json()

        setTrips(prev => [
            ...prev, {
                id: json.id,
                title: json.title,
                startDate: json.startDate,
                endDate: json.endDate,
                mainOrganizerID: userInfo.id
            }
        ])
    }

    async function deleteTrip(tripToRemoveId) {
        const response = await fetch('/api/trips/' + tripToRemoveId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        await response.json()

        setTrips(prev => prev.filter(trip => trip.id !== tripToRemoveId))

    }

    return (
        <div>
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                paddingX: 2,
                alignItems: 'center'
            }}>
                <Typography variant="h5">List of trips</Typography>
                <DesktopDatePicker
                    views={['year', 'month']}
                    label="Trips year and month"
                    inputFormat={dateTripsViewFormat}
                    value={filterDate}
                    onChange={(date) => {
                        setFilterDate(date)
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Box>

            <Box direction="row" sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                boxShadow: 2,
                backgroundColor: '#f7f7f7',
                border: 1,
                borderRadius: 3,
                marginY: 3,
                paddingY: 2
            }}
            >
                {trips.map(trip => {

                    const dateString = `${trip.startDate} - ${trip.endDate}`
                    return (
                        <Card
                            sx={{maxWidth: 475, margin: 1, boxShadow: 1, border: 1, borderColor: '#dbdbdb'}}
                        >
                            <CardHeader
                                avatar={trip.mainOrganizerID === userInfo.id ? (
                                        <Avatar sx={{bgcolor: '#fc4903'}} aria-label="user-role">
                                            Org
                                        </Avatar>
                                    )
                                    : (
                                        <Avatar sx={{bgcolor: '#43bf00'}} aria-label="user-role">
                                            Prt
                                        </Avatar>
                                    )
                                }
                                title={trip.title}
                                titleTypographyProps={{variant: 'h6'}}
                                subheader={dateString}
                                action={
                                    <>
                                        {trip.mainOrganizerID === userInfo.id && (
                                            <Button
                                                size="small"
                                                startIcon={<DeleteIcon/>}
                                                onClick={() => deleteTrip(trip.id)}
                                            />
                                        )}

                                    </>
                                }
                            />
                            <CardContent>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        display: '-webkit-box',
                                        overflow: 'hidden',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 3,
                                    }}
                                >
                                    {lorem}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Stack direction="row" spacing={2}>
                                    <Link
                                        component="button"
                                        variant="body2"
                                        onClick={() => setSelectedSettlement(trip)}
                                    >View settlement</Link>
                                    <Link
                                        component="button"
                                        variant="body2"
                                        onClick={() => setSelectedTrip(trip)}
                                    >View application</Link>
                                    <Link
                                        component="button"
                                        variant="body2"
                                        onClick={() => setSelectedSchedule(trip)}
                                    >View schedule</Link>
                                </Stack>
                            </CardActions>
                        </Card>
                    )
                })}
            </Box>

            {userInfo.right === 'organizer' && (
                <CreateTrip addTrip={addTrip}/>
            )}
        </div>
    )
}

const DATEPICKER_FORMAT = "DD/MM/YYYY"

function CreateTrip({addTrip}) {
    const [title, setTitle] = useState("")
    const [startDate, setStartDate] = useState(dayjs().add(1, 'week'))
    const [endDate, setEndDate] = useState(dayjs().add(2, 'week'))
    const [description, setDescription] = useState("")


    return (
        <div>
            <h2>Create trip</h2>
            <div>
                <Stack maxWidth={400} spacing={2}>
                    <TextField
                        label="Title"
                        variant="outlined"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                    />
                    <DesktopDatePicker
                        label="Start date"
                        inputFormat={DATEPICKER_FORMAT}
                        value={startDate}
                        onChange={(date) => {
                            setStartDate(date)
                        }}
                        renderInput={({error, helperText, ...restParams}) => (
                            <TextField
                                error={startDate == null ? true : error}
                                helperText={startDate == null ? 'Can\'t be empty' : helperText}
                                {...restParams}
                            />
                        )}
                    />
                    <DesktopDatePicker
                        label="End date"
                        inputFormat={DATEPICKER_FORMAT}
                        value={endDate}
                        onChange={(date) => {
                            setEndDate(date)
                        }}
                        renderInput={({error, helperText, ...restParams}) => (
                            <TextField
                                error={startDate == null ? true : error}
                                helperText={startDate == null ? 'Can\'t be empty' : helperText}
                                {...restParams}
                            />
                        )}
                    />
                    <TextareaAutosize
                        minRows={3}
                        placeholder="Trip description"
                        onChange={e => setDescription(e.currentTarget.value)}
                    />
                    <Button
                        variant="outlined"
                        disabled={startDate == null || endDate == null}
                        onClick={() => {
                            addTrip(title, description, startDate.format(API_FORMAT), endDate.format(API_FORMAT));
                        }}
                    >
                        Add trip
                    </Button>
                </Stack>
            </div>
        </div>
    )
}

const API_FORMAT = 'YYYY/MM/DD';

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in congue lectus. Suspendisse eget congue nulla. Pellentesque non nisl lorem. Cras porta lectus vitae dolor tincidunt, et convallis augue rhoncus. Nulla at sagittis lacus, vitae imperdiet eros. Morbi tincidunt ullamcorper justo, sed facilisis metus posuere eu. Quisque fringilla, augue a hendrerit tristique, sapien augue ornare felis, ut varius lacus elit a enim. Quisque id enim a velit laoreet condimentum vel vel velit. Phasellus nunc elit, commodo quis urna eu, convallis maximus ante.\n' +
    '\n' +
    'In feugiat felis eget ipsum laoreet, ut interdum quam tempor. Nullam porttitor pellentesque mi vitae lacinia. Maecenas aliquet augue vitae felis efficitur facilisis. Ut mollis laoreet metus quis lacinia. Curabitur id lacinia lorem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi suscipit varius mauris ut pulvinar. Nullam congue, augue nec mattis sodales, magna velit hendrerit mauris, ac ornare magna tellus eu ipsum.'

