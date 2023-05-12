import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import './custom.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/en-gb';
import { UserProvider } from './components/Functions/UserProvider';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                <UserProvider>
                    <Routes>
                        {AppRoutes.map((route, index) => {
                            const { element, ...rest } = route;
                            return <Route key={index} {...rest} element={element} />;
                        })}
                    </Routes>
                </UserProvider>
            </LocalizationProvider>
        );
    }
}
