/**
 * Created by Administrator on 2016/11/14 0014.
 */

import React from 'react'
import _ from 'underscore'

import './index.css'

var ContextMenu = React.createClass({
    render(){

        const {display, pos, selectedItem, pastSourcePath} = this.props

        var nodes = []

        nodes.push(<li key="newFolder" className="allow new-folder" onMouseDown={(e) => this.mouseDown(e, 'newFolder')}>新建文件夹</li>)
        if (!_.isEmpty(selectedItem)) {
            nodes.push(<li key="rename" className="allow" onMouseDown={(e) => this.mouseDown(e, 'rename')}>重命名</li>)
            nodes.push(<li key="delete" className="allow" onMouseDown={(e) => this.mouseDown(e, 'delete')}>删除</li>)
            nodes.push(<li key="cut" className="allow" onMouseDown={(e) => this.mouseDown(e, 'cut')}>剪切</li>)
            nodes.push(<li key="copy" className="allow" onMouseDown={(e) => this.mouseDown(e, 'copy')}>复制</li>)
        }

        if (!_.isEmpty(pastSourcePath)) {
            nodes.push(<li key="paste"  className="allow" onMouseDown={(e) => this.mouseDown(e, 'paste')}>粘贴</li>)
        }

        return (
            <ul className="context-menu"
                style={{
                    display: display ? 'block' : 'none',
                    left: pos.x + 'px', top: pos.y + 'px'
                }}>
                {nodes}
            </ul>
        )
    },
    mouseDown(e, type){
        const {onAction}= this.props
        e.preventDefault()
        e.stopPropagation()
        onAction(type)
    }
})

export default ContextMenu