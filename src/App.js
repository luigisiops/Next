import './App.css';
import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import Timer from 'react-compound-timer'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import myEventsList from './eventsList'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import 'react-big-calendar/lib/css/react-big-calendar.css';


const Modal = () => {
  console.log('jdkfjsakfdahsjk')
  return (
    <div>Hello deez nuts</div>
  )
}

const App = () => {
  const localizer = momentLocalizer(moment)
  const [events, setEvents] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [select, setSelect] = useState(true)
  const [newEvent, setNewEvent] = useState(false)
  const [fields, setFields] = useState({})

  const setField = (evt) => {
    setFields({
      ...fields, 
      [evt.target.name] : evt.target.value
    })
  }

  const setEvent = (event) => {
    setEvents([
      ...events, event
    ])
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
    setNewEvent(true)
  }

  return (
    <div className="App">
      <div>
        <div>
          <Timer
            initialTime={1800000}
            direction="backward"
          >
            <Timer.Days /> days
            <Timer.Hours /> hours
            <Timer.Minutes /> minutes
            <Timer.Seconds /> seconds
          </Timer>
        </div>
        <div>
          
        </div>
        <Calendar
          className = "calendar"
          selectable={select}
          defaultView = {'week'}
          localizer={localizer}
          events={events}
          style={{ height: 700 }}
          step={60}
          onSelectEvent={event => { DisplayEvent(event) }}
          onSelectSlot={handleSelect}
        />
      </div>

      {newEvent === true ? (
        <div className="modal">
          <div className="input-content">
          

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
              <button onClick = {handleAddEvent}>Add To Calendar</button>



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
        <i className="far fa-times-circle"></i>
          <div className="content">
          
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
