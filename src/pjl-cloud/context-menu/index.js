/**
 * Created by Administrator on 2016/11/14 0014.
 */

import React from 'react'

import './index.css'

var ContextMenu = React.createClass({
    render(){
        return (
            <ul className="context-menu"
                style={{
                    display: this.props.display ? 'block' : 'none',
                    left: this.props.pos.x + 'px', top: this.props.pos.y + 'px'
                }}>
                <li className="allow" onMouseDown={(e) => this.mouseDown(e, 'newFolder')}>新建文件夹</li>
                <li className="allow" onMouseDown={(e) => this.mouseDown(e, 'rename')}>重命名</li>
                <li className="allow" onMouseDown={(e) => this.mouseDown(e, 'delete')}>删除</li>
                <li className="allow" onMouseDown={(e) => this.mouseDown(e, 'cut')}>剪切</li>
                <li className="allow" onMouseDown={(e) => this.mouseDown(e, 'copy')}>复制</li>
                <li className="allow" onMouseDown={(e) => this.mouseDown(e, 'paste')}>粘贴</li>
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