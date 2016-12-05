/**
 * Created by Administrator on 2016/11/20 0020.
 */
import {connect} from 'react-redux'
import Todo from './todo-view'

import {addItem, removeItem, toggleItemStatus, changeStatusToShow, resetItems, get} from './action'
import {bindActionCreators} from 'redux'

const getVisibleTodos = (todos, statusToShow) => {
    switch (statusToShow) {
        case 'all':
            return todos
        case 'complete':
            return todos.filter(t => !t.active)
        case 'active':
            return todos.filter(t => t.active)
        default:
            throw new Error('Unknown status: ' + statusToShow)
    }
}

var mapState2Props = function (state) {
    return {
        items: getVisibleTodos(state.todo.items, state.todo.statusToShow)
    }
}

var dispatch2props = function (dispatch) {
    return {
        dispatch,
        addItem: (itemName) => dispatch(addItem(itemName)),
        removeItem: (itemName) => dispatch(removeItem(itemName)),
        toggleItemStatus: (itemName) => dispatch(toggleItemStatus(itemName)),
        changeStatusToShow: (statusToShow) => dispatch(changeStatusToShow(statusToShow)),
        resetItems: (items) => dispatch(resetItems(items)),
        get: bindActionCreators(get, dispatch)
    }
}
//connect连接器
//链接store，返回值是给所连接的组件当属性用
export default connect(mapState2Props, dispatch2props)(Todo)
