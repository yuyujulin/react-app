/**
 * Created by Administrator on 2016/11/12 0012.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {Button, Col, Row, Table, Rate, Modal, Form, Input, Radio, Alert, message} from  'antd'
import {Router, Route, IndexRoute, Link, hashHistory, browserHistory} from 'react-router';

import _ from 'underscore'

import request from 'superagent'

import 'antd/dist/antd.css'

import './index.css'

import FileList from './file-list'
import {getFileList, rename, newFolder, remove, copy, move} from  './api'
import Nav from './nav'
import ContextMenu from './context-menu'
import Action from './action'


const FormItem = Form.Item
const RadioGroup = Radio.Group
const RadioButton = Radio.Button

var CloudRouter = React.createClass({
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
            selectedItem: '',
            pasteSourceAction: '', //cut, copy
            pastSourcePath: '', //
            showAction: false,
            newValue: '',
            actionType: null
        }
    },
    render(){
        const {selectedItem, path, file, loading, newValue, showAction, actionType, contextMenuProps, pastSourcePath} = this.state

        return (
            <div className="app"
                 onContextMenu={this.handleContextMenu}
                 onMouseDown={this.mouseDown}
            >
                <h1 className="app-title">PJL 云盘</h1>
                <Nav path={path} onChange={(path) => hashHistory.push(path)}/>
                <FileList
                    file={file}
                    path={path}
                    loading={loading}
                    selectedItem={selectedItem}
                    pastSourcePath={pastSourcePath}
                    onPick={(itemName) => this.pickItem(itemName)}
                    clearSelectedItem={this.clearSelectedItem}
                />
                <ContextMenu
                    display={contextMenuProps.display}
                    pos={{x: contextMenuProps.x, y: contextMenuProps.y}}
                    selectedItem={selectedItem}
                    pastSourcePath={pastSourcePath}
                    onAction={(type) => this.handleAction(type)}
                />

                <Action visible={showAction}
                        actionType={actionType}
                        newValue={newValue}
                        onChange={(value) =>
                            this.setState({
                                newValue: value
                            })
                        }
                        onCancel={this.hideAction}
                        onNewFolder={this.handleNewFolder}
                        onRename={this.handelRename}
                />
            </div>
        )
    },
    clearSelectedItem(){
        this.setState({
            selectedItem: ''
        })
    },
    checkFileExists(fileName){
        var nameAlreadyExist = false;
        const files = this.state.file
        _.find(files, function (file, i) {
            return nameAlreadyExist = file.name == fileName
        })
        return nameAlreadyExist
    },
    handleNewFolder(){
        const {path, file, newValue} = this.state

        var _this = this
        var fullPath = path.join('/')
        if (this.checkFileExists(newValue)) {
            return message.error('文件' + newValue + '已经存在了，请重新命名')
        }
        newFolder(
            {
                path: fullPath,
                name: newValue
            },
            function (res) {

                var newFiles = Object.assign([], file)
                newFiles.push(res)

                _this.setState({
                    file: newFiles
                })
                _this.hideAction()
                message.success('成功新建文件夹' + res.name)
            }, function (res) {
                console.log(res)
            }
        )
    },
    handelRename(){
        const newName = this.state.newValue


        if (this.checkFileExists(newName)) {
            message.error(newName + " 已经存在了，请使用另外的文件名")
            return;
        } else {

            var _this = this
            var path = this.state.path.join('/') + '/' + this.state.selectedItem
            var query = {
                path: path,
                name: this.state.newValue
            }
            rename(query,
                function (res) {
                    var files = []
                    _this.state.file.map(function (file) {
                        if (file.name == _this.state.selectedItem) {
                            files.push(res) //
                        } else {
                            files.push(file)
                        }
                    })
                    _this.setState({
                        file: files,
                        selectedItem: res.name
                    })
                    _this.hideAction()
                    message.success('成功重命名文件' + _this.state.selectedItem)
                }, function (res) {
                    console.log(res)
                }
            )
        }
    },
    deleteFile(){
        const {path, selectedItem, file} = this.state;
        if (_.isEmpty(selectedItem)) {
            return message.error('请先选择要删除的文件')
        } else {
            var _this = this
            Modal.confirm({
                title: '删除确认',
                content: '是否确认删除文件"' + selectedItem + '"',
                onOk: function () {
                    var pathToDelete = path.join('/') + '/' + selectedItem
                    var query = {
                        path: pathToDelete,
                    }
                    remove(query, function (res) {
                        message.info('删除文件' + selectedItem + '成功')

                        //更新当前文件列表
                        var newFiles = []
                        _.each(file, function (file) {
                            if (file.name != selectedItem) { //如果不是被删除的那一项就显示
                                newFiles.push(file)
                            }
                        })
                        _this.setState({
                            file: newFiles,
                            selectedItem: ''
                        })

                    }, function (err) {

                    })
                },
                onCancel: function () {

                }
            })

        }
    },
    handleAction(type){

        const {selectedItem} = this.state

        this.hideContextMenu()

        if ((type == 'rename' || type == 'delete' || type == 'cut' || type == 'copy') && !selectedItem) {
            Modal.error({
                title: '操作错误',
                content: '请先选中某个文件'
            })
            return
        }
        this.setState({
            actionType: type,
        })

        if (type == 'newFolder' || type == 'rename') {
            this.showAction()
        }

        if (type == 'newFolder') {
            var newFolderName = this.getNewFolderName()

            this.setState({
                newValue: newFolderName
            })

        } else if (type == 'rename') {
            this.setState({
                newValue: selectedItem
            })
        } else if (type == 'delete') {
            this.deleteFile()
        } else if (type == 'cut') {
            this.prePasteFile(type)
        } else if (type == 'copy') {
            this.prePasteFile(type)
        } else if (type == 'paste') {
            this.doPaste()
        }
    },
    prePasteFile(type){
        const {selectedItem, path} = this.state
        var pastSourcePath = path.join('/') + '/' + selectedItem
        console.log("pastSourcePath", pastSourcePath)
        this.setState({
            pasteSourceAction: type,
            pastSourcePath: pastSourcePath
        })
        message.info((type == 'cut' ? '已剪切' : '已复制') + '"' + selectedItem + '"')
    },
    doPaste(){
        const {pasteSourceAction, pastSourcePath, path, file} = this.state
        var _this = this
        if (_.isEmpty(pasteSourceAction) || _.isEmpty(pastSourcePath)) {
            return message.error('请先剪切或复制某个文件')
        } else {
            var fileName = _.last(pastSourcePath.split('/'))
            const newPath = path.join('/') + '/' + fileName
            var overwrite = false
            if (this.checkFileExists(fileName)) {
                Modal.confirm({
                    title: '覆盖确认',
                    content: '已存在同名文件"' + fileName + '", 是否要覆盖?',
                    onOk: function () {
                        overwrite = true
                    }
                })
            } else {
                overwrite = true
            }
            if (!overwrite) { // 不覆盖则什么也不做
                return
            }

            if (pasteSourceAction == 'cut') { //剪切-粘贴
                move({
                    old_path: pastSourcePath,
                    new_path: newPath
                }, function (res) {
                    file.push(res)
                    _this.setState({
                        file: file,
                        pastSourcePath: '' //如果是剪切则需要重置粘贴源路径，因为源路径已经不存在了
                    })
                }, function (res) {
                    message.error("粘贴失败：" + res)
                })
            } else { //复制-粘贴
                copy({
                    old_path: pastSourcePath,
                    new_path: newPath
                }, function (res) {
                    file.push(res)
                    _this.setState({
                        file: file
                    })
                }, function (res) {
                    message.error("粘贴失败：" + res)
                })
            }
        }
    },
    getNewFolderName(){
        const {file} = this.state
        var commonName = '新建文件夹'
        var name = ''
        var count = 0
        _.each(file, function (fileItem) {
            if (/^新建文件夹/.test(fileItem.name)) {
                count++
            }
        })
        name = !count ? commonName : commonName + count
        while (this.checkFileExists(name)) {
            name = commonName + (++count)
        }
        return name;
    },
    showAction(){
        this.setState({
            showAction: true
        })
    },
    hideAction(){
        console.log('hiding action...')
        this.setState({
            showAction: false
        })
    },
    handleContextMenu(e){
        e.preventDefault()
        e.stopPropagation()
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
    showContextMenu(e){
        console.log("showing context menu...")
        this.setState({
            contextMenuProps: {
                display: true,
                x: e.clientX,
                y: e.clientY
            }
        })
    },
    hideContextMenu(){
        console.log("hiding context menu...")
        this.setState({
            contextMenuProps: {
                display: false,
            }
        })
    },
    pickItem(itemName){
        console.log("pick Item..." + itemName)
        this.setState({
            selectedItem: itemName,
            newValue: itemName
        })
    },
    unPickItem(){
        console.log("unPick Item...")
        this.setState({
            selectedItem: ''
        })
    },
    mouseDown(e){
        if (e.button == 2) {
            this.showContextMenu(e)
        } else {
            console.log('桌面点击')
            this.hideContextMenu()
            this.unPickItem()
        }
    }
})

export default CloudRouter


