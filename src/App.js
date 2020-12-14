import './App.css';
import React from "react"

import {
  // Redirect,
  Route,
  Switch,
} from "react-router-dom"

import MainPage from "./calendar/ui/calendar"

const App = () => {
  
  return(
         <Switch>
          <Route exact path = "/" component = {MainPage}/>
        </Switch>
  );
}

export default App;