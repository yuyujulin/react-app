/**
 * Created by Administrator on 2016/11/5 0005.
 */
import React from 'react'
import {Breadcrumb, Icon} from 'antd'

import {Link} from 'react-router'

import './index.css'

var NavItem = React.createClass({
    render(){
        return (
            <Breadcrumb.Item>
                <a onClick={this.handleClick}>
                    {this.props.title}
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
        var that = this
        const {value, onChange} = this.props

        var to = ''
        const nodes = value.map(function (o, i) {
            to = to + "/" + o
            console.log("to  ", to)
            return (
                <NavItem key={i} title={o} to={to} onClick={onChange}/>
            )
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
