import React, { Component } from 'react'
import '../Styles/NewJobForm.css'
import LoginForm from './LoginForm'
import AddRemoveCard from './AddRemoveCardOnClick'

class ParentFile extends Component {
    render() {
        return (
            <div>
                <AddRemoveCard/>
                {/* <LoginForm/> */}
            </div>
        )
    }
}

export default ParentFile
