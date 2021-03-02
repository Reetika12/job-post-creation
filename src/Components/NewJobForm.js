import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import '../Styles/NewJobForm.css'
import { Creators as PostJobDetailsCreators } from '../Redux/PostJobRedux'
import compose from 'recompose/compose'
import { connect } from 'react-redux'

class NewJobForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyName: "",
            position: "",
            Description: "",
            response: {}
        }
    }
    handleInputCompanyName = (event) => {
        this.setState({
            companyName: event.target.value
        })
    }
    handleInputPosition = (event) => {
        this.setState({
            position: event.target.value
        })
    }
    handleInputDescription = (event) => {
        this.setState({
            Description: event.target.value
        })
    }
    componentDidUpdate(prevprops, prevstate) {
        console.log("previousstate", prevstate)
        console.log("this state", this.state.response)
    }
    formPostData = () => {
        let { companyName, position, Description } = this.state
        const params = {
            company: companyName,
            position: position,
            description: Description,
            user_id: 25
        };
        this.props.postJobDetails(params)
        this.setState({
            companyName: "",
            position: "",
            Description: ""
        })
    }


    render() {
        console.log("response++", this.state.response)
        return (
            <div>
                <form style={{ display: 'flex', }}>
                    <input type="text" value={this.state.companyName} onChange={this.handleInputCompanyName} label="Position" placeholder="company name" />
                    <input type="text" value={this.state.position} onChange={this.handleInputPosition} label="Position" placeholder="position" />
                    <input type="text" value={this.state.Description} onChange={this.handleInputDescription} label="Description" placeholder="Description" />
                </form>
                <Button style={{ color: '#ffffff', textTransform: 'capitalize', marginTop: '10px' }} className="createJobButtonStyle" onClick={this.formPostData}>Create Job</Button>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    postJobData: state.postJobDetail
})
const mapDispatchToProps = (dispatch) => ({
    postJobDetails: (p) => dispatch(PostJobDetailsCreators.request(p))
})

export default compose(connect(mapStateToProps, mapDispatchToProps))(NewJobForm)

