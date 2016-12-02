/**
 * Created by Administrator on 2016/11/26 0026.
 */

import request from 'superagent'
import _ from 'underscore'


export function addItem(itemName) {
    return {
        type: 'addItem',
        itemName
    }
}

export function removeItem(itemName) {
    return {
        type: 'removeItem',
        itemName
    }
}

export function toggleItemStatus(itemName) {
    return {
        type: 'toggleItemStatus',
        itemName
    }
}

export function changeStatusToShow(statusToShow) {
    return {
        type: 'changeStatusToShow',
        statusToShow
    }
}

export function resetItems(items) {
    return {
        type: 'resetItems',
        items: items
    }
}

export function get(query) {
    return function (dispatch) {
        console.log(query)
        request
            .get('http://101.200.129.112:9527/react1/student/')
            .end(function (err, res) {
                var items = []
                _.each(res.body, function (student) {
                    items.push({name: student.name, active: true})
                })
                dispatch(resetItems(items))
            })
    }
}
