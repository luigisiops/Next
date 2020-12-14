import './App.css';
import React, { useState, useEffect, useRef } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import Timer from 'react-compound-timer'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import myEventsList from './eventsList'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import 'react-big-calendar/lib/css/react-big-calendar.css';

import io from "socket.io-client"

const App = () => {
  const localizer = momentLocalizer(moment)
  const [events, setEvents] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [select, setSelect] = useState(true)
  const [newEvent, setNewEvent] = useState(false)
  const [fields, setFields] = useState({})

  const [yourId, setYourId] = useState();
  const [messages, setMessages] = useState([])
  const [messageBody, setMessageBody] = useState("")

  const socket = io.connect('http://localhost:8000')
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

  const DisplayEvent = (event) => {
    setSelect(false)
    setShowModal(true)
    console.log(showModal)
  }

  const handleSelect = ({ fields, start, end }) => {
    setNewEvent(true)
    setFields({
      ...fields,
      "start": start,
      "end": end
    })
  }

  const handleAddEvent = () => {
    setEvents([
      ...events,
      fields
    ])
    setNewEvent(false)

  }

  return (
    <div className="App">
      <div>
        <div className = "timer-container">
          <Timer
            initialTime={1800000}
            direction="backward"
          >
            <Timer.Hours />:Hrs 
            <Timer.Minutes />:Mins
            <Timer.Seconds />:Secs
          </Timer>
        </div>

        <div className = "content-container">

        <div className = "sidebar">

        </div>

        <Calendar
          className="calendar"
          selectable={select}
          defaultView={'week'}
          localizer={localizer}
          events={events}
          style={{ height: `94vh` }}
          step={60}
          onSelectEvent={event => { DisplayEvent(event) }}
          onSelectSlot={handleSelect}
        />

        <div className = "chatroom-container">
          <div className = "room-title"> BIOCHEM STUDY GROUP</div>
          <div className = "chatlogs"></div>
          <div className = "message-container">
            <input className = "message-body"></input>
            <div className = "button-container">
              <button className = "button-all" >Send</button>
            </div>
          </div>
        </div>

        </div>
        
        
      </div>

      {newEvent === true ? (
        <div className="modal">
          <div className="input-content">
            <button onClick={() => { setNewEvent(false) }}>Close</button>

            <h2>Event Window</h2>

            <label>Title:</label>
            <input
              className="form-input mt-1 block w-full"
              name="title"
              type="text"
              value={fields.title}
              onChange={setField}>
            </input>

            <label>Description: </label>
            <textarea name="description"
              type="text"
              rows="5" cols="50"
              value={fields.description}
              onChange={setField}>
            </textarea>

            <input
              name="title"
              type="checkbox"
              value={fields.title}
              onChange={setField}>
            </input>
            <button onClick={handleAddEvent}>Add To Calendar</button>

          </div>
          <div className="actions">
            <button className="toggle-button">OK</button>
          </div>
        </div>
      ) : (
          <div></div>
        )}

      {showModal === true ? (
        <div className="modal">
          <div className="content">
            <button onClick={() => { setShowModal(false) }}>Close</button>

            <h2>Modal Window</h2>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis deserunt corrupti, ut fugit magni qui quasi nisi amet repellendus non fuga omnis a sed impedit explicabo accusantium nihil doloremque consequuntur.
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


export default App;
