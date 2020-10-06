import React, { Component } from 'react'
import './App.css'
import CreateTask from './Tasks/CreateTask'
import TaskMainpage from './Tasks/TaskMainpage'
// import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Constants } from './_components/Constants';
// import TasksManager from './Tasks/TasksManager'
// import * as reactbootstrap from 'react-bootstrap'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: Constants.Tasks.allTasks,
      // active_tab: 1,
      displayCreate: true,
      displayManage: false,
    }

    this.createTask = this.createTask.bind(this);
    this.manageTask = this.manageTask.bind(this);
  }

  createTask(key) {
      this.setState({
        displayCreate: true,
        displayManage: false,
      });
  }

  manageTask(key) {
      this.setState({
        displayCreate: false,
        displayManage: true,
      });
  }

  render() {
    localStorage.setItem('AllTasks', this.state.tasks);

      return (
        <div className="App">
          <header className="App-header">
            <TaskMainpage tasks={this.state.tasks}/>
          </header>
        </div>
      );
  }
}

export default App;
