import { configureStore } from '@reduxjs/toolkit'
import {
    events
} from '../../calendar/framework/reducers'

const reducers = {
    events
}

const store = configureStore({
    reducer: reducers,
})

export default store