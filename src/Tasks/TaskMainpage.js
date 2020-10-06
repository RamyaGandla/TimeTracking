import React, { Component } from 'react';
import * as reactbootstrap from 'react-bootstrap';
import CreateTask from './CreateTask'
import TasksManager from './TasksManager'

class TaskMainpage extends Component {
    constructor(props) {
        super(props)
        this.state = {
          tasks: this.props.tasks,
          displayCreate: true,
          displayManage: false,
          taskId: null,
        }
        this.createTask = this.createTask.bind(this);
        this.manageTask = this.manageTask.bind(this);
        this.handleTasks = this.handleTasks.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    createTask(key) {
        this.setState({
          displayCreate: true,
          displayManage: false,
          taskId: null,
        });
    }

    manageTask(key) {
        this.setState({
          displayCreate: false,
          displayManage: true,
        });
    }

    handleTasks() {
      this.setState({
        displayCreate: false,
        displayManage: true,
      });
    }

    handleEdit(id) {
      this.setState({
        taskId: id,
        displayCreate: true,
        displayManage: false,
      });
    }

    render() {
          return (
            <div className="App">
              <header className="App-header">
                <div style={{display: 'flex' }}>
                  <div>
                    <reactbootstrap.Button style={{ float: 'left',backgroundColor: '#EC661C',borderColor: "black", width: '80px' }} type="button" onClick={this.createTask}>
                          {'Create task'}
                      </reactbootstrap.Button>
                  </div>
                  &nbnp;
                  <div>
                    <reactbootstrap.Button style={{ float: 'left',backgroundColor: '#EC661C',borderColor: "black", width: '80px' }} type="button" onClick={this.manageTask}>
                          {'Manege task'}
                      </reactbootstrap.Button>
                  </div>
                </div>
                {this.state.displayCreate &&
                  <CreateTask handleTasks={this.handleTasks} tasks={this.props.tasks} taskId={this.state.taskId} {...this}/>
                }
                {this.state.displayManage &&
                  <TasksManager handleEdit={this.handleEdit} tasks={this.props.tasks}/>
                }
              </header>
            </div>
          );
    }
}

export default (TaskMainpage);
