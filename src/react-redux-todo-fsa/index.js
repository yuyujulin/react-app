/**
 * Created by Administrator on 2016/11/20 0020.
 */
import React from 'react'

import {Provider} from 'react-redux'
import {createStore, compose} from 'redux'

import reducer from './reducer'

import TodoContainer from './todo-container'

var store = createStore(reducer,
    //让Chrome的Redux Devtools显示数据, 需要在Chrome上先安装Redux Devtools
    compose(window.devToolsExtension())
)

var ReactReduxTodo = React.createClass({
        render(){
            return (
                <Provider store={store}>
                    <TodoContainer/>
                </Provider>
            )
        }
    }
)

export default  ReactReduxTodo