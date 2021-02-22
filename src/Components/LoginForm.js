import React, { Component } from 'react'
import '../Styles/NewJobForm.css'
import Button from '@material-ui/core/Button';
import PasswordShowHide from "./PasswordShowHide"

class LoginForm extends Component {
    constructor(props)
    {
        super(props);
        
        this.state={
            companyName:"",
            position:"",
            Description:"",
            defaultHide:true
        }
    }
    ChangeEvent = () => {
        this.setState({
            defaultHide:!this.state.defaultHide
        })
    }
    render() {
        let {defaultHide} = this.state
        return (
             <div>
                 <div className="loginStyle">Login Page</div>
                 <div className="NewJobForm">
                    <input className="enterEmailStyle" type="text" placeholder="Enter Your Email"/>
                    <div style={{marginLeft: '60px'}}>
                        <input className="enterEmailStyle" type="text" placeholder="Password"/>
                        <Button onClick={this.ChangeEvent.bind(this)}>{defaultHide?"Show":"Hide"}</Button>
                    </div>
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
