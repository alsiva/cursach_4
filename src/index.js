import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from "@mui/x-date-pickers";

ReactDOM.render(
    <React.StrictMode>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <App/>
        </LocalizationProvider>
    </React.StrictMode>,
    document.getElementById('root')
);