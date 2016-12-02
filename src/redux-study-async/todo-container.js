/**
 * Created by Administrator on 2016/11/20 0020.
 */
import {connect} from 'react-redux'
import Todo from './todo-view'

import {add, get} from './action'
import {bindActionCreators} from 'redux'

var mapState2Props = function (store) {
    return {
        items: store.todo.items,
        name: store.todo.name,
        statusToShow: store.todo.statusToShow
    }
}

var dispatch2props = function (dispatch) {
    return {
        dispatch,
        add:(text)=>dispatch(add(text)),
        get:bindActionCreators(get, dispatch)
    }
}
//connect连接器
//链接store，返回值是给所连接的组件当属性用
export default connect(mapState2Props, dispatch2props)(Todo)
