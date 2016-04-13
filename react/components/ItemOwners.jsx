var React = require('react');

var ItemOwners = React.createClass({
    render: function(){
        var owners = this.props.owners;
        var labelText = this.props.labelText;

        var nodes = owners.map(function (owner) {
            return <option key={owner.id} >{owner.name}</option>
        });

        return (
            <form className="form-inline">
                <div className="form-group">
                    <label className="select-label">{labelText}</label>
                    <select className="form-control">
                        {nodes}
                    </select>
                </div>
            </form>
        )
    }
});

module.exports = ItemOwners;
