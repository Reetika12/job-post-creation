import React, { Component } from 'react';
import { connect } from "react-redux";
import compose from "recompose/compose";
import _get from 'lodash/get'

import { withStyles } from "@material-ui/core";
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import AppHeader from '../../Components/AppHeader';
import Loader from '../Loading';
import SelectMenu from "../SelectMenu";
import ToastMessage from '../../Components/ToastMessage';
import AppSubHeader from '../../Components/AppSubHeader'
import { Creators as GetCoursesByIdCreators } from '../../Redux/GetCourseByIdRedux';
import { Creators as createNewSlotGroupCreators } from '../../Redux/CreateNewSlotGroupRedux';

import setOfConstants from '../../Constants/Constant';

import styleSheet from './styles.css';

class NewSlotGroup extends Component {
    constructor(props) {
        super(props);
        this.sampleObj = {
            day: '',
            start_time: '',
            end_time: '',
            is_mandatory: '',
        }
        this.state = {
            slotGroupName: '',
            slotGroupActiveStatus: true,
            slotGroups: [JSON.parse(JSON.stringify(this.sampleObj)), JSON.parse(JSON.stringify(this.sampleObj)), JSON.parse(JSON.stringify(this.sampleObj))],
            toastMessage: '',
            canShowToast: false,
            count: 3,
        }
    }

