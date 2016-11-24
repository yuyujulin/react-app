/**
 * Created by pjl on 2016/11/23/0023.
 */
import React from 'react'
import {Modal, Button} from 'antd'
import FileUpload from 'react-fileupload'
import _ from 'underscore'

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
                <Modal title='上传文件'
                       visible={visible}
                       onCancel={onCancel}
                       onOk={onOk}
                       footer={[]}
                >
                    <h2>要上传的文件</h2>
                    <ul>
                        {nodes}
                    </ul>
                    <FileUpload style={{float: 'right'}} ref="File-Upload" options={options}>
                        <Button ref="chooseBtn" type="primary" size="large">choose</Button>
                        <Button ref="uploadBtn" type="ghost" size="large">upload</Button>
                    </FileUpload>
                </Modal>
            </div>
        )
    }
})

export default FileUploader