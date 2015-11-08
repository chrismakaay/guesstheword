define([
    'backbone'
], function(Backbone) {
    return Backbone.Model.extend({
        defaults : {
            word      : '',
            points    : 0,
            isMatched : false
        },
        setWord : function(text) {
            this.set({
                word : text
            });
        }
    });
});
