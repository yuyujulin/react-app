/**
 * Created by Administrator on 2016/11/8 0008.
 */

import React from 'react'

import './index.css'

//需求：得到最外层的组件的数据

// 第一步，在外组件
/*
<pre>
 //设置子组件的上下文
 getChildContext(){
 return {
 current: this.props.current
 }
 },
 //设置子组件的上下类型
 childContextTypes: {
 current: React.PropTypes.number
 }
</pre>
 */

// 第二步，在内组件
/*
<pre>
 //设置上下文参数的名称和类型
 contextTypes: {
    current: React.PropTypes.number
 },
//获取上下文参数
 this.context.current
</pre>
*/
//
var Card = React.createClass({
    render(){
        return (
            <div>
                {this.props.children}
            </div>
        )
    },
    //设置子组件的上下文
    getChildContext(){
        return {
            current: this.props.current
        }
    },
    //设置子组件的上下类型
    childContextTypes: {
        current: React.PropTypes.number
    }
})
var TitleBar = React.createClass({
        render(){
            return (
                <div className="title-bar">
                    {this.props.children}
                </div>
            )
        }
    }
)

var Title = React.createClass({
    //设置子组件的上下文
    contextTypes: {
        current: React.PropTypes.number
    },
    render(){
        var active = ''
        if (this.props.index == this.context.current) {
            active = 'active'
        }
        return (
            <div className={active} onClick={this.props.onClick}>{this.props.children}</div>
        )
    }
})


var ContentBar = React.createClass({
    render(){
        return (
            <div className="content-bar">
                {this.props.children}
            </div>

        )
    }
})

var Content = React.createClass({
    contextTypes: {
        current: React.PropTypes.number
    },
    render(){
        var active = ''
        var display = 'none'
        if (this.props.index == this.context.current) {
            active = 'active'
            display = 'block'
        }
        return (
            <div className={active} style={{display: display}}>{this.props.children}</div>
        )
    }
})
Card.TitleBar = TitleBar
Card.Title = Title

Card.ContentBar = ContentBar
Card.Content = Content

export default Card