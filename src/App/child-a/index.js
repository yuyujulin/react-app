var React = require('react')

require('./index.css')

var ChildA = React.createClass({
    render() {
        return (
            <div className="child-a">
                child a
            </div>
        );
    }
})

module.exports = ChildA;
