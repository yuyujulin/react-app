/**
 * Created by Administrator on 2016/11/5 0005.
 */
import React from 'react'

import './index.css'

var Button = React.createClass({
    render(){
        return (
            <button className={this.props.type +" " + this.props.size}>{this.props.children}{this.props.loading ? '...':''}</button>
        )
    }
})

export  default Button