import React, { Component } from 'react'
import '../Styles/NewJobForm.css'
import LoginForm from './LoginForm'
import AddRemoveCard from './AddRemoveCardOnClick'
import RegistrationForm from './RegistrationForm'
class ParentFile extends Component {
    render() {
        return (
            <div>
                {/* <AddRemoveCard/> */}
                {/* <LoginForm/> */}
                <RegistrationForm/>
            </div>
        )
    }
}

export default ParentFile
