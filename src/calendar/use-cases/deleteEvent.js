import {onDeleteEvent} from '../framework/actions'

export const DeleteCalendarEvent = (dispatch) => async(
    calendarId, eventId
) => {
    const event = {id: eventId, calendarId: calendarId}

    const response = await fetch(`http://localhost:8000/calendar/${event.calendarId}/events/${event.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    let calendarEvents = await response.json()
    let adjustedEvents = []
    calendarEvents.forEach((item) => {
        let fixed = {
            id: item.id,
            title: item.title,
            description: item.description,
            start: new Date(item.start),
            end: new Date(item.end),
            createdAt: item.createdAt,
            updatedAt: item.updatedAt, 
        }
        adjustedEvents.push(fixed)
    })
    console.log(adjustedEvents)
    
    return dispatch(onDeleteEvent(adjustedEvents))
}

export default DeleteCalendarEvent