import React from "react"
import RegistrationForm from './Components/RegistrationForm'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import LoginForm from './Components/LoginForm'
class App extends React.Component {

  render()
  {
    return (
      <Router>
        <div className="App">
        <LoginForm/>
        <Route path="/Registarion" component={RegistrationForm}/>
       </div>
      </Router>
      
    );
  }
}

export default App;
