/**
 * Created by Administrator on 2016/11/11 0011.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {
    Router,
    Route,
    IndexRoute,
    Link,
    hashHistory,
    browserHistory
} from 'react-router'


import {Menu, Icon, Switch, Row, Col} from 'antd';

import 'antd/dist/antd.css'


const SubMenu = Menu.SubMenu;

const Sider = React.createClass({
    getInitialState() {
        return {
            theme: 'light',
        };
    },
    changeTheme(value) {
        this.setState({
            theme: value ? 'dark' : 'light',
        });
    },
    handleClick(e) {
        this.setState({
            current: e.key,
        });
        hashHistory.push(e.key)
    },
    render() {
        return (
            <div>
                <Switch onChange={this.changeTheme} checkedChildren="Dark" unCheckedChildren="Light"/>
                <br />
                <br />
                <Menu theme={this.state.theme}
                      onClick={this.handleClick}
                      selectedKeys={[this.state.current]}
                      mode="inline"
                >
                    <Menu.Item key="todomvc"><Link activeStyle={{color: 'red'}} to="todomvc">TODO-MVC</Link></Menu.Item>
                    <Menu.Item key="component"><Link activeStyle={{color: 'red'}} to="component">自定义组件</Link></Menu.Item>
                    <Menu.Item key="student"><Link activeStyle={{color: 'red'}} to="student">学生信息管理系统</Link></Menu.Item>

                </Menu>
            </div>
        );
    },
});

import Component from './homework/component'
import Student from './homework/student'
import TodoMvc from './homework/todomvc'

var App = React.createClass({
    render(){
        return (
            <div>
                <Sider/>
                {this.props.children}
            </div>
        )
    }
})
const R = React.createClass({
    render(){
        return (
            <Router history={hashHistory}>
                <Route path='/' component={App}>
                    <IndexRoute component={Student}/>
                    <Route path="todomvc" component={TodoMvc}/>
                    <Route path="component" component={Component}/>
                    <Route path="student" component={Student}/>
                </Route>
            </Router>
        )
    }
})
var RouteStudy = React.createClass({
    render(){
        return (
            <div>
                <Row>
                    <Col span={4}>
                        <Sider history={hashHistory}/>
                    </Col>
                    <Col span={20}>
                        <R/>
                    </Col>
                </Row>
            </div>
        )
    }
})

var RouteStudy2 = React.createClass({
    render(){
        return (
            <div>
                <R/>
            </div>
        )
    }
})

export default RouteStudy2