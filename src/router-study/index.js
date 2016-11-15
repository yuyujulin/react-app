/**
 * Created by Administrator on 2016/11/10 0010.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, Link, hashHistory, browserHistory} from 'react-router';

const App = React.createClass({
    render(){
        return (
            <div>
                App
                <ul role="nav">
                    <li><Link to="app/about2"  activeStyle={{color: 'red'}}>About2</Link></li>
                    <li><Link to="app/repos2"  activeStyle={{color: 'red'}}>Repos2</Link></li>
                </ul>
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
})

const Repos = React.createClass({
    render(){
        return (
            <div>Repos {this.props.params.repoid}</div>
        )
    }
})

const Repos2 = React.createClass({
    render(){
        return (
            <div>Repos2 {this.props.params.repoid}</div>
        )
    }
})

const About = React.createClass({
    render(){
        return (
            <div>about</div>
        )
    }
})

const About2 = React.createClass({
    render(){
        return (
            <div>about2</div>
        )
    }
})


const Index = React.createClass({
    render(){
        return (
            <div>index</div>
        )
    }
})


const R = React.createClass({
    render(){
        return (
            <Router history={hashHistory}>
                <Route path="app" component={App}>
                    <Route path="repos/:repoid" component={Repos}/>
                    <Route path="about" component={About}/>
                </Route>
            </Router>
        )
    }
})

const R2 = React.createClass({
    render(){
        return (
            <Router history={hashHistory}>

                <Route path="/app" component={App}>
                    <IndexRoute component={Index}/>
                    <Route path="repos2" component={Repos2}/>
                    <Route path="about2" component={About2}/>
                </Route>
            </Router>
        )
    }
})

const RouteStudy = React.createClass({
    render: function () {
        return (
            <div>
                <h3>react-router</h3>
                <R2/>
            </div>
        )
    }
})

export default RouteStudy