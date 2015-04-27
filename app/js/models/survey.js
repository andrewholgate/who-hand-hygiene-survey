define( "Survey", [
    "backbone",
    "localstorage"
], function( Backbone ) {
    "use strict";

    return Backbone.Model.extend( {
        initialize: function( results ) {
            return {
                content: results[0]
            };
        }
    } );
} );
