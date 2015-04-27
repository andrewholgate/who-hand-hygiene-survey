define( [
    "underscore",
    "backbone",
    "libs/text!templates/footer.html"
], function( _, Backbone, footerTpl ) {
    "use strict";

    return Backbone.View.extend( {
        el: "footer",
        template: footerTpl,
        render: function() {
            var data = { version: window.VERSION };
            var template = _.template( this.template );
            this.$el.html( template( data ) );
        }
    } );
} );
