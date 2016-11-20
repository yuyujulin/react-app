import React from 'react'
import {Modal, Input} from 'antd'

var Action = React.createClass({
    render(){
        const {visible, actionType, newValue, onChange, onCancel} = this.props

        var onOk = this.getOk()
        return (
            <div>
                <Modal
                    title={actionType == 'newfolder' ? '新建文件夹' : '重命名'}
                    visible={visible}
                    onCancel={onCancel}
                    onOk={onOk}
                >
                    <Input value={newValue} onChange={(e) => onChange(e.target.value)}/>
                </Modal>
            </div>
        )
    },
    getOk(){
        const {visible, actionType, newValue, onChange, onCancel, onNewFolder, onRename} = this.props
        if (actionType == 'newFolder') {
            return onNewFolder
        }
        if (actionType == 'rename') {
            return onRename
        }
    }
})

export default Action