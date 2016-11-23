import React from 'react'
import {Modal, Input} from 'antd'

var Action = React.createClass({
    render(){
        const {visible, newValue, onChange, onCancel} = this.props

        var actionProps = this.getActionProps()
        return (
            <div>
                <Modal
                    title={actionProps.title}
                    visible={visible}
                    onCancel={onCancel}
                    onOk={actionProps.okOperation}
                >
                    <Input value={newValue} onChange={(e) => onChange(e.target.value)}/>
                </Modal>
            </div>
        )
    },
    getActionProps(){
        const {actionType, onNewFolder, onRename} = this.props
        if (actionType === 'newFolder') {
            return {
                title: '新建文件夹',
                okOperation: onNewFolder
            }
        }

        if (actionType === 'rename') {
            return {
                title: '重命名',
                okOperation: onRename
            }
        }

        return {
            title: '未知操作',
            okOperation: function(){console.log('未知操作确认')}
        }
    }
})

export default Action