var extend = require('node.extend');
var Logger = require('./logger');

function Request(connection, data) {
    this.connection = connection;
    this.data = data;

    this.info('request.received:', this.data.id, this.data.method);
}

Request.prototype = extend({}, Logger, {

    reply: function(result) {

        var reply = JSON.stringify({
            id: this.data.id,
            error: null,
            result: result,
        });

        this.debug('request.reply', reply);
        this.connection.send(reply);

    },

    send: function(data) {
        this.debug('request.send', data);
        this.connection.send(JSON.stringify(data));
    },

    sendNotification: function(method, params) {

        var msg = {
            method: method,
            params: params
        };

        this.send(msg);


    }

});

module.exports = Request;
