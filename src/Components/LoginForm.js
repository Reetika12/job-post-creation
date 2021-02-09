import React, { Component } from 'react'
import '../Styles/NewJobForm.css'
import Button from '@material-ui/core/Button';

class LoginForm extends Component {
    constructor(props)
    {
        super(props);
        
        this.state={
            companyName:"",
            position:"",
            Description:""
        }
    }

    render() {
        return (
             <div>
                 <div className="loginStyle">Login Page</div>
                 <form style={{display:"flex",flexDirection:'column',alignItems: 'center'}}>
                        <input style={{width: '400px', height: '40px',marginBottom: '20px'}}type="text" placeholder="Enter Your Email"/>
                        <input style={{width: '400px', height: '40px',marginBottom: '20px'}}type="text" placeholder="Password"/>
                        <Button style={{color: '#ffffff',textTransform:'capitalize', marginBottom:'15px'}}className="createJobButtonStyle" onClick={this.formPostData}>Log In</Button>
                        <Button style={{color: '#ffffff',textTransform:'capitalize', marginBottom:'40px'}} className="createAccountStyle" href={`/Registarion`} >Create New Account</Button>

                 </form>
             </div>
        )
    }
}


export default LoginForm
