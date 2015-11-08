define([
    'jquery',
    'backbone'
], function($, Backbone) {
    return Backbone.Router.extend({
        routes : {
            '' : 'onInit'
        },
        onInit : function() {
            this.setView({
                name: 'GameView'
            });
            return this;
        },
        initialize : function() {
            Backbone.history.start();
            return this;
        },
        setView : function(options) {
            $.proxy(require(['script/views/'+options.name], function(View) {
                if (this.view) {
                    this.view.remove();
                }
                this.view = new View(options);
            }), this);
            return this;
        }
    });
});
