/**
 * Created by Administrator on 2016/11/20 0020.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {addItem, removeItem, toggleStatus, changeStatusToShow} from './action'

//因为只有render方法，没有处理数据的逻辑了，现在我们把他叫
//展示性组件
var Todo = React.createClass({
    render(){
        var _this = this
        const {items, dispatch} =  this.props
        var nodes = items.map(function (item, index) {
            return (
                <p key={index}>
                        <span onClick={(e) => dispatch(toggleStatus(item.name))}
                              style={{textDecoration: item.active ? '' : 'line-through'}}>
                            {item.name}
                        </span>
                    <button onClick={(e) =>
                        _this.handleRemove(item.name)
                    }>删除
                    </button>
                </p>
            )
        })

        return (
            <div>
                <input ref='input'/>
                <button onClick={this.handleAdd}>增加</button>
                <div>
                    {nodes}
                </div>
                <div>
                    <button onClick={(e) => dispatch(changeStatusToShow('ALL'))}>all</button>
                    --
                    <button onClick={(e) => dispatch(changeStatusToShow('ACTIVE'))}>active
                    </button>
                    --
                    <button onClick={(e) => dispatch(changeStatusToShow('COMPLETED'))}>completed
                    </button>
                </div>
            </div>
        )
    },
    handleAdd(){
        const {dispatch} = this.props
        var value = ReactDOM.findDOMNode(this.refs.input).value
        dispatch(addItem(value))
    },
    handleRemove(name){
        const {dispatch} = this.props
        dispatch(removeItem(name))
    }
})

export default Todo