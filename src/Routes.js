import React from "react"
// import {render} from "react-dom"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router'
import RegistrationForm from './Components/RegistrationForm'
import NewJobForm from './Components/NewJobForm'
import Joblist from './Components/jobList'


const MainRouter = () => (
  <Router>
        <Switch>
           <Route path="/createJob" exact component={NewJobForm}/>
           <Route path="/registarion" exact component={RegistrationForm}/>
           <Route path="/joblist" exact component={Joblist} />
        </Switch>
    </Router>

)
export default withRouter(MainRouter)
