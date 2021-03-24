import React, { Component } from 'react'
import './Styles/DefaultTableStyles.css'

class AddRemoveCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyName: "",
            position: "",
            count:1
        }
    }
    handleNumberCountDec = () =>{
        let {count} = this.state
        if (count>1 )
        {
            this.setState({
                count: count - 1
            })
        }   
    }
    handleNumberCountInc = () =>{
        let { count } = this.state
        this.setState({
            count:count+1
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
                </div>
            </div>
        )
    }
}
export default AddRemoveCard