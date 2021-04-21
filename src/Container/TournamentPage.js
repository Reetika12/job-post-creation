import React, { Component } from 'react'
import './Styles/TournamentStyle.css'
import Button from '../Components/Button'

class TournaMentPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gameislive: true,
            redisnext: true
        }
        this.json = [{
            "image": require('../Image/avatar01.png').default,
            "color": '#37AC5D',
            "secondaryColor": "#DCF6E4",
            "playerName": "David",
            "headingName": "Player 01"
        },
        {
            "image": require('../Image/avatar02.png').default,
            "color": "#F8D146",
            "secondaryColor": "#F6EFD5",
            "playerName": "Maria",
            "headingName": "Player 02"
        }]
    }

    handleclick = (i, j) => {
        let { gameislive, redisnext } = this.state
        if (redisnext) {
            if (document.getElementById(`${i}${j}`).style.backgroundColor !== "red" && document.getElementById(`${i}${j}`).style.backgroundColor !== "yellow") {
                document.getElementById(`${i}${j}`).style.backgroundColor = "red"
                this.setState({
                    redisnext: false
                })
            }
        }
        else {
            if (document.getElementById(`${i}${j}`).style.backgroundColor !== "red" && document.getElementById(`${i}${j}`).style.backgroundColor !== "yellow") {
                document.getElementById(`${i}${j}`).style.backgroundColor = "yellow"
                this.setState({
                    redisnext: true
                })
            }
        }
        let checkStatusOfGame = this.checkGame()
    }
    handleCirclesEvent = () => {
        let arr = [];
        for (let i = 0; i < 8; i++) {
            let temp = []
            for (let j = 0; j < 8; j++) {
                temp.push(
                    <div className="circleStyle" id={`${i}${j}`} onClick={this.handleclick.bind(this, i, j)}></div>
                )
            }
            arr.push(<div className="rowStyle">{temp}</div>)
        }

        return arr;
    }
    renderCarditems = (cardData) => {
        let data = []
        cardData.forEach(d => {
            data.push(<div className="cardBlock" style={{ background: `${d.secondaryColor}` }}>
                <div className="circleClass" style={{ border: `20px solid ${d.color}` }}>
                    <img style={{ width: '56px' }} src={d.image} alt="" />
                </div>
                <div className="nameEmailStyle">
                    <div className="nameStyle">{d.headingName}</div>
                    <div className="headingStyle">{d.playerName}</div>
                </div>
            </div>)
        })
        return data;
    }

    render() {

        return (
            <React.Fragment>
                <div className="parentDiv">
                    <div className="commonStyle">
                        <div className="tournaMentBox">
                            {this.handleCirclesEvent()}
                        </div>
                        <div className="gameSide">
                            <div className="fiveGameTournament">5 Games Tournament</div>
                            <div className="congratulation">Congratulation!</div>
                            <div className="winner">David, you won Game 3</div>
                            {this.renderCarditems(this.json)}
                            <div className="underlineStyle"></div>
                            <Button
                                buttonText="Undo Step"
                                type="undostep"
                                clickEvent={this.onClickEvent}
                            />
                            <Button
                                buttonText="End Tournament"
                                type="endtournament"
                                clickEvent={this.nextScreen}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default TournaMentPage
