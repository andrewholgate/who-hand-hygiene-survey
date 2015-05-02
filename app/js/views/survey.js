define( [
    "jquery",
    "underscore",
    "backbone",
    "SurveySession",
    "Survey",
    "form",
    "libs/text!templates/survey.html"
], function( $, _, Backbone, SurveySession, Survey, form, surveyTpl ) {
    "use strict";

    return Backbone.View.extend( {
        el: "#content",
        template: surveyTpl,
        events: {
            "click .radio label": "radioCheck",
            "click #nav-next": "navNext",
            "click #nav-previous": "navPrevious",
            "click #save-previous": "navPrevious",
            "click #nav-previous, #nav-next": "nav",
            "click #save-survey": "saveSurvey"
        },
        initialize: function() {

            // Must undelegate these or else it triggers multiple events.
            this.$el.undelegate( "#save-survey", "click" );
            this.$el.undelegate( "#nav-next", "click" );
            this.$el.undelegate( "#nav-previous", "click" );
            this.$el.undelegate( "#save-previous", "click" );
        },
        render: function() {
            this.$el.html( _.template( this.template ) );

            // Set to only display the current step in the form.
            $( "form" ).find( ".step" ).hide();
            $( "form" ).find( ".step:first" ).show();
            $( "#nav-previous" ).hide();
        },
        radioCheck: function( e ) {
            this.radioChecked( e.currentTarget );
            this.nextEnable( $( "div" ).find( ".step:visible" ) );
        },
        /**
         * Enable "Next" navigation only once a radio is selected.
         *
         * @param int step
         *   Step in survey form to determine if navigation is active.
         */
        nextEnable: function( step ) {
            if ( $( step ).find( ".form-group .checked" ).length ) {
                $( "#nav-next" ).removeClass( "disabled" );
            } else {
                $( "#nav-next" ).addClass( "disabled" );
            }
        },

        // Handle displaying of step in form.
        navNext: function() {
            var stepCurrent = $( "form" ).find( ".step:visible" );
            var stepNext = $( stepCurrent ).next( ".step" );
            if ( stepNext.length > 0 ) {
                stepCurrent.hide();
                stepNext.show();
                $( "#nav-previous" ).show();
            }
            this.nextEnable( stepNext );

            // If last step, show results table.
            if ( $( stepNext ).next().length === 0 ) {
                $( "#nav-previous" ).hide();
                $( "#nav-next" ).hide();

                var results = this.formResults();
                var rowsRendered = this.rowsRender( results );
                $( "tbody" ).find( "tr" ).remove();
                $( "tbody" ).append( rowsRendered );
            }
        },
        navPrevious: function() {
            var stepCurrent = $( "form" ).find( ".step:visible" );
            var stepPrevious = $( stepCurrent ).prev( ".step" );
            if ( stepPrevious ) {
                stepCurrent.hide();
                stepPrevious.show();
                $( "#nav-next" ).show();
            }
            if ( $( stepPrevious ).prev().length === 0 ) {
                $( "#nav-previous" ).hide();
            } else {
                $( "#nav-previous" ).show();
            }
            this.nextEnable( stepPrevious );
        },
        saveSurvey: function() {

            // Fix for IE8, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString#Polyfill
            if ( !Date.prototype.toISOString ) {
                ( function() {
                    function pad( number ) {
                        if ( number < 10 ) {
                            return "0" + number;
                        }
                        return number;
                    }
                    Date.prototype.toISOString = function() {
                      return this.getUTCFullYear() +
                        "-" + pad( this.getUTCMonth() + 1 ) +
                        "-" + pad( this.getUTCDate() ) +
                        "T" + pad( this.getUTCHours() ) +
                        ":" + pad( this.getUTCMinutes() ) +
                        ":" + pad( this.getUTCSeconds() ) +
                        "." + ( this.getUTCMilliseconds() / 1000 ).toFixed( 3 ).slice( 2, 5 ) +
                        "Z";
                    };
                }() );
            }

            var results = this.formResults();

            // Add a date to the results.
            var date = new Date();
            results[0].push( date.toISOString() );
            this.resultsSave( results );
        },

        // Get the current survey results from the form.
        formResults: function() {
            var results = [ [ [] ] ];

            $.each( $( "form .step" ), function( index ) {
                var selected = $( "input[type='radio']:checked", this );
                if ( selected.length > 0 ) {
                    results[0][index] = selected.val();
                }
            } );
            return results;
        },
        resultsSave: function( results ) {

            // @todo this can be changed?
            var surveys = new SurveySession();
            surveys.fetch();
            var survey = new Survey( results );
            surveys.add( survey );
            survey.save();
        }
    } );
} );
