var ChildA = require('./child-a'),
    React = require('react'),
    request  = require('superagent')

require('./App.css')

var App = React.createClass({
    getDefaultProps(){
        console.log(1, 'getDefaultProps')

    },
    getInitialState(){
        console.log('getInitialState')
        return {
            name: 'app',
            value:'test'
        }
    },
    componentWillMount(){
        console.log('componentWillMount')
    },
   render:function () {
       console.log("render");

       return (
         <div className="App">
             <h3>hello {this.state.name} </h3>
         </div>
       );
   },
    componentDidMount: function () {
        request.get("http://101.200.129.112:9527/react1/student/?format=json").end(function (err, res) {
            console.log(res)
        })
        console.log("componentDidMount");
        this.setState({

        })
    },
    componentWillReceiveProps:function () {
        console.log("componentWillReceiveProps");
    },
    componentWillUpdate:function () {
        console.log("componentWillUpdate");
    }
})

module.exports = App;
