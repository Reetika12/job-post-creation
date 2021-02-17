// import React, {useState,useEffect} from 'react';
import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import axios from 'axios';
import '../Styles/NewJobForm.css'
import Table from './tableComponent'

class JobList extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            companyName:"",
            position:"",
            Description:"",
            jobs:[],
            json:[
                { key: 'id', label: 'ID', columnWidth: '50px'},
                { key: 'company', label: 'Company',columnWidth: '100px'},
                { key: 'description', label: 'Description',columnWidth: '200px'},
                { key: 'created_at', label: 'Created At',columnWidth: '70px'},
                { key: 'updated_at', label: 'Updated At',columnWidth: '70px'},
                { renderRow: (row) => <Button variant="contained" className="indexTableButtonStyle" onClick={this.handleEditEvent.bind(this, row)} >Edit</Button>, columnWidth: '70px'},
                { renderRow: (row) => <Button variant="contained" onClick={this.handleEditEvent.bind(this, row)} >Delete</Button>, columnWidth: '70px'},
            ]
        }
    }
  
    componentDidMount(){
        axios.get('http://localhost:3000/api/v1/jobs').then(res => this.setState({
            jobs:res
        }))
    }
    handleEditEvent = () =>{
        console.log("kjchgvfc")
    }
    render()
    {
        let {jobs} = this.state
        let jobData=jobs.data || []
        console.log("jobs+++",jobData)
        return(
            <div>
                <h2>Job List</h2>
                <div className="jobs-list">
                    <Table json={this.state.json} data={jobData}/>
                </div>
            </div>
        );
    }
   
}
export default JobList;