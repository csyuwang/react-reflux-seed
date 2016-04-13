var React = require('react');
require('react-dom');

var ItemStore = require('../../stores/ItemStore.js');

var ItemDetail = React.createClass({

    getInitialState: function(){
        return ItemStore.getNewItem();
    },

    handleChange: function(key, event) {
        var obj = {};
        obj[key] = event.target.value;
        this.setState(obj);
    },

    handleSave: function(){
        var item = {};
        for(var key in ItemStore.getNewItem()) {
            item[key] = this.state[key];
        }
        this.props.onSave(item);
        if(!item.id) {
            this.refs.name.focus();
            this.setState(ItemStore.getNewItem());
        }

    },

    componentWillReceiveProps: function(nextProps) {
        var item = nextProps.item;
        this.setState(item);
    },

    render: function(){

        var item = this.props.item;
        var self = this;

        var fieldNodes = Object.getOwnPropertyNames(item).map(function (key) {
            if(key === 'id') return;
            return (
                <div key={key} className="form-group">
                    <label for={key} className="col-sm-2 control-label">{key}</label>
                    <div className="col-sm-4">
                        <input type="text" className="form-control" id={key} placeholder={key} ref={key}
                               value={self.state[key]} onChange={self.handleChange.bind(self,key)}/>
                    </div>
                </div>
            )
        });

        return (
            <div>
                <div className="content-details">
                    <form className="form-horizontal">
                        {fieldNodes}
                    </form>
                </div>
                <button type="button" className="save-button" onClick={this.handleSave}>保存</button>
            </div>
        )
    }
});

module.exports = ItemDetail;