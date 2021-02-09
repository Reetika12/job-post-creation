// import React, {useState,useEffect} from 'react';
import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import axios from 'axios';
import '../Styles/NewJobForm.css'
import Dialog from '@material-ui/core/Dialog';


class JobList extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            companyName:"",
            position:"",
            Description:"",
            jobs:[]
        }
    }
    componentWillMount(){
        axios.get('/api/v1/jobs.json').then(res => this.setState({
            jobs:res.data
        }))
    }

    render()
    {
        let {jobs} = this.state
        return(
            <div>
                <div className="jobs-list">
                    {
                        jobs.map((job,index)=>{
                            return(
                                <div key={index}>
                                {job.company} | {job.position} | {job.description}
                                <Button style={{color: '#ffffff',textTransform:'capitalize',marginTop:'10px', marginLeft:'50px'}}className="editButtonStyle" >Edit</Button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
   
}
export default JobList;