/**
 * Created by yu on 2016/4/11.
 */

var Reflux = require('reflux');

var ItemActions = Reflux.createActions([
    'createItem',
    'editItem',
    'loadItems'
]);

module.exports = ItemActions;