    componentDidMount() {
        const course_id = _get(this.props, 'match.params.course_id');
        this.props.fetchCourseListById(course_id);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.createNewSlotGroupData.fetching && !this.props.createNewSlotGroupData.fetching) {
            let { createNewSlotGroupData } = this.props;
            if (createNewSlotGroupData.error) {
                let errorMessage = _get(createNewSlotGroupData, 'error.error.message') || _get(createNewSlotGroupData, 'error.errors[0]') || 'Error';
                this.setState({
                    toastMessage: errorMessage,
                    canShowToast: true
                });
            } else {
                const course_id = _get(this.props, 'match.params.course_id')
                this.props.history.push(`/courses/${course_id}/slot_groups`);
            }
        }
    }


    handleInputChange(key, index, event) {
        let { slotGroups = [] } = this.state;
        slotGroups[index][key] = event.target.value;
        this.setState({
            slotGroups
        });
    }

    handleSlotNameChange = (event) => {
        this.setState({
            slotGroupName: event.target.value
        })
    }

    handleNumberCountDec = () => {
        let { count } = this.state
        let slotGroups = this.state.slotGroups;
        if (count > 1) {
            slotGroups.pop();
            this.setState({
                slotGroups,
                count: count - 1
            })
        }
    }

    handleNumberCountInc = () => {
        let obj = JSON.parse(JSON.stringify(this.sampleObj))
        let { count } = this.state
        let slotGroups = this.state.slotGroups;
        slotGroups.push(obj);
        this.setState({
            slotGroups,
            count: count + 1
        })
    }

    handleSlotActiveStatusChange = () => {
        let { slotGroupActiveStatus } = this.state;
        this.setState({
            slotGroupActiveStatus: !slotGroupActiveStatus
        })
    }

    handleSubmitButtonAction = () => {
        let {
            slotGroupName = '',
            slotGroupActiveStatus = '',
            slotGroups = [],
        } = this.state;
        let slotGroup = [...slotGroups].map(item => item.is_mandatory === "true" ? { ...item, is_mandatory: true } : { ...item, is_mandatory: false })
        let isSlotDayEmpty = slotGroups.some(slot => !slot.day);
        let isSlotStartTimeEmpty = slotGroups.some(slot => !slot.start_time);
        let isSlotEndTimeEmpty = slotGroups.some(slot => !slot.end_time);
        let isMandatoryFieldEmpty = slotGroups.some(slot => !slot.is_mandatory);

        if (!slotGroupName) {
            this.setState({
                toastMessage: 'Slot group name is required',
                canShowToast: true
            });
            return;
        }

        if (isSlotDayEmpty) {
            this.setState({
                toastMessage: 'Slot day is required',
                canShowToast: true
            });
            return;
        }

        if (isSlotStartTimeEmpty) {
            this.setState({
                toastMessage: 'Slot start time is required',
                canShowToast: true
            });
            return;
        }

        if (isSlotEndTimeEmpty) {
            this.setState({
                toastMessage: 'Slot end time is required',
                canShowToast: true
            });
            return;
        }
        if (isMandatoryFieldEmpty) {
            this.setState({
                toastMessage: 'Session type is required',
                canShowToast: true
            });
            return;
        }
        let params = {
            name: slotGroupName,
            active: slotGroupActiveStatus,
            slots_attributes: slotGroup,
        }
        const course_id = _get(this.props, 'match.params.course_id');
        this.props.createNewSlotGroup(course_id, params);
    }

    handlechangeValue = () => {
        console.log("test")
    }

    handleCloseToast = () => {
        this.setState({
            toastMessage: '',
            canShowToast: false
        });
    }

    render() {
        let { session, width } = this.props;
        let drawerDocked = isWidthUp('lg', width) || isWidthUp('md', width);

        if (this.props.fetchCourseListById.fetching) {
            return <Loader />
        }

        const courseId = _get(this.props, 'match.params.course_id');
        const breadcrumbs = [
            { title: 'Courses', to: '/courses' },
            { title: `${courseId}`, to: `/courses/${courseId}` },
            { title: `Slot Groups`, to: `/courses/${courseId}/slot_groups` },
            { title: 'Create' },
        ];
        return (
            <React.Fragment>
                <AppHeader user={session} drawerDocked={drawerDocked} />

                <div className="slotGroupContainer">
                    <AppSubHeader breadcrumbs={breadcrumbs} title='Create Slot Groups' />
                    <div className="newSlotGroupContainer">
                        <div className="newSlotGroupHeader">Slot Group</div>
                        <div className="newSlotGroupForm">
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs >
                                    <label className="slotNameLabel">Name*</label>
                                </Grid>
                                <Grid item xs={10}>
                                    <input
                                        type="text"
                                        value={this.state.slotGroupName}
                                        className="slotNameInput"
                                        onChange={this.handleSlotNameChange}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container className="containerStyle">
                                <Grid item xs={2}>
                                    <label className="slotNameLabel">Weekly Frequency</label>
                                </Grid>
                                <Grid item xs={6} className="addRemoveItem">
                                    <div onClick={this.handleNumberCountDec} className="elipseMinus">-</div>
                                    <input className="rectangle65" onChange={this.handlechangeValue} value={this.state.count} autoComplete="off" type="number" />
                                    <div onClick={this.handleNumberCountInc} className="elipseMinus">+</div>
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center">
                                <Grid >
                                    <div className="newSlotActive">
                                        <label className="slotIsActiveCheckbox" onChange={this.handleSlotActiveStatusChange}>
                                            <input type="checkbox" checked={this.state.slotGroupActiveStatus} readOnly /> &nbsp;
                                            Active
                                        </label>
                                    </div>
                                </Grid>
                            </Grid>

                            {
                                this.state.slotGroups.map((slot, slotIndex) => (
                                    <div className="slotCardContainer" key={slotIndex}>
                                        <div className="slotHeader">
                                            <span className="slotTtile">
                                                Slot {Number(slotIndex) + 1}
                                            </span>
                                        </div>

                                        <div className="slotContent">
                                            <Grid container alignItems="center">
                                                <Grid item xs={2} >
                                                    <label className="slotLabel">Day*</label>
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <SelectMenu
                                                        value={slot.day}
                                                        handleChange={this.handleInputChange.bind(this, 'day', slotIndex)}
                                                        options={setOfConstants.daysInWeek}
                                                    />
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2} className="startTimeParent">
                                                <Grid item xs={2} style={{ paddingLeft: '0px' }}><label className="slotLabel">Start Time*</label></Grid>
                                                <Grid item xs={4} style={{ paddingLeft: '0px' }}><input
                                                    type="text"
                                                    value={slot.start_time}
                                                    className="slotDateInput"
                                                    placeholder="HH:MM (18:00)"
                                                    onChange={this.handleInputChange.bind(this, "start_time", slotIndex)}
                                                />
                                                </Grid>
                                                <Grid item xs={6} className="endTimeParent" >
                                                    <Grid item xs={4}><label className="slotLabelNew">End Time*</label></Grid>
                                                    <Grid item xs={8}><input
                                                        type="text"
                                                        value={slot.end_time}
                                                        className="slotDateInput"
                                                        placeholder="HH:MM (18:00)"
                                                        onChange={this.handleInputChange.bind(this, "end_time", slotIndex)}
                                                    /></Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} alignItems="center">
                                                <Grid item xs={2} >
                                                    <label className="slotLabel">Session Type*</label>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <SelectMenu
                                                        value={slot.is_mandatory}
                                                        handleChange={this.handleInputChange.bind(this, 'is_mandatory', slotIndex)}
                                                        options={setOfConstants.SessionType}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        <div className="newSlotGroupFooter">
                            <Button className="submitButton" variant="contained" onClick={this.handleSubmitButtonAction}>
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>

                <ToastMessage
                    open={this.state.canShowToast}
                    message={this.state.toastMessage}
                    vertical="top"
                    horizontal="right"
                    autoHideDuration={5000}
                    handleClose={this.handleCloseToast}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    courseDetails: state.courseById,
    createNewSlotGroupData: state.createNewSlotGroupData
});

const mapDispatchToProps = (dispatch) => ({
    fetchCourseListById: (course_id) => dispatch(GetCoursesByIdCreators.request(course_id)),
    createNewSlotGroup: (id, params) => dispatch(createNewSlotGroupCreators.request(id, params))
});

export default compose(
    withStyles(styleSheet),
    withWidth(),
    connect(mapStateToProps, mapDispatchToProps)
)(NewSlotGroup);
