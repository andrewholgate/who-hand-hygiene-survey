define( "SurveySession", [
    "backbone",
    "localstorage"
], function( Backbone ) {
    "use strict";

    return Backbone.Collection.extend( {
        localStorage: new Backbone.LocalStorage( "survey-results" ),

        // Output Collection as array.
        parseArray: function() {
            var index = 0;
            var results = [];

            this.fetch();
            this.models.forEach( function( model ) {
                results[index] = model.get( 0 );
                index++;
            } );
            return results;
        }
    } );
} );
