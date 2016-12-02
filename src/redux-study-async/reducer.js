/**
 * Created by Administrator on 2016/11/20 0020.
 */
import {combineReducers} from 'redux'
import _ from 'underscore'

//单一的reducer，等待传入的action来处理数据

const initState = {
    name: 'todo-mvc',
    statusToShow: 'all',
    items: []
}

var todo = function (state = initState, action) {
    const {items} = state

    switch (action.type) {
        case 'reset':
            return Object.assign({},state,{items:action.items})
        case 'add':
            items.push({name: action.text, active: true})
            // return Object.assign({}, state, {items: items})  //这个语句不行，因为items的地址与原state的地址没发生变化
            // 返回对象里面的属性必须与原state的属性的地址都必须不一样，因此这里用[...items] 新生成一个数组
            return Object.assign({}, state, {items: [...items]})
        case 'remove':
            var json = []
            _.each(items, function (item) {
                if (item.name !== action.text) {
                    json.push(item)
                }
            })

            return Object.assign({}, state, {items: json})
        case 'changeStatusToShow':
            return Object.assign({}, state, {statusToShow: action.statusToShow})
        case 'toggleItemStatus':
            _.each(items, function (item) {
                if (item.name === action.itemName) {
                    item.active = !item.active
                }
            })

            return Object.assign({}, state, {items: [...items]})
        default:
            return state
    }
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
    todo, fs
})
