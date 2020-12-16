import {onGetEvents} from '../framework/actions'

export const GetCalendarEvents = (dispatch) => async(
    calendarId
) => {
    const calendar = {id: calendarId}
    console.log('djfhkaf')
    console.log(calendarId)

    const response = await fetch(`https://guarded-ridge-20087.herokuapp.com/calendar/${calendar.id}/events`, {
        method: 'GET',
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
    
    return dispatch(onGetEvents(adjustedEvents))
}

export default GetCalendarEvents