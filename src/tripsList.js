import React, {useEffect, useState} from 'react';
import {
    Avatar,
    Box,
    Button,
    CardActions,
    CardContent,
    CardHeader,
    LinearProgress,
    Link,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import TripApplication from "./tripApplication";
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import {delay} from "./utils";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import TripSettlement from "./tripSettlement";
import TripSchedule from "./TripsSchedule";
import Card from '@mui/material/Card';
import CreateTrip from "./createTrip";


export default function TripsList({userInfo, logout}) {
    return (
        <div>
            <Stack alignItems="center" direction="row" spacing={2}
                   sx={{
                       height: 100,
                       bgcolor: '#43bf00',
                       paddingX: 5,
                       marginBottom: 2
                   }}
            >
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
                    setCreateTrip={() => setCurrent({page: 'createTrip'})}
                />
            )
        case 'createTrip':
            return (
                <CreateTrip userInfo={userInfo} back={returnToMainPage}/>
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

function Trips({setSelectedTrip, userInfo, setSelectedSettlement, setSelectedSchedule, setCreateTrip}) {
    const [trips, setTrips] = useState([])
    const [filterDate, setFilterDate] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (filterDate == null || filterDate.isValid()) {
            setIsLoading(true)
            getFilteredTrips(filterDate)
                .then(trips => setTrips(trips))
                .finally(() => setIsLoading(false))
        }
    }, [filterDate])

    async function deleteTrip(tripToRemoveId) {
        const response = await fetch(`/api/trips?id=${tripToRemoveId}`, {
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
                marginBottom: 2,
                alignItems: 'center'
            }}>
                <Typography variant="h5">List of trips</Typography>
                {userInfo.right === 'organizer' && (
                    <Button size="small" onClick={() => setCreateTrip()}>
                        Create new trip
                    </Button>
                )}
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

            {isLoading && (
                <LinearProgress/>
            )}

            {trips.length > 0 && (
                <Box direction="row" sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    boxShadow: 'inset 0px 0px 5px 0px rgba(0,0,0,0.2)',
                    backgroundColor: '#f7f7f7',
                    marginBottom: 2,
                    paddingY: 2
                }}
                >
                    {trips.map(trip => {
                        const isMainOrg = trip.mainOrganizerID === userInfo.id

                        return (
                            <Card
                                key={trip.id}
                                sx={{margin: 1, boxShadow: 1, border: 1, borderColor: '#dbdbdb', flex: '1 1 400px'}}
                            >
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{bgcolor: isMainOrg ? '#fc4903' : '#43bf00'}}
                                                aria-label="user-role">
                                            {isMainOrg ? 'Org' : 'Prt'}
                                        </Avatar>
                                    }
                                    title={trip.name}
                                    titleTypographyProps={{variant: 'h6'}}
                                    subheader={`${trip.startDate} - ${trip.endDate}`}
                                    action={
                                        <>
                                            {isMainOrg && (
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
                                        {trip.description}
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
                        );
                    })}
                </Box>
            )}


        </div>
    )
}

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in congue lectus. Suspendisse eget congue nulla. Pellentesque non nisl lorem. Cras porta lectus vitae dolor tincidunt, et convallis augue rhoncus. Nulla at sagittis lacus, vitae imperdiet eros. Morbi tincidunt ullamcorper justo, sed facilisis metus posuere eu. Quisque fringilla, augue a hendrerit tristique, sapien augue ornare felis, ut varius lacus elit a enim. Quisque id enim a velit laoreet condimentum vel vel velit. Phasellus nunc elit, commodo quis urna eu, convallis maximus ante.\n' +
    '\n' +
    'In feugiat felis eget ipsum laoreet, ut interdum quam tempor. Nullam porttitor pellentesque mi vitae lacinia. Maecenas aliquet augue vitae felis efficitur facilisis. Ut mollis laoreet metus quis lacinia. Curabitur id lacinia lorem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi suscipit varius mauris ut pulvinar. Nullam congue, augue nec mattis sodales, magna velit hendrerit mauris, ac ornare magna tellus eu ipsum.'
