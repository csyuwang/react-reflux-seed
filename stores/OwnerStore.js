var Reflux = require('reflux');
var OwnerActions = require('../actions/OwnerActions');

var _owners = [];

var OwnerStore = Reflux.createStore({

    init: function() {
        this.listenTo(OwnerActions.loadOwners, this.load);
    },

    load: function(src) {
        $.ajax({
            url: src,
            dataType: 'json',
            cache: false,
            success: function(owners) {
                _owners = owners;
                this.trigger(-1);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(src, status, err.toString());
            }.bind(this)
        });
    },

    getOwners: function() {
        return _owners;
    }

});

module.exports = OwnerStore;