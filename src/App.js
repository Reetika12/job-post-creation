import React from "react"
import RegistrationForm from './Components/RegistrationForm'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
// import './App.css';
// import JobList from './Components/jobList'
import NewJobForm from './Components/NewJobForm'
class App extends React.Component {

  render()
  {
    return (
      <Router>
        <div className="App">
        <NewJobForm/>
        <Route path="/Registarion" component={RegistrationForm}/>
       </div>
      </Router>
      
    );
  }
}

export default App;
