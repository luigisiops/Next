import {onGetEvents} from '../framework/actions'

export const GetCalendarEvents = (dispatch) => async(
    events
) => {
    const calendarId = {id: 'calendar'}
    console.log('djfhkaf')
    console.log(calendarId)

    const response = await fetch(`https://localhost:8000/${calendarId.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    let calendarEvents = await response.json()
    
    return dispatch(onGetEvents(calendarEvents))
}

export default GetCalendarEvents