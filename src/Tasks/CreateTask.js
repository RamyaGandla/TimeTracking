import React, { Component } from 'react';
import * as reactbootstrap from 'react-bootstrap';

class CreateTask extends Component {
    constructor(props) {
        super(props)
        this.state = {
          taskId: (this.props.taskId !== null && this.props.taskId !== undefined) ? this.props.taskId : null,
          taskName: '',
          taskNameError: false,
          startDate: undefined,
          endDate: undefined,
          startTime: undefined,
          endTime: undefined,
          currentTimer: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
      if (this.state.taskId !== null && this.state.taskId !== undefined) {
        Object.values(this.props.tasks).map((item, index) => {
          if(item.id === this.state.taskId) {
            let startDateData = item.startDate.split(" ")
            let endDateData = item.endDate.split(" ")
            this.setState({
              taskName: item.name,
              startDate: startDateData[0],
              endDate: endDateData[0],
              startTime: startDateData[1],
              endTime: endDateData[1],
              currentTimer: startDateData,
            })
          }
        })
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevProps.taskId !== this.props.taskId) {
        this.setState({
          taskName: '',
          taskId: null,
          startDate: '',
          endDate: '',
          startTime: '',
          endTime: '',
          currentTimer: '',
        })
      }
    }

    handleSubmit(e) {
      if (this.state.taskName !== '') {
        if (this.state.taskId !== null && this.state.taskId !== undefined) {
          Object.values(this.props.tasks).map((item, index) => {
            if(item.id === this.state.taskId) {
              // console.log(this.state.currentTimer);
              // console.log(this.state.startDate + ' ' + this.state.startTime);
              // var Difference_In_Time = this.state.currentTimer[0] - this.state.startDate;
              this.props.tasks[index]['name'] = this.state.taskName
              this.props.tasks[index]['startDate'] = this.state.startDate + ' ' + this.state.startTime
              this.props.tasks[index]['endDate'] = this.state.endDate + ' ' + this.state.endTime
              this.props.tasks[index]['timer'] = "Timing cahnged from" + this.state.currentTimer + "to" + this.state.endDate + ' ' + this.state.endTime
            }
          })
          this.props.handleTasks();
        } else {
          let existingTasks = this.props.tasks
          this.props.handleTasks(e, existingTasks);
          const details = {
            "id": this.props.tasks.length + 1,
            "name": this.state.taskName,
            "startDate": this.state.startDate + ' ' + this.state.startTime,
            "endDate": this.state.endDate + ' ' + this.state.endTime,
            "timer": '',
          }

          this.props.tasks.push(details)
          localStorage.clear();
          localStorage.setItem('AllTasks', this.props.tasks);
          this.props.handleTasks();
        }
      } else {
        this.setState({
            taskNameError: true,
        })
      }

    }

    handleChange(e) {
      const {name, value} = e.target;
        this.setState({
            [name]: value,
            taskNameError: false,
        })
    }

    render() {
      const { taskName, taskNameError, startDate } = this.state

      return (
        <div className="">
        <reactbootstrap.Container>
          <div style={{ color: '#EC661C', fontSize: '20px'}} >
              <span><h4>{'Create task'}</h4></span>
          </div>
          <reactbootstrap.Form style={{ width: '600px', height: '200px'}}>
            <reactbootstrap.FormGroup>
              <div style={{ marginbottom: '15px',border: '0px' }}>
                <label style={{ color: '#EC661C', fontSize: '14px' }}>{'Task name'}<span style={{ color: 'red' }}> * </span></label>
                <input
                  name="taskName"
                  value={taskName}
                  type="text"
                  style={{ marginBottom: '15px', width: '250px', borderColor: "black", borderWidth: '3px' }}
                  id="exampleInputPassword1"
                  placeholder={"TaskName"}
                  onChange={this.handleChange}
                />
              </div>
              {taskNameError === true &&
                <div style={{ color: 'red', fontSize: '15px' }}>{"Task name is required"}</div>
              }
            </reactbootstrap.FormGroup>
            <reactbootstrap.FormGroup>
              <div style={{ marginbottom: '15px',border: '0px' }}>
                <label style={{ color: '#EC661C', fontSize: '14px' }}>{'Start date'}<span style={{ color: 'red' }}> * </span></label>
                <input
                  name="startDate"
                  value={this.state.startDate}
                  type="date"
                  style={{ marginBottom: '15px', width: '250px', borderColor: "black", borderWidth: '3px' }}
                  id="exampleInputPassword1"
                  placeholder={"Start date"}
                  onChange={(e) =>  this.setState({startDate: e.target.value})}
                />
                &nbsp;
                <input
                  name="startTime"
                  value={this.state.startTime}
                  type="time"
                  style={{ marginBottom: '15px', width: '250px', borderColor: "black", borderWidth: '3px' }}
                  id="exampleInputPassword1"
                  placeholder={"Start time"}
                  onChange={(e) =>  this.setState({startTime: e.target.value})}
                />
              </div>
            </reactbootstrap.FormGroup>
            <reactbootstrap.FormGroup>
              <div style={{ marginbottom: '15px',border: '0px' }}>
                <label style={{ color: '#EC661C', fontSize: '14px' }}>{'End date'}<span style={{ color: 'red' }}> * </span></label>
                <input
                  name="endDate"
                  value={this.state.endDate}
                  type="date"
                  style={{ marginBottom: '15px', width: '250px', borderColor: "black", borderWidth: '3px' }}
                  id="exampleInputPassword1"
                  placeholder={"End date"}
                  onChange={(e) => this.setState({endDate: e.target.value})}
                />
                &nbsp;
                <input
                  name="endTime"
                  value={this.state.endTime}
                  type="time"
                  style={{ marginBottom: '15px', width: '250px', borderColor: "black", borderWidth: '3px' }}
                  id="exampleInputPassword1"
                  placeholder={"Start time"}
                  onChange={(e) =>  this.setState({endTime: e.target.value})}
                />
              </div>
            </reactbootstrap.FormGroup>
            <reactbootstrap.Button style={{ float: 'right',backgroundColor: '#EC661C',borderColor: "black", marginBottom: '25px', marginTop: '25px', width: '80px' }} type="button" onClick={(e) => this.handleSubmit(e)}>
                  {'Save'}
            </reactbootstrap.Button>
          </reactbootstrap.Form>
        </reactbootstrap.Container>
      </div>
      );
    }
}

export default (CreateTask);
