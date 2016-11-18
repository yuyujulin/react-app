/**
 * Created by Administrator on 2016/11/12 0012.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {Button, Col, Row, Table, Rate, Modal, Form, Input, Radio, Alert, message} from  'antd'
import {Router, Route, IndexRoute, Link, hashHistory, browserHistory} from 'react-router';

import request from 'superagent'

import 'antd/dist/antd.css'

import './index.css'

import FileList from './file-list'
import {getFileList, rename} from  './api'
import Nav from './nav'
import ContextMenu from './context-menu'


const FormItem = Form.Item
const RadioGroup = Radio.Group
const RadioButton = Radio.Button

var R = React.createClass({
    render(){
        return (
            <Router history={hashHistory}>
                <Route path="*" component={Cloud}/>
            </Router>
        )
    }
})

var Cloud = React.createClass({
    getInitialState: function () {
        return {
            file: [],
            path: [],
            loading: false,
            contextMenuProps: {
                display: false,
                x: 0,
                y: 0
            },
            action: '',
            selectedItem: ''
        }
    },
    render(){

        return (
            <div className="app"
                 onContextMenu={this.handleContextMenu}
                 onMouseDown={this.mouseDown}
            >
                <h1 className="app-title">PJL 云盘</h1>
                <Nav value={this.state.path} onChange={(path) => hashHistory.push(path)}/>
                <FileList
                    file={this.state.file}
                    path={this.state.path}
                    loading={this.state.loading}
                    action={{
                    }}
                    selectedItem={this.state.selectedItem}
                    onPick={(name) => this.setState({selectedItem: name})}
                    onRename={this.rename}
                />
                <ContextMenu
                    display={this.state.contextMenuProps.display}
                    pos={{x: this.state.contextMenuProps.x, y: this.state.contextMenuProps.y}}
                    onClickRename={(e)=>console.log('test')}
                />
            </div>
        )
    },
    handleContextMenu(e){
        console.log('handleContextMenu')
        e.preventDefault()
        e.stopPropagation()
    },
    rename(path, newName){
        rename({path: path, name: newName}, function () {
            console.log("rename succeeded")
        }, function (err) {
            console.log('rename failed', err)
        })
    },
    getFile(path){
        var that = this
        that.setState({
            loading: true
        })
        var scb = function (res) {
            that.setState({
                file: res.file,
                path: res.path.split("/"),
                loading: false
            })
        }
        var ecb = function (error) {
            console.log('error', error)
        }
        getFileList(path, scb, ecb)
    },
    componentDidMount(){
        const {splat} = this.props.params
        console.log("componentDidMount getFile")
        this.getFile(splat)
    },
    componentWillReceiveProps(nextProps){
        const {splat} = nextProps.params
        console.log("componentWillReceiveProps getFile")
        this.getFile(splat)
    },
    mouseDown(e){
        if (e.button == 2) {
            this.setState({
                contextMenuProps: {
                    display: true,
                    x: e.clientX,
                    y: e.clientY
                }
            })
        } else {
            this.setState({
                contextMenuProps: {
                    display: false,
                    x: 0,
                    y: 0
                },
                selectedItem: ''
            })
        }
    }
})

export default R


