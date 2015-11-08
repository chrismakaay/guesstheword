define([
    'backbone'
], function(Backbone) {
    return Backbone.Model.extend({
        defaults : {
            word      : '',
            points    : 0,
            isMatched : false
        },
        initialize : function() {
            this.set({
                points : this.getUniqueCharNumber(this.get('word'))
            });
        },
        getUniqueCharNumber : function(text) {
            var letters = '';
            for (var i=0; i < text.length; i++) {
                if (letters.indexOf(text[i]) === -1) {
                    letters += text[i];
                }
            }
            return letters.length;
        }
    });
});
