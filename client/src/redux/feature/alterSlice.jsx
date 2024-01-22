import {createSlice} from '@reduxjs/toolkit'

export const alertSlice = createSlice({
    name: 'alerts',
    initialState: {
        loading: false
    },
        reducers:{
            showloading: (state) => {state.loading = true},
            hideLoading: (state) => {state.loading = false}
        }
    })

    export const {showloading, hideLoading} = alertSlice.actions