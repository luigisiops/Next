import { createReducer } from "@reduxjs/toolkit"

import {
    onGetEvents,
    onAddEvent,
    onDeleteEvent,
    onUpdateEvent
} from "./actions"


export const events = createReducer(

    {
        events: []
    },

    {
        [onGetEvents.type]: (state, {payload: events}) => {

            if (events === null){
                return state
            }

            state.events = events
        },

        [onAddEvent.type]: (state, {payload: event}) => {
            if (events === null){
                return state
            }
            state.events = [...state.events, event]
        },

        [onDeleteEvent.type]: (state, {payload: events}) => {
            if (events === null){
                return state
            }
            state.events = events
        },

        [onUpdateEvent.type]: (state, {payload: event}) => {

        },

    }
)