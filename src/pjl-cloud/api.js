/**
 * Created by Administrator on 2016/11/12 0012.
 */

import request from 'superagent'

const host = 'http://101.200.129.112:9527/'
const GET_FILE = host + 'file/get/'
const NEW_FOLDER = host + 'file/mkdir'
const RENAME_FILE = host + 'file/rename/'
const REMOVE = host + 'file/remove/'

export function getFileList(path, succCb, errorCb) {
    request.get(GET_FILE).query({
        path: path
    }).end(function (err, res) {
        if (err) {
            return errorCb(err)
        }
        succCb(res.body)
    })
}

/**
 *
 * @param query {path:xxx, name:xxx}
 * @param succCb
 * @param errorCb
 */
export function newFolder(query, succCb, errorCb) {
    request.get(NEW_FOLDER).query(query).end(function (err, res) {
        if (err) {
            return errorCb(err)
        }
        succCb(res.body)
    })
}


/**
 *
 * @param query {path:xxx, name:xxx}
 * @param succCb
 * @param errorCb
 */
export function rename(query, succCb, errorCb) {
    request.get(RENAME_FILE).query(query).end(function (err, res) {
        if (err) {
            return errorCb(err)
        }
        succCb(res.body)
    })
}

/**
 *
 * @param query {path:xxx}
 * @param succCb
 * @param errorCb
 */
export function remove(query, succCb, errorCb) {
    request.get(REMOVE).query(query).end(function (err, res) {
        if (err) {
            return errorCb(err)
        }
        succCb(res.body)
    })
}
