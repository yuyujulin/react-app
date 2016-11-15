/**
 * Created by Administrator on 2016/11/6 0006.
 */
import React from 'react'

var Input = React.createClass({
    render(){
        return (
            <input className={this.props.type +" " + this.props.size}
                   value={this.props.value}
                   onChange={this.props.onChange}
                   onKeyDown={this.keyDown}
            />
        )
    },
    keyDown(e){
        if (e.key == 'Enter'){
            this.props.onPressEnter(e)
        }
    }
})

export  default Input