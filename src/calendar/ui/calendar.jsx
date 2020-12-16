import './calendar.css';
import React, { useState, useEffect, useRef } from 'react'
import { connect } from "react-redux"
import { Calendar, momentLocalizer } from 'react-big-calendar'
import Timer from 'react-compound-timer'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//import myEventsList from './eventsList'
import 'react-big-calendar/lib/css/react-big-calendar.css';

import io from "socket.io-client"
import {GetCalendarEvents} from '../use-cases/getEvents'
import {AddCalendarEvent} from '../use-cases/addEvent'
import {DeleteCalendarEvent} from '../use-cases/deleteEvent'


export const MainPage = ({getCalendarEvents, addCalendarEvent, deleteCalendarEvent, event}) => {
  const localizer = momentLocalizer(moment)
  const [events, setEvents] = useState([])

  const [showModal, setShowModal] = useState(false)
  const [select, setSelect] = useState(true)
  const [newEvent, setNewEvent] = useState(false)
  const [fields, setFields] = useState({})
  const [modalContent, setModalContent] = useState({})
  const [timer, setTimer] = useState(false)

  const [yourId, setYourId] = useState();
  const [messages, setMessages] = useState([])
  const [messageBody, setMessageBody] = useState("")
  const calendarId = 2
  useEffect(() => {
    getCalendarEvents(calendarId)
  },[])

  //const socket = io.connect('http://localhost:8000')
  //const socketServer = "http://localhost:8000"
/*
  useEffect(() => {
    socketRef.current = socketIOClient(socketServer)

    socketRef.current.on("your Id", id => {
      setYourId(id)
    })

    socketRef.current.on("message", (message) => {
      receivedMessage(message)
    })

  }, [])

  const receivedMessage = (message) => {
    setMessages(oldMessages => [...oldMessages, message])
  }

  const sendMessage = (e) => {
    e.preventDefault()

    const messageObject = {
      body: messageBody,
      id: yourId
    }

  setMessageBody("")
  socketRef.current.emit("send message", messageObject)
  }

  */
  const setField = (evt) => {
    setFields({
      ...fields,
      [evt.target.name]: evt.target.value
    })
  }

  console.log(fields)
  console.log(event)

  const DisplayEvent = (event) => {
    setSelect(false)
    setShowModal(true)
    setModalContent({
        id: event.id,
        title: event.title,
        description: event.description
    })
    
  }

  const handleSelect = ({ fields, start, end }) => {
    setNewEvent(true)
    setFields({
      ...fields,
      "start": start,
      "end": end
    })
  }

  return (
    <div className="App">
      <div>
        <div className = "timer-container">
        <div>Study Timer</div>
          <Timer
            initialTime={3600000}
            direction="backward"
            startImmediately = {false}
          >

          {({ start, pause, reset, getTimerState, getTime }) => (
        <div>
            <div>
                <Timer.Hours /> hours {" "}
                <Timer.Minutes /> minutes{" "}
                <Timer.Seconds /> seconds
            </div>
            <br />
            <div>
                <button onClick={start}>Start</button>
                <button onClick={pause}>Pause</button>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    )}
</Timer>
        </div>

        <div className = "content-container">
        {(events.events === null) ? 
            <button type="button" class="bg-rose-600 ..." disabled>
            <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
            </svg>
            Processing
            </button>
            :
            <div className="calendar-members-container">
          <Calendar
            className="calendar"
            selectable={select}
            defaultView={'week'}
            localizer={localizer}
            events={event.events}
            step={60}
            onSelectEvent={event => {
                DisplayEvent(event) 
                console.log(event)
                
                }}
            onSelectSlot={handleSelect}
          />

          <div className = "members-container">
            <div className = "members"></div>
          </div>

        </div>
        
        } 


        <div className = "chatroom-container">
          <div className = "room-title"> BIOCHEM STUDY GROUP</div>
          <div className = "chatlogs"></div>
          <div className = "message-container">
            <input className = "message-body"></input>
            <div className = "button-container">
              <button className = "button-all">Send</button>
            </div>
          </div>
        </div>

        </div>
        
        
      </div>

      {newEvent === true ? (
        <div className="modal">
          <div className="input-content">
            <button className = "close-button"onClick={() => { setNewEvent(false) }}>Close</button>

            <h2>Event Window</h2>

            <label>Title:</label>
            <input
              className="form-inputs"
              name="title"
              type="text"
              value={fields.title}
              onChange={setField}>
            </input>

            <label>Description: </label>
            <textarea 
            className = "form-textbox"
            name="description"
              type="text"
              rows="5" cols="50"
              value={fields.description}
              onChange={setField}>
            </textarea>

            <button onClick={() => {
                {addCalendarEvent(fields)}
                setNewEvent(false)
                setFields({})
                }}>Add To Calendar</button>

          </div>
          <div className="actions">
          </div>
        </div>
      ) : (
          <div></div>
        )}

      {showModal === true ? (
        <div className="modal">
          <div className="content">
            <button onClick={() => {
                {setShowModal(false)}
                setSelect(true)
                }}>Close
            </button>
            <button onClick = {()=>{
                {deleteCalendarEvent(calendarId, modalContent.id)}
                setShowModal(false)
                setSelect(true)
                }}>X</button>

            <div className = "modal-title">{modalContent.title}</div>
            Description: {modalContent.description}
            </div>
          <div className="actions">
            <button className="toggle-button">OK</button>
          </div>
        </div>
      ) : (
          <div></div>
        )}
    </div>
  )
}

const mapStateToProps = (state, { }) => ({
    //user: state.user
    event: state.events
 })
 
 const mapDispatchToProps = (dispatch) => ({
    getCalendarEvents: GetCalendarEvents(dispatch),
    addCalendarEvent: AddCalendarEvent(dispatch),
    deleteCalendarEvent: DeleteCalendarEvent(dispatch)
 })
 
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
