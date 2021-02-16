import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import '../Styles/NewJobForm.css'
import axios from 'axios';

 class NewJobForm extends Component {
     constructor(props)
     {
         super(props);
         this.state={
             companyName:"",
             position:"",
             Description:"",
             response:{}
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
     componentDidUpdate (prevprops,prevstate){
        console.log("previousstate",prevstate)
        console.log("this state",this.state.response)
     }
    formPostData = () =>{
        let {companyName,position,Description} = this.state
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
          };
          const body = { company: companyName,
                    position: position,
                    description: Description 
                };
       let response = axios.post(`http://localhost:3000/api/v1/jobs`, body, axiosConfig)
       let responseData=response.then((resp) => console.log(resp))
       console.log("responsedata",responseData)
        // .then(res => console.log("res",res))
        // .catch(err => console.log('Login: ', err));
        // const qs = require('qs');
        // let {companyName,position,Description} = this.state
        // let payload=qs.stringify(
        //     {
        //       job:{
        //         company: companyName,
        //         position: position,
        //         description: Description
        //        }
        //     }
        //     )
        //     const requestOptions = {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body:payload
        //     };
        //     let result=axios.post('http://localhost:3000/api/v1/users', payload).then(response => console.log("response+++",response))
                // .then(data => this.setState({ postId: data.id }));
        //  let result = fetch.post('http://localhost:3000/api/v1/jobs', payload).then(res=>(this.setState({
        //     response:res.data })))
        //     .catch( error => console.log(error))
            this.setState({
                companyName:"",
                position:"",
                Description:""
            })
            // console.log("result++",result)
            window.location.reload()
     }


    render() {
        console.log("response++",this.state.response)
        return (
            <div>
                <form style={{display:'flex',}}>
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
