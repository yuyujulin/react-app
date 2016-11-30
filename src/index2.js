// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import './index.css';


var React = require('react'),
    ReactDOM = require('react-dom');


// import App from './App'
// import Todo from './to-do'
// import TodoMvc from './todomvc'
// import AntTest from './ant-test'

// import AntStudy from './ant-study'

// import AntStudy from './ant-study/index2'

// import RouteStudy from './router-study'

// import RouteStudy2 from './route-sidemenu'

// import CloudRouter from './pjl-cloud'

// import BackboneStudy from './backbone-study'

// import ReactReduxTodo from './react-redux-todo'

import ReactReduxTodo from './react-redux-todo-fsa' // flux standard action

import ReduxExcercise from './redux-exercise' //自执行的

require('./index.css')

ReactDOM.render(
    <ReactReduxTodo />,
    document.getElementById('root')
);

