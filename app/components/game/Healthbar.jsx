
import {Line} from 'rc-progress';
import React from "react"
import store from "../../store"
export default class Healthbar extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      robots: store.getState().gameData.server.robots
    }
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      // console.log("thestorestate is ",store.getState().gameData.server.robots)
      this.setState({robots:store.getState().gameData.server.robots})
    });
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  checkIndexIsEven = (n) => {
    return ((n % 2) === 0);
  }

  render(){
    // console.log('this is the store right now', store.getState().gameData)
    var robots = Object.keys(this.state.robots)
    const leftStyle = { position: 'absolute', marginTop: '850px', marginLeft: '100px' }
    const rightStyle = { position: 'absolute', marginTop: '850px', marginLeft: '1350px' }

    return(
      <div className="score-board">
        <div id="scoreboard">
          {
             robots && robots.map((robotID, idx) => {
              return ((this.state.robots[robotID].health) ?
                  <div className="score" key={robotID} style={(this.checkIndexIsEven(idx + 1)) ? rightStyle : leftStyle }>
                    <div id="user-score"><span className="animated">
                      {this.state.robots[robotID].health * 10}
                    </span></div>
                    <h4>{ this.state.robots[robotID].userName &&
                    this.state.robots[robotID].userName.name || this.state.robots[robotID].userName}</h4>
                  </div>
                  : <div/>
              )
            })
          }
        </div>
      </div>
    )
}
}

