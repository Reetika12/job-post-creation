import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import '../Styles/NewJobForm.css'
import axios from 'axios';
import LoginForm from './LoginForm'

 class NewJobForm extends Component {
     constructor(props)
     {
         super(props);
         this.state={
             companyName:"",
             position:"",
             Description:""
         }
     }
     handleInputCompanyName = (event) => {
        this.setState({
            companyName:event.target.value
        })
     }
     handleInputPosition = (event) => {
        this.setState({
            position:event.target.value
        })
     }
     handleInputDescription = (event) => {
        this.setState({
            Description:event.target.value
        })
     }
     formPostData = () =>{
        const qs = require('qs');
        let {companyName,position,Description} = this.state
        axios.post('/api/v1/jobs', qs.stringify(
            {
              job:{
                company: companyName,
                position: position,
                description: Description}
            }))
            .then(res=>( console.log(res)))
            .catch( error => console.log(error))
            this.setState({
                companyName:"",
                position:"",
                Description:""
            })
            window.location.reload()

     }


    render() {
        return (
            <div>
                <LoginForm/>
                <form>
                    <input type="text" value={this.state.companyName} onChange={this.handleInputCompanyName} label="Position" placeholder="company name" />
                    <input type="text" value={this.state.position} onChange={this.handleInputPosition} label="Position" placeholder="position" />
                    <input type="text" value={this.state.Description} onChange={this.handleInputDescription} label="Description" placeholder="Description"/>
                </form>
                <Button style={{color: '#ffffff',textTransform:'capitalize',marginTop:'10px'}}className="createJobButtonStyle" onClick={this.formPostData}>Create Job</Button>
            </div>
        )
    }
}

export default NewJobForm
