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
    }
}

export function get(query){
    return function (dispatch) {
        request.get('').end(function(err, res){
            console.log(query)
            console.log(res)
        })
    }
}