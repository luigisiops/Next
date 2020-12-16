import {onAddEvent} from '../framework/actions'

export const AddCalendarEvent = (dispatch) => async(
    fields
) => {
    console.log(fields)
    //const calendarId = {id: calendar.id}
    console.log('djfhkaf')
    //console.log(calendarId)
    const event = {
        title: fields.title,
        description: fields.description,
        start: fields.start,
        end: fields.end,

    }

    const response = await fetch(`https://guarded-ridge-20087.herokuapp.com/calendar/2/events`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    })

    let calendarEvent = await response.json()
    let adjustedEvent = {
        id: calendarEvent.id,
        title: calendarEvent.title,
        description: calendarEvent.description,
        start: new Date(calendarEvent.start),
        end: new Date(calendarEvent.end),
        createdAt: calendarEvent.createdAt,
        updatedAt: calendarEvent.updatedAt, 
    }
    
    return dispatch(onAddEvent(adjustedEvent))
}

export default AddCalendarEvent