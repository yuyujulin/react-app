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
                }}
                onClick={this.handleClick}>
                <li className="allow">新建文件夹</li>
                <li className="allow" onClick={this.rename}>重命名</li>
                <li className="allow">删除</li>
                <li className="allow">剪切</li>
                <li className="allow">复制</li>
                <li className="allow">粘贴</li>
            </ul>
        )
    },
    rename(e){
        console.log("重命名clicked")
        const {onClickRename}= this.props
        e.preventDefault()
        e.stopPropagation()
        onClickRename()
    }
})

export default ContextMenu