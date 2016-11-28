/**
 * Created by Administrator on 2016/11/20 0020.
 */
import {combineReducers} from 'redux'

const defaultState = {
    name: 'todo-mvc',
    statusToShow: 'all',
    items: [{name: 'aaa', active: false}, {name: 'bbb', active: true},]
}

//单一的reducer，等待传入的action来处理数据
const todo = (state = defaultState, action = {}) => {
    const {items} = state
    const {type, payload} = action


    switch (type) {
        case 'ADD_ITEM':
            items.push({name: payload.itemName, active: true})
            // return Object.assign({}, state, {items: items})  //这个语句不行，因为items的地址与原state的地址没发生变化
            // 返回对象里面的属性必须与原state的属性的地址都必须不一样，因此这里用[...items] 新生成一个数组
            return Object.assign({}, state, {items: [...items]})

        case 'REMOVE_ITEM':
            var json = []

            for (var i = 0; i < items.length; i++) {
                if (items[i].name !== payload.itemName) {
                    json.push(items[i])
                }
            }
            return Object.assign({}, state, {items: json})

        case 'CHANGE_STATUS_TO_SHOW':
            return Object.assign({}, state, {statusToShow: payload.status})

        case 'TOGGLE_STATUS':
            for (var i = 0; i < items.length; i++) {
                if (items[i].name === payload.itemName) {
                    items[i].active = !items[i].active
                }
            }
            return Object.assign({}, state, {items: [...items]})

        default:
            return state
    }
}

const fs = (state, action) => {
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
    fs
})
