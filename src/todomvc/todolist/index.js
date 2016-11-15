/**
 * Created by Administrator on 2016/11/13/013.
 */
import React from "react"
import ReactDOM from "react-dom"
require("./index.css")

var List = React.createClass({
    getInitialState(){
        return ({
            value: this.props.text
        })
    },
    render(){
        return (
            <li key={this.props.id}>
                {this.props.text}
                <button onClick={(e)=> {
                    this.props.delete(this.props.obj)
                }}>删除
                </button>
                <button onClick={this.toggleType}>切换</button>
                <div className="box"></div>
                <input type="text" value={this.state.value} onChange={this.change}/>
                <button onClick={this.edit}>编辑</button>
                <div className="box"></div>

            </li>
        );
    },
    toggleType(){
        var obj = {
            id: this.props.id,
            text: this.props.text,
            type: this.props.type
        }
        this.props.toggleType(obj)
    },
    edit() {
        var obj = {
            id: this.props.id,
            text: this.state.value,
            type: "active"
        };
        this.props.edit(obj)
    },

    change(e){
        this.setState({
            value: e.target.value
        })
    }
});


var Todolist = React.createClass({

    render(){
        var that = this;
        var items = this.props.items;
        var nodes = items.map(function (elem, index) {
            return <List key={elem.id} id={elem.id} text={elem.text} obj={elem} type={elem.type}
                         delete={that.props.delete}
                         edit={that.props.edit} toggleType={that.props.toggleType}
            />
        })
        return (
            <ul>
                {nodes}
            </ul>
        )
    }
});
module.exports = Todolist