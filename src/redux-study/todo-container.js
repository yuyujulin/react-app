/**
 * Created by Administrator on 2016/11/20 0020.
 */
import {connect} from 'react-redux'
import Todo from './todo-view'

var mapState2Props = function (store) {
    return {
        items: store.todo.items,
        name: store.todo.name,
        statusToShow: store.todo.statusToShow
    }
}

//connect连接器
//链接store，返回值是给所连接的组件当属性用
export default connect(mapState2Props)(Todo)
