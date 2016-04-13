var React = require('react');

var Item = React.createClass({

    handleEdit: function(id, event){
        event.preventDefault();
        this.props.onEdit(id);
        this.props.onSelect(id);
    },

    render: function(){
        var item = this.props.item;

        var activeClass = this.props.active ? 'active' : null;

        return (
            <a href="#" className={'item ' + activeClass} onClick={this.handleEdit.bind(null, item.id)}>{item.name}</a>
        )
    }
});

module.exports = Item;
