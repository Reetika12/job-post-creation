import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import axios from 'axios';
import '../Styles/NewJobForm.css'
import Table from './tableComponent'
import { Creators as GetJobDetailsCreators } from '../Redux/getJobDetailsRedux'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import _get from 'lodash/get'

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
                { renderRow: (row) => <div variant="contained" className="indexTableButtonStyle" onClick={this.handleEditEvent.bind(this, row)} >Edit</div>, columnWidth: '70px'},
                { renderRow: (row) => <div variant="contained" className="indexTableButtonStyle" onClick={this.handleEditEvent.bind(this, row)} >Delete</div>, columnWidth: '70px'}
            ]
        }
    }
  
    componentDidMount(){
        this.props.getJobData()
    }
    handleEditEvent = () =>{
        console.log("kjchgvfc")
    }
    render()
    {
        let jobData = _get(this.props, 'getJobDetails.data') || []
        console.log("jobs+++",jobData)
        return(
            <div>
                <div className="jobListTitle">Job List</div>
                <div className="jobs-list">
                    <Table json={this.state.json} data={jobData}/>
                </div>
            </div>
        );
    }
   
}

const mapStateToProps = (state) => ({
    getJobDetails: state.getJobDetails
})
const mapDispatchToProps = (dispatch) => ({
    getJobData: () => dispatch(GetJobDetailsCreators.request()),
})

export default compose(connect(mapStateToProps, mapDispatchToProps))(JobList)
