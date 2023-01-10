import React, {useState} from 'react';
import {
    Box,
    Button,
    Stack,
    TextField
} from "@mui/material";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import TextareaAutosize from '@mui/base/TextareaAutosize';


export default function CreateTrip({addTrip, back}) {
    const [title, setTitle] = useState("")
    const [startDate, setStartDate] = useState(dayjs().add(1, 'week'))
    const [endDate, setEndDate] = useState(dayjs().add(2, 'week'))
    const [description, setDescription] = useState("")
    const DATEPICKER_FORMAT = "DD/MM/YYYY"
    const API_FORMAT = 'YYYY/MM/DD';

    return (
        <Box sx={{

            margin: 'auto',
            marginX: 10,
            border: 1,
            borderRadius: 5,
            borderColor: '#ffffff',

            boxShadow: 'inset 0px 0px 5px 0px rgba(0,0,0,0.2)',
            backgroundColor: '#f7f7f7',
            padding: 5
        }}>
            <h2>Create trip</h2>
            <div>
                <Stack spacing={2}>
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
                    <Button onClick={back}>back to trip list</Button>
                </Stack>
            </div>
        </Box>
    )
}