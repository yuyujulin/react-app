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
        const {items, removeItem, toggleItemStatus, changeStatusToShow} =  this.props
        var nodes = items.map(function (item, i) {
            var node = (
                <p key={i}>
                        <span onClick={(e) => toggleItemStatus(item.name)}
                              style={{textDecoration: item.active ? '' : 'line-through'}}>
                            {item.name}
                        </span>
                    <button onClick={(e) => removeItem(item.name)}>删除
                    </button>
                </p>
            )
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
                    <button onClick={(e) => changeStatusToShow('all')}>all</button>
                    --
                    <button onClick={(e) => changeStatusToShow('active')}>active
                    </button>
                    --
                    <button onClick={(e) => changeStatusToShow('complete')}>completed
                    </button>
                </div>
            </div>
        )
    },
    componentDidMount(){
        const {get} = this.props
        get({aaa: 111, bbb: 222})
    },
    handleAdd(){
        const {addItem} = this.props
        var itemName = ReactDOM.findDOMNode(this.refs.input).value
        console.log('add item', itemName)
        addItem(itemName)
    }
})

export default Todo