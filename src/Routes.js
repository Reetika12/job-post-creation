import React from "react"
// import {render} from "react-dom"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router'
import RegistrationForm from './Components/RegistrationForm'
import NewJobForm from './Components/NewJobForm'


const MainRouter = () => (
  <Router>
        <Switch>
          <Route path="/CreateJob" exact component={NewJobForm}/>
           <Route path="/Registarion" exact component={RegistrationForm}/>
        </Switch>
    </Router>

)
export default withRouter(MainRouter)
