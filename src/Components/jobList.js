// import React, {useState,useEffect} from 'react';
import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import axios from 'axios';
import '../Styles/NewJobForm.css'
import Dialog from '@material-ui/core/Dialog';
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
                { key: 'id', label: 'ID' },
                { key: 'company', label: 'Company'},
                { key: 'description', label: 'Description'},
                { key: 'created_at', label: 'Created At'},
                { key: 'updated_at', label: 'Updated At'},
            ]
        }
    }
  
    componentWillMount(){
        axios.get('http://localhost:3000/api/v1/jobs').then(res => this.setState({
            jobs:res
        }))
    }

    render()
    {
        let {jobs} = this.state
        let jobData=jobs.data || []
        console.log("jobs+++",jobData)
        return(
            <div>
                <div className="jobs-list">
                    <Table json={this.state.json} data={jobData}/>
                </div>
            </div>
        );
    }
   
}
export default JobList;