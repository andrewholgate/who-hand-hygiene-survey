define( [
    "jquery",
    "underscore",
    "backbone",
    "libs/text!templates/home.html"
], function( $, _, Backbone, homeTpl ) {
    "use strict";

    return Backbone.View.extend( {
        el: "#content",
        template: homeTpl,
        render: function() {

            var surveys = window.surveys;
            var appConfig = window.appConfig;
            var elapsedTime = "";

            surveys.fetch();
            if ( surveys.length > 1 ) {
                var firstResult = surveys.models[ 0 ].get( 0 );
                var lastResult = surveys.models[ surveys.models.length - 1 ].get( 0 );
                var firstResultDate = new Date( firstResult[ firstResult.length - 1 ] );
                var lastResultDate = new Date( lastResult[ lastResult.length - 1 ] );
                elapsedTime = Math.ceil( ( lastResultDate - firstResultDate ) / ( 60 * 1000 ) );

                if ( appConfig.attributes.session !== null ) {
                    elapsedTime = "<p>Time between first and last survey: " + elapsedTime +
                        " minutes</p>";
                } else {
                    elapsedTime = "<p>Total survey time: " + elapsedTime + " minutes</p>";
                }
            }

            var template = _.template( this.template );
            this.$el.html( template( { elapsed: elapsedTime } ) );

            $( ".form-group a" ).hide();
            if ( appConfig.attributes.session === null && surveys.length === 0 ) {
                $( "#session" ).show();
            } else if ( appConfig.attributes.session !== null && surveys.length > 0 ) {
                $( "#survey, #session-end, #results" ).show();
            } else if ( appConfig.attributes.session !== null && surveys.length === 0 ) {
                $( "#survey" ).show();
            } else if ( appConfig.attributes.session === null && surveys.length > 0 ) {
                $( "#results" ).show();
            }
        }
    } );
} );
