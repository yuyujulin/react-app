/**
 * Created by pjl on 2016/11/28/0028.
 */

export function addItem(itemName) {
    return {
        type: 'ADD_ITEM',
        payload: {
            itemName
        }
    }
}

export function removeItem(itemName) {
    return {
        type: 'REMOVE_ITEM',
        payload: {
            itemName
        }
    }
}

export function toggleStatus(itemName) {
    return {
        type: 'TOGGLE_STATUS',
        payload: {
            itemName
        }
    }
}

export function changeStatusToShow(status) {
    return {
        type: 'CHANGE_STATUS_TO_SHOW',
        payload: {
            status
        }
    }
}