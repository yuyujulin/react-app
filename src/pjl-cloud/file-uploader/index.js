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
            chosenFiles: null
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
                console.log('files', files)
                _this.setState({
                    chosenFiles: files
                })
            },
            fileFieldName: 'cloud',
            paramAddToField: {path: uploadPath}
        }

        console.log(this.state.chosenFiles)

        var nodes = []

        // var nodes = this.state.chosenFiles.map(function (chosenFile, i) {
        //     return (
        //         <li key={i}>{chosenFile.name}</li>
        //     )
        // })

        return (
            <div>
                <Modal title='上传文件'
                       visible={visible}
                       onCancel={onCancel}
                       onOk={onOk}
                       footer={[
                           <Button key="choose" type="ghost" size="large" onClick={this.handleChoose}>请选择</Button>,
                           <Button key="upload" type="primary" size="large" onClick={this.handleUpload}>
                               上传
                           </Button>,
                       ]}
                >
                    <h2>要上传的文件</h2>
                    <ul>
                        {nodes}
                    </ul>
                    <FileUpload ref="File-Upload" options={options}/>
                </Modal>
            </div>
        )
    },
    handleChoose(){
        this.refs['File-Upload'].forwardChoose();
    },
    handleUpload(){
        this.refs['File-Upload'].filesToUpload([this.state.chosenFiles]);
    }

})

export default FileUploader