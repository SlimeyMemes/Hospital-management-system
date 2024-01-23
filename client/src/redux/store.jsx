import {configureStore} from '@reduxjs/toolkit'
import { alertSlice } from './feature/alertSlice';

const store = configureStore({
    reducer:{
        alerts: alertSlice.reducer
    }
});

export default store;
