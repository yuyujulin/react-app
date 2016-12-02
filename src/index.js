/**
 * Created by Administrator on 2016/11/29 0029.
 */
import React from 'react'
import ReactDOM from 'react-dom'

import {Router, Route, IndexRoute, Link, hashHistory} from 'react-router'

import {Menu, Switch} from 'antd'

import Cloud from './pjl-cloud'
import TodoMvc from './todomvc'
import Student from './antd-student'

import 'antd/dist/antd.css'
import './index.css'

const SideMenu = React.createClass({
    getInitialState(){
        return {
            theme: 'light'
        }
    },
    changeTheme(value){
        this.setState({
            theme: value ? 'dark' : 'light'
        })
    },
    handleClick(e){
        this.setState({
            current: e.key
        })
    },
    render(){
        return (
            <div>
                <Switch onChange={this.changeTheme} checkedChildren="Dark" unCheckedChildren="Light"/>
                <br />
                <Menu theme={this.state.theme}
                      onClick={this.handleClick}
                      selectedKeys={[this.state.current]}
                      mode="inline"
                >
                    <Menu.Item key="cloud"><Link activeStyle={{color: 'red'}} to="cloud">Cloud Store</Link></Menu.Item>
                    <Menu.Item key="todomvc"><Link activeStyle={{color: 'red'}} to="todomvc">Todo MVC</Link></Menu.Item>
                    <Menu.Item key="student"><Link activeStyle={{color: 'red'}} to="student">Student
                        Manage</Link></Menu.Item>
                </Menu>
            </div>
        )
    }
})

const App = React.createClass({
    render(){
        return (
            <div className="app">

                <div className="side-menu">
                    <SideMenu/>
                </div>

                <div className="container">
                    {this.props.children}
                </div>

            </div>
        )
    }
})

const AppRouter = React.createClass({
    render(){
        return (
            <Router history={hashHistory}>
                <Route path='/' component={App}>
                    <IndexRoute component={Student}/>
                    <Route path='/cloud/*' component={Cloud}/>
                    <Route path='/cloud' component={Cloud}/>
                    <Route path='todomvc' component={TodoMvc}/>
                    <Route path='student' component={Student}/>
                </Route>
            </Router>
        )
    }
})

ReactDOM.render(
    <AppRouter />,
    document.getElementById('root')
)