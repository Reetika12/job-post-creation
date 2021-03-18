import React, { Component } from 'react'
import '../Styles/NewJobForm.css'
import Button from '@material-ui/core/Button';
import PasswordShowHide from "./PasswordShowHide"
import { Creators as PostLoginDetailsCreators } from '../Redux/postLoginDetailsRedux'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import _get from 'lodash/get'
import ToastMessage from './ToastMessage'
import imgsrc from '../Images/downloadLockIcon.png'
import usersrc from '../Images/userName.png'

// import { Images } from '../Themes'

class LoginForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            email: "",
            Password: "",
            defaultHide: true,
            toastMessage: "",
            disableJobButton: true
        }
    }
    ChangeEvent = () => {
        this.setState({
            defaultHide: !this.state.defaultHide
        })
    }
    formPostData = () => {
        let { email, Password } = this.state
        let params = {
            email,
            password: Password
        }
        this.props.postLoginDetails(params)
    }
    setToastMessage = (message) => {
        this.setState({ toastMessage: message })
    }
    componentDidUpdate(prevProps) {
        if (prevProps.postLoginData.fetching && !this.props.postLoginData.fetching) {
            if (!this.props.postLoginData.error) {
                this.setToastMessage("logged in Successfully!");
                this.setState({
                    fullnameText: "",
                    email: "",
                    password: "",
                    disableJobButton: false
                })
            } else {
                let errorMsg = _get(this.props, 'postLoginData.error.error.message') || "Failed to login, Please try again";
                this.setToastMessage(errorMsg);
            }
        }
    }
    emailChangeEvent = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    passwordChangeEvent = (event) => {
        this.setState({
            Password: event.target.value
        })
    }

    render() {
        let { defaultHide, disableJobButton } = this.state
        return (
            <div className="container">
                <div className="forms-container">
                    <div className="signin-signup">
                        <form action="" className="sign-in-form">
                            <h2 className="title">Sign in</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input type="text" onChange={this.emailChangeEvent} placeholder="email" />
                            </div>
                            <div className="input-field">
                                <img src={imgsrc} />
                                {/* <i className="fas fa-lock"></i> */}
                                <input type="password" onChange={this.passwordChangeEvent} placeholder="password" />
                            </div>
                            <input type="submit" value="Login" onClick={this.formPostData} className="btn solid" />
                            <p className="social-text">Or sign in with social platforms</p>
                            <div className="social-media">
                                <a className="social-icon">
                                    <i className="fab fa-facebook"></i>
                                </a>
                                <a className="social-icon">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a className="social-icon">
                                    <i className="fab fa-goggle"></i>
                                </a>
                                <a className="social-icon">
                                    <i className="fab fa-linked-in"></i>
                                </a>
                            </div>
                        </form>
                        <form action="" className="sign-up-form">
                            <h2 className="title">Sign up</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input type="text" onChange={this.emailChangeEvent} placeholder="Username" />
                            </div>
                            <div className="input-field">
                                {/* <img src={imgsrc} /> */}
                                <i className="fas fa-envelope"></i>
                                <input type="password" onChange={this.passwordChangeEvent} placeholder="Email" />
                            </div>
                            <input type="submit" value="Sign Up" onClick={this.formPostData} className="btn solid" />
                            <p className="social-text">Or sign up with social platforms</p>
                            <div className="social-media">
                                <a className="social-icon">
                                    <i className="fab fa-facebook"></i>
                                </a>
                                <a className="social-icon">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a className="social-icon">
                                    <i className="fab fa-goggle"></i>
                                </a>
                                <a className="social-icon">
                                    <i className="fab fa-linked-in"></i>
                                </a>
                            </div>
                        </form>
                    </div>
                </div>

                {/* <div className="loginStyle">Login Page</div>
                 <div className="NewJobForm">
                    <input className="enterEmailStyle" type="text" onChange={this.emailChangeEvent} id ="email" placeholder="Enter Your Email"/>
                    <div style={{marginLeft: '60px'}}>
                        <input className="enterEmailStyle" type="text" onChange={this.passwordChangeEvent} placeholder="Password"/>
                        <Button onClick={this.ChangeEvent.bind(this)}>{defaultHide?"Show":"Hide"}</Button>
                    </div>
                    <div className="logInStyle">
                      <Button className="createJobButtonStyle" color="inherit" onClick={this.formPostData}>Log In</Button>
                    </div>
                    <div className="createJobstyle">
                      <Button color="inherit" className="createAccountStyle" href={`/Registarion`} >Create New Account</Button>                  
                    </div>
                 </div>
                 <Button disabled={disableJobButton} style={{display:'flex',justifyContent: 'center',color: 'blue',cursor: 'pointer'}} href={`/joblist`} >
                    Go To job page
                </Button>
                 {this.state.toastMessage && <ToastMessage
                         horizontal="right"
                         message ={this.state.toastMessage}
                         open={true}
                         handleClose ={()=>this.setToastMessage("")}
                 />} */}
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    postLoginData: state.postLoginDetail
})
const mapDispatchToProps = (dispatch) => ({
    postLoginDetails: (p) => dispatch(PostLoginDetailsCreators.request(p)),
})

export default compose(connect(mapStateToProps, mapDispatchToProps))(LoginForm)


