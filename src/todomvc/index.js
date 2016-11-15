/**
 * Created by Administrator on 2016/11/13 0013.
 */
/**
 * Created by Administrator on 2016/11/13/013.
 */
import React from 'react';  //var React = require("React")
import ReactDOM from 'react-dom';
import Todolist from "./todolist/index.js"

function id() {
    return String(Math.random()).slice(2) + String(Math.random()).slice(2);
}

var TodoMVC = React.createClass({
    getInitialState(){
        return ({
            items: [
                {id: id(), text: "p1", type: "active"},
                {id: id(), text: "p2", type: "active"},
                {id: id(), text: "p3", type: "completed"},
                {id: id(), text: "p4", type: "active"},
                {id: id(), text: "p5", type: "completed"},
                {id: id(), text: "p6", type: "active"},
                {id: id(), text: "p7", type: "completed"},
                {id: id(), text: "p8", type: "active"},
                {id: id(), text: "p9", type: "active"}
            ],
            value: "p1",
            type: "active"
        })
    },
    render(){
        var items = this.state.items;
        var type = this.state.type;
        var arr = [];
        for (var i = 0; i < items.length; i++) {
            if (items[i].type === type || type === "all") {
                arr.push(items[i])
            }
        }
        return (
            <div>
                <input type="text" value={this.state.value} onChange={this.change}/>
                <button style={{backgroundColor: "pink"}} onClick={this.add}>增加</button>
                <Todolist items={arr} delete={this.delete} edit={this.edit}
                          showType={this.showType} toggleType={this.toggleType}
                />
                <button style={{backgroundColor: this.state.type === "all" ? "red" : "#ccc"}} onClick={(e)=> {
                    this.showType("all")
                }}>all
                </button>
                <button style={{backgroundColor: this.state.type === "active" ? "red" : "#ccc"}} onClick={(e)=> {
                    this.showType("active")
                }}>active
                </button>
                <button style={{backgroundColor: this.state.type === "completed" ? "red" : "#ccc"}} onClick={(e)=> {
                    this.showType("completed")
                }}>completed
                </button>
            </div>
        )
    },
    showType(str){
        this.setState({
            type: str
        })
    },
    toggleType(obj){

        var items = this.state.items;
        for (var i = 0; i < items.length; i++) {
            if (obj.id === items[i].id) {
                items[i].text = obj.text
                if (obj.type === "active") {
                    obj.type = "completed"
                } else {
                    obj.type = "active"
                }
                items[i].type = obj.type
                break;
            }
        }
        this.setState({
            items: items
        })
    },
    edit(obj){
        var items = this.state.items;
        for (var i = 0; i < items.length; i++) {
            if (obj.id === items[i].id) {
                items[i].text = obj.text
                items[i].type = obj.type
                break;
            }

        }
        this.setState({
            items: items
        })
    },
    delete(obj){
        var items = this.state.items;
        var arr = [];

        for (var i = 0; i < items.length; i++) {
            if (obj.id !== items[i].id) {
                arr.push(items[i])
            }
        }

        this.setState({
            items: arr
        })
    },
    change(e){
        this.setState({
            value: e.target.value
        })
    },
    add(){
        var obj = {};
        obj.id = id();
        obj.text = this.state.value;
        obj.type = "active";
        var items = this.state.items;
        items.push(obj)
        this.setState({
            items: items
        })
    }

});

export default TodoMVC
