/**
 * Created by pjl on 2016/11/23/0023.
 */
import React from 'react'
import {Modal, Button, message} from 'antd'
import FileUpload from 'react-fileupload'
import _ from 'underscore'

import './index.css'

var FileUploader = React.createClass({
    getInitialState(){
        return {
            chosenFiles: []
        }
    },
    render(){
        const {visible, onCancel, onOk, path, updateFiles} = this.props
        const {chosenFiles} = this.state
        const _this = this

        var uploadPath = "/" + path.join('/')

        /*set properties*/
        const options = {
            baseUrl: 'http://101.200.129.112:9527/file/upload/',
            multiple: true,
            dataType: 'text',
            chooseFile(files){
                var filesToUpload = []
                _.each(files, function (file) {
                    filesToUpload.push(file.name)
                })
                _this.setState({
                    chosenFiles: filesToUpload
                })
            },
            uploadSuccess(resp){
                console.log('upload success..!')
                console.log(resp)
                const {chosenFiles} = _this.state

                updateFiles(chosenFiles)
                _this.setState({
                    chosenFiles: []
                })
            },
            uploadError: function (err) {
                message.error('文件上传出错' + err)
            },
            uploadFail: function (resp) {
                message.error('文件上传失败' + resp)
            },
            fileFieldName: 'cloud',
            paramAddToField: {path: uploadPath}
        }

        var nodes = chosenFiles.map(function (chosenFile, i) {
            return (
                <li key={i}>{chosenFile}</li>
            )
        })

        return (
            <div>
                <Modal className='file-uploader'
                       title='要上传的文件'
                       visible={visible}
                       onCancel={onCancel}
                       onOk={onOk}
                       footer={[]}
                >
                    <ul>
                        {nodes}
                    </ul>
                    <FileUpload style={{float: 'right'}} ref="File-Upload" options={options}>
                        <Button style={{marginRight: '20px'}} ref="chooseBtn" type="primary" size="large">请选择</Button>
                        <Button ref="uploadBtn" type="ghost" size="large">上传</Button>
                    </FileUpload>
                </Modal>
            </div>
        )
    }
})

export default FileUploader