var React = require('react')
require('./index.css')
var ChildC = React.createClass({
    render() {
        return (
            <div className="child-c">
                child C
            </div>
        );
    }
})

module.exports = ChildC;
