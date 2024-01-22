import {configureStore} from '@reduxjs/toolkit'
import { alertSlice } from './feature/alterSlice'

const store = configureStore({
    reducer:{
        alert: alertSlice.reducer
    }
});

export default store;
