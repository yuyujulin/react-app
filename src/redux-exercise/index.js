/**
 * Created by pjl on 2016/11/29/0029.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux'

import createLogger from 'redux-logger';

import Counter from './component/Counter'
import counter from './reducers'

const logger = createLogger()
const store = createStore(counter, applyMiddleware(logger))

const rootEle = document.getElementById('root')

const render = () => ReactDOM.render(
    <Counter value={store.getState()} onIncrement={() => store.dispatch({type: 'INCREMENT'})}
             onDecrement={() => store.dispatch({type: 'DECREMENT'})}/>,
    rootEle
)

render()
store.subscribe(render)

