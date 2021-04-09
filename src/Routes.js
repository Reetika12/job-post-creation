import React from "react"
// import {render} from "react-dom"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router'
import RegistrationForm from './Components/RegistrationForm'
import NewJobForm from './Components/NewJobForm'
import Joblist from './Components/jobList'
import ParentFile from './Components/ParentFile'
import AsyncAwait from './Container/AsynAwait'

const MainRouter = () => (
  <Router>
        <Switch>
           <Route exact path="/"  component={ParentFile}/>
           <Route exact path="/createJob"  component={NewJobForm}/>
           <Route exact path="/registarion" component={RegistrationForm}/>
           <Route exact path="/joblist" component={Joblist} />
          <Route exact path="/async" component={AsyncAwait} />
        </Switch>
    </Router>

)
export default withRouter(MainRouter)
