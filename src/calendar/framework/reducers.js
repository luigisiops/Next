import { createReducer } from "@reduxjs/toolkit"

import {
    onGetEvents
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
        }

    }
)