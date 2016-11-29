/**
 * Created by Administrator on 2016/11/1 0001.
 */

import React from 'react'

var TodoItem = React.createClass({
    getInitialState(){
        return {
            value: this.props.item.text
        }
    },
    render(){
        return (
            <li>
                {this.props.item.text}
                <button onClick={(e) => this.props.delete(this.props.item)}>删除</button>
                <button
                    onClick={(e) => this.props.toggleType(this.props.item, this.props.item.type == 'active' ? 'complete' : 'active')}>
                    toggle-->{this.props.item.type }
                </button>
                <br/>
                <input value={this.state.value} onChange={this.handleChange}/>
                <button onClick={this.handleEdit}>确定</button>
                <button onClick={this.handleCancel}>取消</button>
                <br/>
                <br/>

            </li>
        )
    },
    handleChange(e){
        this.setState({
            value: e.target.value
        })
    },
    handleEdit(){
        var obj = {
            id: this.props.item.id,
            text: this.state.value
        }
        this.props.edit(obj)
    },
    handleCancel(){
        this.setState({
            value: this.props.item.text
        })
    }
})

var TodoList = React.createClass({
    render: function () {
        var that = this;
        var nodes = this.props.items.map(function (o) {
            return (
                <TodoItem key={o.id} item={o} delete={that.delete} edit={that.edit} toggleType={that.toggleType}/>
            )
        })
        return (
            <div>{nodes}</div>
        )
    },
    delete: function (item) {
        this.props.onDelete(item)
    },
    edit: function (item) {
        this.props.onEdit(item)
    },
    toggleType: function (item, type) {
        this.props.onToggleType(item, type)
    }
})

module.exports = TodoList