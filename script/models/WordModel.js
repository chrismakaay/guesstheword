define([
    'backbone'
], function(Backbone) {
    return Backbone.Model.extend({
        defaults : {
            word      : '',
            points    : 0,
            isMatched : false
        },

        /**
         * Default init method which is called when the model is first created
         *
         * @method  initialize
         * @returns {exports.initialize}
         */
        initialize : function() {
            this.set({
                points : this.getUniqueCharNumber(this.get('word'))
            });
        },

        /**
         * Gets the number of the unique letters in the given word
         *
         * @method  getUniqueCharNumber
         * @param   {string} text    The string of the word
         * @returns {number}         The number of the unique letters
         */
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
