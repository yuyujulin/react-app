/**
 * Created by Administrator on 2016/11/1 0001.
 */

import React from 'react'

import TodoList from './to-do-list'

var Todo = React.createClass({
    getInitialState: function () {
        return {
            items: [
                {text: 'aaa', id: 0, type: 'active'},
                {text: 'bbb', id: 1, type: 'complete'},
                {text: 'ccc', id: 2, type: 'active'},
            ],
            value: 'inp',
            type: 'active'
        }
    },
    render: function () {
        var that = this

        var filteredItems = []
        if (this.state.type === 'all') {
            filteredItems = this.state.items
        } else {
            this.state.items.map(function (item) {
                if (item.type === that.state.type) {
                    filteredItems.push(item);
                } else {

                }
            })
        }

        return (
            <div className="todo-mvc">
                <h3>todos</h3>

                <p>
                    <input value={this.state.value} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
                    <button onClick={this.handleAdd}>提交</button>
                </p>

                <TodoList items={filteredItems} onDelete={this.handleDelete} onEdit={this.handleEdit} onToggleType={this.handleToggleType}/>

                <p>
                    <button style={{background:this.state.type == 'all' ? 'red':'#dddddd'}} onClick={ (e)=>this.setState({type:'all'})}>all</button>
                    <button style={{background:this.state.type == 'active' ? 'red':'#dddddd'}} onClick={(e)=>this.setState({type:'active'})}>active</button>
                    <button style={{background:this.state.type == 'complete' ? 'red':'#dddddd'}}  onClick={(e)=>this.setState({type:'complete'})}>complete</button>
                </p>
            </div>
        )
    },
    handleKeyPress(e){
        if (e.key === "Enter") {
            this.handleAdd();
        }
    },
    handleAdd: function () {
        var items = this.state.items,
            text = this.state.value
        console.log("adding... ", text)
        items.push({
            id: items.length,
            text: text,
            type:'active'
        })
        this.setState({
            items: items,
            value: ''
        })
    },
    handleChange: function (e) {
        this.setState({
            value: e.target.value
        })
    },
    handleDelete: function (item) {
        var items = this.state.items,
            newItems = []

        console.log("deleting... ", item)

        for (var i = 0; i < items.length; i++) {
            if (items[i].id !== item.id) {
                newItems.push(items[i])
            }
        }

        this.setState({
            items: newItems
        })
    },
    handleEdit(item){
        console.log("editing... ", item)

        var newItems = this.state.items.map(function (o) {
            console.log(o)
            if (o.id === item.id) {
                o.text = item.text
            }
            return o
        })

        this.setState({
            items: newItems
        })
    },
    handleToggleType(item, type){
        console.log("toggling type... ", item)

        var newItems = this.state.items.map(function (o) {
            console.log(o)
            if (o.id === item.id) {
                o.type = type
            }
            return o
        })

        this.setState({
            items: newItems
        })
    }
})

module.exports = Todo