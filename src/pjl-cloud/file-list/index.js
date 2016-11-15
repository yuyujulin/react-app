/**
 * Created by Administrator on 2016/11/12 0012.
 */
import React from 'react'
import ReactDOM from 'react-dom'

import {Icon, Input} from 'antd'
import Loading from '../loading'
import {hashHistory} from 'react-router'

import './index.css'

const host = 'http://101.200.129.112:9527/static/'

function getIcon(ext, isFolder) {
    if (isFolder) {
        return 'folder'
    }
    switch (ext) {
        case '.html':
            return 'code'
        case '.css':
            return 'code'
        case '.js':
            return 'code'
        case '.jpg':
            return 'picture'
        case '.png':
            return 'picture'
        case '.gif':
            return 'picture'

    }

    return 'frown-o' //遗憾脸
}

var FileItem = React.createClass({
    getInitialState(){
        return {}
    },
    render(){
        const {item, action, onRename, onPick, selectedItem} = this.props
        const type = getIcon(item.ext, item.isFolder)

        const editStatus = item.name === action.name
        const active = item.name === this.props.selectedItem

        return (
            <li className={active ? "file-item active" : "file-item"}>
                <span className="file-item-icon"
                      onClick={(e)=>onPick(item.name)}
                      onMouseDown={(e)=>onPick(item.name)}
                      onDoubleClick={this.handleDoubleClick}>
                    <Icon type={type}/>
                </span>
                <p>
                    <span style={{display: editStatus ? 'none' : 'block'}} className="file-item-name">{item.name}</span>
                    <span style={{display: editStatus ? 'block' : 'none'}}>
                        <Input value={this.state.name}
                               onPressEnter={(e) =>onRename(item.path, e.target.value)}
                               onChange={(e)=>this.setState({
                                   name: e.target.value
                               })}
                        />
                    </span>
                </p>
            </li>
        )
    },
    handleDoubleClick(){
        const {item} = this.props
        if (item.isFolder) {
            hashHistory.push(item.path)
        } else {
            window.open(host + item.path)
        }
    }
})

var FileList = React.createClass({
    render(){
        const {onChange, loading, action, onRename, selectedItem, onPick} = this.props
        var nodes = this.props.file.map(function (obj) {
            return (
                <FileItem
                    key={obj.path}
                    item={obj}
                    onChange={onChange}
                    action={action}
                    selectedItem={selectedItem}
                    onRename={onRename}
                    onPick={onPick}
                />
            )
        })

        return (
            <div className="file-content">
                <ul className="file-list" style={{display: loading ? 'none' : 'block'}}>
                    {nodes}
                </ul>
                <div style={{display: loading ? 'block' : 'none'}}>
                    <Loading/>
                </div>
            </div>

        )
    }
})

export default FileList

