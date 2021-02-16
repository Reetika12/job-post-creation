import React, { Component } from 'react'
import '../Styles/NewJobForm.css'
import Button from '@material-ui/core/Button';
import axios from 'axios';

class RegistrationForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
          dialogCourse: false,
          fullnameText:"",
          email:"",
          password:"",
          netValue:[]
        }
    }
    handleRegisteredForm = () =>{
        const qs = require('qs');
        let{fullnameText,email,password} = this.state
        console.log("value++",fullnameText)
       try{
        var result= axios.post('http://localhost:3000/api/v1/users', qs.stringify(
            {
                user:{
                full_name: fullnameText,
                email: email,
                password: password}
            }))
        }
        catch(error)
        {
            console.log(error)
        }
        // catch( error(){
        //     console.log(error)
        // } )
            this.setState({
                fullnameText:"",
                email:"",
                password:""
            })
            console.log("result",result)
            // window.location.reload()
    }
    handleChangeName = (event) =>{
        this.setState({
            fullnameText:event.target.value
        })
    }
    handleChangeEmail = (event) =>{
        this.setState({
            email:event.target.value
        })
    }
    handleChangePassword = (event) =>{
        this.setState({
            password:event.target.value
        })
    }
    render() {
        let{fullnameText,email,password} = this.state
        return (
            <div style={{display:"flex",flexDirection:'column',alignItems: 'center'}}>
                <input style={{width: '400px', height: '40px',marginBottom: '20px'}}type="text" value={fullnameText} onChange={this.handleChangeName} placeholder="Enter Your Fullname"/>
                <input style={{width: '400px', height: '40px',marginBottom: '20px'}}type="text" value={email} onChange={this.handleChangeEmail} placeholder="Enter Your Email"/>
                <input style={{width: '400px', height: '40px',marginBottom: '20px'}}type="text" value={password} onChange={this.handleChangePassword} placeholder="Enter Your Password"/>   
                <Button style={{color: '#ffffff',textTransform:'capitalize', marginBottom:'40px'}} className="createAccountStyle" onClick={this.handleRegisteredForm} >Register Now</Button>
            </div>
        )
    }
}

export default RegistrationForm
