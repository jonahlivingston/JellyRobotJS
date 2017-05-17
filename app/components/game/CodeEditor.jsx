import React from 'react'
import store from "../../store"
import { RobotWorld } from './RobotWorld'
import AceEditor from 'react-ace';
import socket from '../../socket';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

var startingCode =
`(function(){
   function SubRobot(){
       this.color = "red"
    };

  SubRobot.prototype = Object.create(RobotClass.prototype)
  //ToDo: call functions with roomName and PlayerId so we know
  // which robot to move
  SubRobot.prototype.start = function(roomName, playerId){
    this.walkForward(roomName, playerId)
    this.walkTowardOpponent(roomName, playerId)
  }

  return new SubRobot()
})`
var inputCode = startingCode

class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previousInput: startingCode
    }
  }

  onChange = (newCode) => {
    this.setState({previousInput: newCode})
  }

  onSubmit = () => {
    console.log('hitting submit')
    const code = this.state.previousInput
    const userName = this.props.user.name
    const room = this.props.room
    $('.glyphicon-chevron-down').trigger('click');
    socket.emit('sendCode', code, room, userName)
  }

  onSaveRobot = () => {
    const userId = this.props.user.id
    this.props.saveRobot('testRobot', this.state.previousInput, userId)
  }

  render () {
    return(
          <div className="row">
              <div className="panel panel-primary">
                <div className="panel-heading" id="accordion">
                    <span className="glyphicon glyphicon-pencil"></span> Code Editor
                    <div className="btn-group pull-right">
                        <a type="button" className="btn btn-default btn-xs" data-toggle="collapse" data-parent="#accordion" href="#code">
                            <span className="glyphicon glyphicon-chevron-down"></span>
                        </a>
                    </div>
                </div>
                <div className="panel-collapse collapse" id="code">
                    <div className="panel-body">
                        <AceEditor
                          mode="javascript"
                          theme="monokai"
                          onChange={this.onChange}
                          height="800px"
                          width="540px"
                          name="ace-form"
                          value={this.state.previousInput}
                          defaultValue={startingCode}
                          editorProps={{$blockScrolling: true}}
                          maxLines = {50}
                          minLines = {23}
                          />
                    </div>
                    <div className="panel-footer">
                        <div className="input-group">
                            <span className="input-group-btn">
                                <button className="btn btn-warning btn-sm" onClick={this.onSubmit} id="btn-chat">
                                    Submit</button>
                            </span>
                            <span className="input-group-btn">
                                <button className="btn btn-warning btn-sm" onClick={this.onSaveRobot} id="btn-chat">
                                    Save Your Robot</button>
                            </span>
                        </div>
                    </div>
                </div>
              </div>
          </div>
    );
  }
}

/* ------ CONTAINER ------ */

import { connect } from 'react-redux'
import { SaveRobot } from "../../reducers/frontendStore"

const mapStateToProps = (state) => ({
  user: state.auth.user,
  room: state.gameData.room
})

const mapDispatchToProps = (dispatch) => ({
  saveRobot: function(robotName, code, userId) {
    dispatch(SaveRobot(robotName, code, userId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CodeEditor)