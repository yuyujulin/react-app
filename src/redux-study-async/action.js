/**
 * Created by Administrator on 2016/11/26 0026.
 */

import request from 'superagent'

export function active(text) {
    return {
        type: 'active',
        value: text
    }
}
export function activeItem(text) {
    return {
        type: 'active-item',
        text: text
    }
}

export function add(text) {
    return {
        type: 'add',
        text:text
    }
}

export function remove(text) {
    return {
        type: 'remove',
        text
    }
}


export function reset(items) {
    return {
        type : 'reset',
        items:items
    }
}


export function get(query){
    return function (dispatch) {
        console.log(query)
        request
            .get('http://101.200.129.112:9527/react1/student/')
            .end(function (err, res) {
                console.log(res.body)
                dispatch(reset(res.body))
            })
    }
}

export function login(query) {
    return function (dispatch) {
        console.log(query)
        request
            .get('http://101.200.129.112:9527/deploy/login/')
            .end(function (err, res) {
                console.log(res.body)
                dispatch(reset(res.body))
            })
    }
}