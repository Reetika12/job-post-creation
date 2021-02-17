import React, { Component } from 'react'
import '../Styles/NewJobForm.css'
import Button from '@material-ui/core/Button';
import { Creators as PostUserDetailsCreators } from '../Redux/postUserRedux'
import compose from 'recompose/compose'
import { connect } from 'react-redux'

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
        let{fullnameText,email,password} = this.state
        let params = {
            full_name: fullnameText,
            email: email,
            password: password
        }
        this.props.postDocument(params)
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
const mapStateToProps = (state) => ({
    postUser: state.postUserDetail
})
const mapDispatchToProps = (dispatch) => ({
    postDocument: (p) => dispatch(PostUserDetailsCreators.request(p)),
})

export default compose(connect(mapStateToProps, mapDispatchToProps))(RegistrationForm)

