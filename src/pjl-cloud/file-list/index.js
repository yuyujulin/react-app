/**
 * Created by Administrator on 2016/11/12 0012.
 */
import React from 'react'
import Loading from '../loading'
import {hashHistory} from 'react-router'

import './index.css'

const host = 'http://101.200.129.112:9527/static/'

function getIcon(ext, isFolder) {
    if (isFolder) {
        return (<i className='iconfont icon-fs icon-fs-folder'>&#xe670;</i>)
    }
    switch (ext) {
        case '.html':
            return (<i className='iconfont icon-fs icon-fs-code'>&#xe619;</i>)
        case '.css':
            return (<i className='iconfont icon-fs icon-fs-code'>&#xe618;</i>)
        case '.js':
            return (<i className='iconfont icon-fs icon-fs-code'>&#xe79a;</i>)
        case '.json':
            return (<i className='iconfont icon-fs icon-fs-code'>&#xe61a;</i>)

        case '.jpg':
        case '.jpeg':
        case '.png':
        case '.gif':
            return (<i className='iconfont icon-fs icon-fs-picture'>&#xe60a;</i>)

        case '.py':
            return (<i className='iconfont icon-fs icon-fs-code'>&#xe916;</i>)

        case '.pdf':
            return (<i className='iconfont icon-fs icon-fs-pdf'>&#xe61c;</i>)
        case '.doc':
        case '.docx':
            return (<i className='iconfont icon-fs icon-fs-word'>&#xe620;</i>)
        case '.xls':
        case '.xlsx':
            return (<i className='iconfont icon-fs icon-fs-excel'>&#xe617;</i>)
        case '.ppt':
        case '.pptx':
            return (<i className='iconfont icon-fs icon-fs-ppt'>&#xe61b;</i>)

        case '.wav':
        case '.wma':
        case '.aac':
        case '.mp3':
        case '.3gp':
        case '.agg':
        case '.flac':
        case '.ape':
        case '.mid':
        case '.ogg':
            return (<i className='iconfont icon-fs icon-fs-ppt'>&#xe61d;</i>)

        case '.wmv':
        case '.mp4':
        case '.mkv':
        case '.mov':
        case '.avi':
        case '.asf':
        case '.rmvb':
        case '.rm':
        case '.flv':
        case '.3gp':
        case '.vob':
            return (<i className='iconfont icon-fs icon-fs-ppt'>&#xe61e;</i>)

        case '.java':
        case '.cpp':
        case '.c':
        case '.rb':
        case '.php':
        case '.jsp':
        case '.asp':
        case '.aspx':
            return (<i className='iconfont icon-fs icon-fs-code'>&#xe652;</i>)

        case '.rar':
        case '.zip':
        case '.7z':
        case '.tar.gz':
            return (<i className='iconfont icon-fs icon-fs-zip'>&#xe621;</i>)

        case '.md':
        case '.markdown':
            return (<i className='iconfont icon-fs icon-fs-zip'>&#xe604;</i>)

        case '.txt':
        case '.text':
            return (<i className='iconfont icon-fs icon-fs-text'>&#xe616;</i>)
        default:
            return (<i className='iconfont icon-fs'>&#xe601;</i>) //其他文件
    }
}

var FileItem = React.createClass({
    getInitialState(){
        return {}
    },
    render(){
        const {item} = this.props
        const icon = getIcon(item.ext, item.isFolder)
        const active = item.name === this.props.selectedItem

        return (
            <li className={active ? "file-item active" : "file-item"}
                onMouseDown={(e) => this.handleMouseDown(e)}
                onDoubleClick={this.handleDoubleClick}
            >
                <span className="file-item-icon">
                    {icon}
                </span>
                <p>
                    <span className="file-item-name">{item.name}</span>
                </p>
            </li>
        )
    },
    handleDoubleClick(){
        const {item} = this.props
        if (item.isFolder) {
            hashHistory.push(item.path)
            this.props.clearSelectedItem()
        } else {
            window.open(host + item.path)
        }
    },
    handleMouseDown(e){
        console.log("文件项点击")
        const {onPick, item} = this.props
        onPick(item.name)
        if (e.button === 0) { //鼠标左键点击, 则需要阻止桌面的点击，来放置解除选择
            e.preventDefault()
            e.stopPropagation()
        }
    }
})

var FileList = React.createClass({
    render(){
        const {onChange, loading, selectedItem, onPick, clearSelectedItem} = this.props
        var nodes = this.props.file.map(function (obj) {
            return (
                <FileItem
                    key={obj.path + "-" + obj.name}
                    item={obj}
                    onChange={onChange}
                    selectedItem={selectedItem}
                    clearSelectedItem={clearSelectedItem}
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

