define( [
    "underscore",
    "backbone",
    "libs/text!templates/about.html"
], function( _, Backbone, aboutTpl ) {
    "use strict";

    return Backbone.View.extend( {
        el: "#content",
        template: aboutTpl,
        render: function() {
            var data = { version: window.VERSION };
            var template = _.template( this.template );
            this.$el.html( template( data ) );
        }
    } );
} );
