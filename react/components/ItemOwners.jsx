var React = require('react');

var OwnerActions = require('../../actions/OwnerActions');
var OwnerStore = require('../../stores/OwnerStore');

var ItemOwners = React.createClass({

    componentDidMount: function(){
        this.unsubscribe = OwnerStore.listen(this.onLoad);
        OwnerActions.loadOwners(this.props.source);
    },

    componentWillUnmount: function(){
        this.unsubscribe();
    },

    onLoad: function(id) {
        this.props.onLoadOwner(id);
    },

    handleSelect: function(event) {
        this.props.onSelectOwner(event.target.value);
    },

    render: function(){
        var owners = OwnerStore.getOwners();
        var labelText = this.props.labelText;

        var nodes = owners.map(function (owner) {
            return <option key={owner.id} value={owner.id} >{owner.name}</option>
        });

        return (
            <form className="form-inline">
                <div className="form-group">
                    <label className="select-label">{labelText}</label>
                    <select className="form-control" value={this.props.currentlySelected} onChange={this.handleSelect}>
                        <option key={-1} value={-1} >{'全部'}</option>
                        {nodes}
                    </select>
                </div>
            </form>
        )
    }
});

module.exports = ItemOwners;
