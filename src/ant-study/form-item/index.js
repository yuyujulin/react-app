/**
 * Created by Administrator on 2016/11/6 0006.
 */
import React from 'react'

import './index.css'

var FormItem = React.createClass({
    render(){
        return (
            <div className="form-item">
                <p>
                    <label>{this.props.label}</label>
                    <input value={this.props.value} onChange={this.props.onChange}/>
                </p>
                <p style={{display: this.props.error ? 'block' : 'none'}}>
                    {this.props.errmsg}
                </p>
            </div>
        )
    }
})

export default FormItem