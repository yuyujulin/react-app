/**
 * Created by Administrator on 2016/11/20 0020.
 */
import React from 'react'
import ReactDOM from 'react-dom'

//因为只有render方法，没有处理数据的逻辑了，现在我们把他叫
//展示性组件
var Todo = React.createClass({
    render(){
        var _this = this
        const {items, dispatch, statusToShow} =  this.props
        var nodes = items.map(function (item, index) {
            var node = null;
            if (statusToShow == 'all' || (statusToShow == 'active' && item.active) || (statusToShow == 'completed' && !item.active)) {
                node = (
                    <p key={index}>
                        <span onClick={(e) => dispatch({type: 'toggleItemStatus', itemName: item.name})}
                              style={{textDecoration: item.active ? '' : 'line-through'}}>
                            {item.name}
                        </span>
                        <button onClick={(e) =>
                            _this.handleRemove(item.name)
                        }>删除
                        </button>
                    </p>
                )
            }
            return node
        })

        return (
            <div>
                <input ref='input'/>
                <button onClick={this.handleAdd}>增加</button>
                <div>
                    {nodes}
                </div>
                <div>
                    <button onClick={(e) => dispatch({type: 'changeStatusToShow', statusToShow: 'all'})}>all</button>
                    --
                    <button onClick={(e) => dispatch({type: 'changeStatusToShow', statusToShow: 'active'})}>active
                    </button>
                    --
                    <button onClick={(e) => dispatch({type: 'changeStatusToShow', statusToShow: 'completed'})}>completed
                    </button>
                </div>
            </div>
        )
    },
    handleAdd(){
        const {dispatch} = this.props
        var value = ReactDOM.findDOMNode(this.refs.input).value
        dispatch({
            type: 'add',
            itemName: value
        })
    },
    handleRemove(name){
        const {dispatch} = this.props
        console.log('removing ' + name)
        dispatch({
            type: 'remove',
            itemName: name
        })
    }
})

export default Todo