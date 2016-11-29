/**
 * Created by Administrator on 2016/11/20 0020.
 */
import {combineReducers} from 'redux'

//单一的reducer，等待传入的action来处理数据

const initState = {
    name: 'todo-mvc',
    statusToShow: 'all',
    items: []
}

var todo = function (state = initState, action) {

    switch (action.type) {
        case 'add':
            var items = state.items
            items.push({name: action.itemName, active: true})
            // return Object.assign({}, state, {items: items})  //这个语句不行，因为items的地址与原state的地址没发生变化
            // 返回对象里面的属性必须与原state的属性的地址都必须不一样，因此这里用[...items] 新生成一个数组
            return Object.assign({}, state, {items: [...items]})
        case 'remove':
            var items = state.items,
                json = []

            for (var i = 0; i < items.length; i++) {
                if (items[i].name != action.itemName) {
                    json.push(items[i])
                }
            }
            return Object.assign({}, state, {items: json})
        case 'changeStatusToShow':
            return Object.assign({}, state, {statusToShow: action.statusToShow})
        case 'toggleItemStatus':
            var items = state.items

            for (var i = 0; i < items.length; i++) {
                if (items[i].name == action.itemName) {
                    items[i].active = !items[i].active
                }
            }
            return Object.assign({}, state, {items: [...items]})
    }

    return state
}

var fs = function (state, action) {
    switch (action.type) {

    }

    return {
        name: 'fs',
        items: [{name: 'ryan', folder: false, ext: '.exe'},]
    }
}

//合并reducer
export  default combineReducers({
    todo,
R})
