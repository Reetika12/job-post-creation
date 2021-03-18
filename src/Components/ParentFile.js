import React, { Component } from 'react'
import '../Styles/NewJobForm.css'
import LoginForm from './LoginForm'

class ParentFile extends Component {
    render() {
        return (
            <div>
                <LoginForm/>
            </div>
        )
    }
}

export default ParentFile
