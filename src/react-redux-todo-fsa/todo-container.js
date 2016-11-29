/**
 * Created by Administrator on 2016/11/20 0020.
 */
import {connect} from 'react-redux'
import Todo from './todo-view'

const getVisibleTodos = (todos, statusToShow) => {
    switch (statusToShow) {
        case 'ALL':
            return todos
        case 'COMPLETED':
            return todos.filter(t => !t.active)
        case 'ACTIVE':
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



//connect连接器
//链接store，返回值是给所连接的组件当属性用
export default connect(mapState2Props)(Todo)
