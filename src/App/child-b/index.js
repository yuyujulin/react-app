var React = require('react')
require('./index.css')
var ChildB = React.createClass({
    render() {
        return (
            <div className="child-b">
                child B
            </div>
        );
    }
})

module.exports = ChildB;
