import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from "@mui/x-date-pickers";

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <React.StrictMode>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <App/>
        </LocalizationProvider>
    </React.StrictMode>,
);
