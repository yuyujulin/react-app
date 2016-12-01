/**
 * Created by Administrator on 2016/11/5 0005.
 */
import React from  'react'
import {Button, Table, Modal, Form, Input, Radio, Alert, message} from  'antd'

import request from 'superagent'

import _ from 'underscore'

import 'antd/dist/antd.css'
import './index.css'


const FormItem = Form.Item
const RadioGroup = Radio.Group
const RadioButton = Radio.Button

var header = [
    {title: 'id', dataIndex: 'id'},
    {title: 'name', dataIndex: 'name'},
    {title: 'age', dataIndex: 'age'},
    {title: 'sex', dataIndex: 'sex'},
    {
        title: 'single', dataIndex: 'single',
        render: (single, obj) => (
            <div>{obj.name} 这只 {single ? '单身狗' : '恩爱狗'} 今年 {obj.age} 岁了</div>
        )
    },
    {title: 'url', dataIndex: 'url'}
]

const api = 'http://101.200.129.112:9527/react1/student/'

var AntTest = React.createClass({
    getInitialState(){
        return {
            loading: false,
            items: [],
            showForm: false,
            action: '',
            showError: false,
            errorDesc: '',
            name: '',
            age: 27,
            sex: 'boy',
            single: true,
            selectedRowKeys: [],  // Check here to configure the default column
        }
    },
    onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    },
    render(){
        const {selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        var selectedOneRow = selectedRowKeys.length === 1

        return (
            <div className="app-student">
                <h3>学生信息管理</h3>
                <div className="app-student-operation">
                    <Button icon='plus' type='primary' onClick={this.handleAdd}>增加</Button>&nbsp;
                    <Button icon='edit' type='ghost' disabled={!selectedOneRow}
                            onClick={this.handleEdit}>修改</Button>&nbsp;
                    <Button icon='delete' disabled={!selectedOneRow} onClick={this.handleDelete}>删除</Button>
                </div>
                <div className="app-student-content">
                    <Table rowSelection={rowSelection} loading={this.state.loading} columns={header}
                           dataSource={this.state.items}></Table>
                </div>

                <Modal visible={this.state.showForm} onCancel={(e) => this.setState({showForm: false})}
                       onOk={this.handleSave} title={this.state.action === 'add' ? '增加学生信息' : '修改学生信息'}>
                    <div style={{display: this.state.showError ? 'block' : 'none'}}>
                        <Alert
                            message="Error"
                            description={this.state.errorDesc}
                            type="error"
                            closable={false}
                            showIcon
                        />
                    </div>
                    <Form>
                        <FormItem label='name' labelCol={{span: 4}} wrapperCol={{span: 14}}>
                            <Input value={this.state.name} onChange={(e) => this.handleChange(e, 'name')}/>
                        </FormItem>
                        <FormItem label='age' labelCol={{span: 4}} wrapperCol={{span: 14}}>
                            <Input value={this.state.age} onChange={(e) => this.handleChange(e, 'age')}/>
                        </FormItem>

                        <FormItem label='sex' labelCol={{span: 4}} wrapperCol={{span: 18}}>
                            <RadioGroup value={this.state.sex} onChange={(e) => this.handleChange(e, 'sex')}>
                                <Radio key="boy" value={'boy'}>男</Radio>
                                <Radio key="girl" value={'girl'}>女</Radio>
                            </RadioGroup>
                        </FormItem>

                        <FormItem label='single' labelCol={{span: 4}} wrapperCol={{span: 18}}>
                            <RadioGroup value={this.state.single} onChange={(e) => this.handleChange(e, 'single')}>
                                <RadioButton key="boy" value={true}>单身狗</RadioButton>
                                <RadioButton key="girl" value={false}>恩爱狗</RadioButton>
                            </RadioGroup>
                        </FormItem>

                    </Form>
                </Modal>


            </div>
        )
    },
    componentDidMount(){
        this.setState({
            loading: true
        })
        var that = this
        request.get(api).end(function (err, res) {
            if (err) {
                return console.log(err)
            }
            res.body = res.body.map(function (obj) {
                obj.key = obj.id
                return obj
            })
            that.setState({
                loading: false,
                items: res.body
            })

        })
    },
    handleChange(e, fieldName){
        var value = e.target.value,
            obj = {}

        obj[fieldName] = value

        console.log(obj)

        this.setState(obj)
    },
    handleSave(){
        var that = this
        var data = {
            name: this.state.name,
            age: this.state.age,
            sex: this.state.sex,
            single: this.state.single
        }
        if (this.state.action === 'add') {
            request.post(api).send(data).end(function (err, res) {
                if (err) {
                    return console.log(err)
                }
                console.log(res.body)
                var items = that.state.items
                var item = res.body
                item.key = item.id
                items.unshift(item)
                that.setState({
                    showForm: false,
                    items: items
                })
                message.success("成功添加数据" + item.name)
            })
        }
        if (this.state.action === 'edit') {
            const {items, selectedRowKeys} = this.state
            const selectedItemKey = selectedRowKeys[0]

            var selectedItem = _.find(items, function (item) {
                return item.key === selectedItemKey
            })

            var editUrl = api + selectedItem.key + '/'
            request.put(editUrl).send(data).end(function (err, res) {
                if (err) {
                    message.error(res.body.name)
                    that.setState({
                        showError: true,
                        errorDesc: res.body.name
                    })
                    return
                }
                var newItems = []
                _.each(items, function (item) {
                    if (item.key === selectedItemKey) {
                        var newItem = res.body
                        newItem.key = newItem.id
                        newItems.push(newItem)
                    } else {
                        newItems.push(item)
                    }
                })

                that.setState({
                    showForm: false,
                    items: newItems,
                    selectedRowKeys: []
                })
                message.success("修改数据成功")
            })
        }

    },
    handleAdd(){
        this.setState({
            showForm: true,
            action: 'add',
            name: 'ryan',
            age: 27,
            sex: 'boy',
            single: true,
            showError: false,
            errorDesc: ''
        })

    },
    handleEdit(){
        const {items, selectedRowKeys} = this.state
        const selectedItemKey = selectedRowKeys[0]
        console.log("selectedItemKey", selectedItemKey)
        var selectedItem = _.find(items, function (item) {
            return item.key === selectedItemKey;
        })
        console.log("selectedItem", selectedItem)

        this.setState({
            showForm: true,
            action: 'edit',
            name: selectedItem.name,
            age: selectedItem.age,
            sex: selectedItem.sex,
            single: selectedItem.single,
            showError: false,
            errorDesc: ''
        })
    },
    handleDelete(){
        var that = this;
        const {items, selectedRowKeys} = this.state
        const selectedItemKey = selectedRowKeys[0]
        var selectedItemName = ''
        var newItems = []
        _.each(items, function (item) {
            if (item.key === selectedItemKey) {
                selectedItemName = item.name
            } else {
                newItems.push(item)
            }
        })


        Modal.confirm({
            title: '删除学生信息',
            content: '确定要删除' + selectedItemName + '这条学生记录吗？该操作很危险，请小心使用',
            onOk: function () {
                var id = api + selectedItemKey + '/'
                request.delete(id).end(function (err, res) {
                    if (err) {
                        console.log(err)
                    } else {
                        that.setState({
                            items: newItems,
                            selectedRowKeys: []
                        })
                        message.success('成功删除数据')
                    }
                })

            },
            onCancel: function () {
                message.success('取消删除数据')
            }
        })
    }
})

export default AntTest