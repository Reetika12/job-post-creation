import React, { Component } from 'react'
import '../Styles/NewJobForm.css'
import Button from '@material-ui/core/Button';

class RegistrationForm extends Component {

    render() {
        return (
            <div style={{display:"flex",flexDirection:'column',alignItems: 'center'}}>
                <input style={{width: '400px', height: '40px',marginBottom: '20px'}}type="text" placeholder="Enter Your Fullname"/>
                <input style={{width: '400px', height: '40px',marginBottom: '20px'}}type="text" placeholder="Enter Your Email"/>
                <input style={{width: '400px', height: '40px',marginBottom: '20px'}}type="text" placeholder="Enter Your Password"/>   
                <Button style={{color: '#ffffff',textTransform:'capitalize', marginBottom:'40px'}} className="createAccountStyle" >Register Now</Button>
            </div>
        )
    }
}

export default RegistrationForm
