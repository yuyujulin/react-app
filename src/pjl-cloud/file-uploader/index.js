/**
 * Created by pjl on 2016/11/23/0023.
 */
import React from 'react'
import {Modal} from 'antd'

var FileUploader = React.createClass({
    render(){
        const {visible, onCancel, onOk} = this.props

        return (
            <div>
                <Modal title='上传文件' visible={visible} onCancel={onCancel} onOk={onOk}>
                    <div id="thelist" className="uploader-list"></div>
                    <div className="btns">
                        <div id="picker">选择文件</div>
                        <button id="ctlBtn" className="btn btn-default">开始上传</button>
                    </div>
                </Modal>
            </div>
        )
    }
})

export default FileUploader