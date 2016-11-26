/**
 * Created by pjl on 2016/11/23/0023.
 */
import React from 'react'
import {Modal, Button} from 'antd'
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
        const {visible, onCancel, onOk, path} = this.props
        const _this = this

        var uploadPath = "/" + path.join('/')

        /*set properties*/
        const options = {
            baseUrl: 'http://101.200.129.112:9527/file/upload/',
            multiple: true,
            chooseFile(files){
                var filesToUpload = []
                _.each(files, function (file) {
                    filesToUpload.push(file.name)
                })
                _this.setState({
                    chosenFiles: filesToUpload
                })
            },
            fileFieldName: 'cloud',
            paramAddToField: {path: uploadPath}
        }

        console.log(this.state.chosenFiles)

        var nodes = this.state.chosenFiles.map(function (chosenFile, i) {
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