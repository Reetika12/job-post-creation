import React, { Component } from 'react'
import '../Styles/NewJobForm.css'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

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
                 <div className="NewJobForm">
                    <input className="enterEmailStyle" type="text" placeholder="Enter Your Email"/>
                    <input className="enterEmailStyle" type="text" placeholder="Password"/>
                    <div className="logInStyle">
                      <Button className="createJobButtonStyle" color="inherit" onClick={this.formPostData}>Log In</Button>
                    </div>
                    <div className="createJobstyle">
                      <Button color="inherit" className="createAccountStyle" href={`/Registarion`} >Create New Account</Button>                  
                    </div>
                 </div>
             </div>
        )
    }
}


export default LoginForm
