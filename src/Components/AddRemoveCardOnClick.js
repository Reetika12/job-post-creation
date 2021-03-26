import React, { Component } from 'react'
import './Styles/DefaultTableStyles.css'
import Grid from '@material-ui/core/Grid';
import SelectMenu from './SelectMenu'

class AddRemoveCard extends Component {
    constructor(props) {
        super(props);
        this.obj = {
                day: '',
                start_time: '',
                end_time: '',
                is_mandatory: true,
            }
        this.state = {
            companyName: "",
            position: "",
            count:1,
            slotGroups: [JSON.parse(JSON.stringify(this.obj))],
        }
    }
    handleNumberCountDec = () =>{
        let obj = JSON.parse(JSON.stringify(this.obj));
        let {count} = this.state
        let slotGroups = this.state.slotGroups;
        if (count>1 )
        {
           slotGroups.pop();
            this.setState({
                slotGroups,
                count: count - 1
            })
        }   
    }
    handleNumberCountInc = () =>{
        let obj = JSON.parse(JSON.stringify(this.obj));
        let { count } = this.state
        let slotGroups = this.state.slotGroups;
        slotGroups.push(obj);
        this.setState({
            slotGroups,
            count:count + 1
        }) 
      
    }
    render(){
        return(
            <div style={{display:"flex",flexDirection:"row"}}>
                <h2 style={{ paddingRight: '10px'}}>Weekly Frequency</h2>
                <div style={{ display: "flex", flexDirection: "row", alignItems: 'center'}}>
                    <div onClick={this.handleNumberCountDec}className="elipseMinus">-</div>
                    <input className="rectangle65" value={this.state.count} autoComplete="off" type="number"/>
                    <div onClick={this.handleNumberCountInc}className="elipseMinus">+</div>
                    <div>
                        {
                            this.state.slotGroups.map((slot, slotIndex) => {
                                return (
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
                                                        // handleChange={this.handleInputChange.bind(this, 'day', slotIndex)}
                                                        // options={setOfConstants.daysInWeek}
                                                    />
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2} className="startTimeParent">
                                                <Grid item xs={2} style={{ paddingLeft: '0px' }}><label className="slotLabelNew">Start Time*</label></Grid>
                                                <Grid item xs={4} style={{ paddingLeft: '0px' }}><input
                                                    type="text"
                                                    value={slot.start_time}
                                                    className="slotDateInput"
                                                    placeholder="HH:MM (18:00)"
                                                    // onChange={this.handleInputChange.bind(this, "start_time", slotIndex)}
                                                />
                                                </Grid>
                                                <Grid item xs={6} className="endTimeParent" >
                                                    <Grid item xs={4}><label className="slotLabelNew">End Time*</label></Grid>
                                                    <Grid item xs={8}><input
                                                        type="text"
                                                        value={slot.end_time}
                                                        className="slotDateInput"
                                                        placeholder="HH:MM (18:00)"
                                                        // onChange={this.handleInputChange.bind(this, "end_time", slotIndex)}
                                                    /></Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} alignItems="center">
                                                <Grid item xs={2} >
                                                    <label className="slotLabel">Session Type*</label>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <SelectMenu
                                                        value={this.state.selectedClassroomType}
                                                        // handleChange={this.handleInputSessionType.bind(this, 'is_mandatory', slotIndex)}
                                                        // options={setOfConstants.SessionType}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </div>
                                    )
                                })
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default AddRemoveCard