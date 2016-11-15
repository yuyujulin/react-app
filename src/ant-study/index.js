/**
 * Created by Administrator on 2016/11/5 0005.
 */
import React from 'react'

import Button from './button'
import Input from './input'
import Table from './table'
import FormItem from './form-item'

const dataSource = [{
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号'
}, {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号'
}];

const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
}, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
}, {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
}];


var AntStudy = React.createClass({
    getInitialState(){
        return {
            value: 'aaa',
            error:false
        }
    },
    render(){
        return (
            <div>
                <h3>Ant Study</h3>
                <Button size='large' icon='loading' type='info' loading={false}>我是按钮</Button>
                <Input value={this.state.value}
                       onChange={e => this.setState({value: e.target.value})}
                       onPressEnter={this.enter}
                />
                <Table border onRowClick={this.handleClick} dataSource={dataSource} columns={columns} page/>

                <FormItem label='姓名' errmsg='请不要输入敏感字符' error={this.state.error} value={this.state.value}
                          onChange={this.handleChange}/>
            </div>
        )
    },
    enter(e){
        alert(e.target.value)
    },
    handleClick(obj){
        console.log(JSON.stringify(obj))
    },
    handleChange(e){
        if (e.target.value === 'ryan') {
            this.setState({
                value: e.target.value,
                error: true
            })
        } else {
            this.setState({
                value: e.target.value,
                error: false
            })
        }


    }
})

export  default AntStudy