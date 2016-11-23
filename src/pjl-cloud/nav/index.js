/**
 * Created by Administrator on 2016/11/5 0005.
 */
import React from 'react'
import {Breadcrumb} from 'antd'
import _ from 'underscore'

import './index.css'

var NavItem = React.createClass({
    render(){
        const {title} = this.props
        var icon = (<i className='iconfont icon-nav'>&#xe60d;</i>)
        if (title === 'Home') {
            icon = (<i className='iconfont icon-nav'>&#xe6a7;</i>)
        }

        return (
            <Breadcrumb.Item>
                <a onClick={this.handleClick}>
                    {icon}{this.props.title}
                </a>
            </Breadcrumb.Item>
        )
    },
    handleClick(){
        const {to, onClick} = this.props
        console.log("bread crumb item clicked", to)
        onClick(to)
    }
})

var Nav = React.createClass({
    render(){
        const {path, onChange} = this.props

        var to = ''
        var nodes = []

        _.each(path, function (o, i) {
            if (o !== '') {
                to = to + "/" + o
                console.log("to  ", to)
                nodes.push(<NavItem key={i} title={o} to={to} onClick={onChange}/>)
            }
        })

        return (
            <div className="nav">
                <Breadcrumb>
                    <NavItem title='Home' to='/' onClick={onChange}/>
                    {nodes}
                </Breadcrumb>
            </div>
        )
    }
})

export default Nav
