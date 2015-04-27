define( "AppConfiguration", [
    "backbone",
    "localstorage"
], function( Backbone ) {
    "use strict";

    return Backbone.Model.extend( {
        localStorage: new Backbone.LocalStorage( "configuration" ),
        defaults: {
            email: null,
            language: "en",
            session: null,
            department: null
        }
    } );
} );
