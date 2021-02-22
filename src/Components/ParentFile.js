import React, { Component } from 'react'
import '../Styles/NewJobForm.css'
import LoginForm from './LoginForm'

class ParentFile extends Component {
    render() {
        return (
            <div>
                <div className="PortalTextStyle">Welcome To Job Portal</div>
                <LoginForm/>
            </div>
        )
    }
}

export default ParentFile
