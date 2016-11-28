/**
 * Created by Administrator on 2016/11/20 0020.
 */
import React from 'react'

import {Provider} from 'react-redux'
import {createStore, compose} from 'redux'

import reducer from './reducer'

import Container from './todo-container'

var store = createStore(reducer, compose(
    window.devToolsExtension() //让Chrome的Redux Devtools显示数据
))

var ReduxStudy = React.createClass({
        render(){
            return (
                <Provider store={store}>
                    <Container/>
                </Provider>
            )
        }
    }
)

export default  ReduxStudy