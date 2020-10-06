import React, { Component } from 'react'
import * as reactbootstrap from 'react-bootstrap'
import { Constants } from '../_components/Constants'
import CreateTask from './CreateTask'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

class TasksManager extends Component {
    constructor(props) {
        super(props)
        this.state = {
          Tasks: (this.props.tasks !== undefined) ? this.props.tasks : Constants.Tasks,
        }

        this.handleEdit = this.handleEdit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.searchData = this.searchData.bind(this)
    }

    handleEdit(id) {
      this.props.handleEdit(id);
    }

    handleDelete(id) {
      Object.values(this.props.tasks).map((item, index) => {
        if(item.id === id) {
          this.props.tasks.splice(index, 1);
        }
      })

      this.setState({
        Tasks: this.props.tasks,
      })
    }

    searchData(e) {
      let list = []
      let res = ''
      let alltasks = this.props.tasks;
      list = alltasks.filter(function (item) {
        res = item.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
        return res;
      });
      this.setState({
        Tasks: list,
      })
    }

    render() {
      const { Tasks } = this.state;

      return (
        <div className="">
        <reactbootstrap.Container className="pt-5 px-0">
          <div style={{ color: '#EC661C', fontSize: '20px'}} >
              <span><h4>{'Tasks'}</h4></span>
          </div>
          <reactbootstrap.Form style={{ width: '600px', height: '200px'}}>
            <reactbootstrap.Table style={{ display: 'block', border: '2px solid lightgray'}}>
              <input type="text" className="search-input form-control" style={{ borderRadius: "5px", borderColor: "#EC661C", height: '20px', width: "99%" }} placeholder={"What are you looking for ?"} autoFocus onChange={(e) => this.searchData(e)} /><br />
              <thead style={{ backgroundColor: '#EC661C', color: 'white', position: 'sticky', top: '0', textAlign: 'center' }}>
                  <tr style={{ textAlign: 'center', border: '2px solid black' }}>
                    <th>{'Task name'}</th>
                    <th>{'Start time'}</th>
                    <th>{'End time'}</th>
                    <th>{'Edit'}</th>
                    <th>{'Delete'}</th>
                    <th>{'Updated timings'}</th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: 'gray', color: 'white', position: 'sticky', top: '0', textAlign: 'center' }}>
                  {Tasks.length > 0 &&
                    <>
                      {Object.values(Tasks).map((item) => (
                        <tr style={{ textAlign: 'center', border: '2px solid black' }}>
                           <td>{item.name}</td>
                           <td>{item.startDate}</td>
                           <td>{item.endDate}</td>
                           <td>
                             <reactbootstrap.Button style={{ float: 'right',backgroundColor: '#EC661C',borderColor: "black", marginBottom: '25px', marginTop: '25px', width: '80px' }} type="button" onClick={(e) => this.handleEdit(item.id)}>
                                   {'Edit'}
                             </reactbootstrap.Button>
                           </td>
                           <td>
                             <reactbootstrap.Button style={{ float: 'right',backgroundColor: '#EC661C',borderColor: "black", marginBottom: '25px', marginTop: '25px', width: '80px' }} type="button" onClick={(e) => this.handleDelete(item.id)}>
                                   {'Delete'}
                             </reactbootstrap.Button>
                           </td>
                            <td>{item.timer}</td>
                        </tr>
                      ))}
                    </>
                  }
                </tbody>
            </reactbootstrap.Table>
          </reactbootstrap.Form>
        </reactbootstrap.Container>
      </div>
      );
    }
}

export default (TasksManager);
