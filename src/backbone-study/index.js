/**
 * Created by Administrator on 2016/11/12 0012.
 */
import request from 'superagent'
import React from 'react'
import ReactDOM from 'react-dom'
import File from '../pjl-cloud/file-list'

import mix from './mix'

import {Students,Files} from './model'

var Student = React.createClass({

    render(){
        var nodes = this.props.items.map(function (obj) {
            return (
                <li key={obj.id}>
                    <span>{obj.name}</span> --><span>{obj.age}</span>
                </li>
            )
        })
        return (
            <ul>
                {nodes}
            </ul>
        )
    }
})

var BackboneStudy = React.createClass({
    getInitialState(){
        return {
            items: [],
            files:[]
        }
    },
    mixins:[mix],
    render(){
        return (
            <div>
                <Student items={this.state.items}/>
            </div>
        )
    },
    componentDidMount(){
        var that = this

        this.setSingleDataFlow('Students', 'items')
        this.setSingleDataFlow('Files', 'files')

        request.get("http://101.200.129.112:9527/react1/student/").end(function (err, res) {
            Students.reset(res.body)
        })
        request.get("http://101.200.129.112:9527/file/get/?path=/").end(function (err, res) {
            Files.reset(res.body.file)
        })
    }

})

export default BackboneStudy