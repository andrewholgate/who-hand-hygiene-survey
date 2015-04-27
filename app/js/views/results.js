define( [
    "jquery",
    "underscore",
    "backbone",
    "form",
    "libs/text!templates/results.html"
], function( $, _, Backbone, form, resultsTpl ) {
    "use strict";

    return Backbone.View.extend( {
        el: "#content",
        template: resultsTpl,
        render: function() {
            var rows = "";
            var results = window.surveys.parseArray();
            var resultsMailAction = "#/settings";
            var csvMailto = null;
            var emailButton = "Configure Email";

            if ( results.length > 0 ) {
                var header = "Professional%20Category,Opportunity,Hand%20Hygiene%20Action," +
                    "Date%20(GMT)";
                csvMailto = this.arraysToCsv( results, header, "%0D%0A" );
                resultsMailAction = "mailto:" + window.appConfig.attributes.email +
                    "?subject=Hand%20Hygiene%20Survey%20Results&body=" + csvMailto;
            }
            if ( window.appConfig.attributes.email !== null ) {
                emailButton = "Email Results";
            } else {
                resultsMailAction = "#/settings";
            }

            // Render all rows everytime.
            rows = this.rowsRender( results );

            var data = {
                tableRows: rows,
                emailBtn: emailButton,
                emailAction: resultsMailAction,

                // @todo This should not go over 2000 characters to be safe.
                // http://stackoverflow.com/questions/417142/what-is-the-maximum-length-of-a-url-in-different-browsers
                // @see http://stackoverflow.com/questions/4639372/export-to-csv-in-jquery
                download: "data:application/csv;charset=utf-8," + csvMailto
            };

            var template = _.template( this.template );
            this.$el.html( template( data ) );

            // Set button visibility and if disabled or not.
            if ( results.length === 0 ) {
                $( "#download, #delete" ).addClass( "disabled" );
                if ( window.appConfig.attributes.email !== null ) {
                    $( "#email" ).addClass( "disabled" );
                }
            }

            $( ".form-group a" ).show();
            if ( window.appConfig.attributes.session !== null ) {
                $( "#download, #delete, #email" ).hide();
            } else {
                $( "#survey" ).hide();
            }
        },
        arraysToCsv: function( results, header, eol ) {
            var csv = header + "," + eol;
            $.each( results, function( key, result ) {
                csv += result.join() + "," + eol;
            } );
            return csv;
        }
    } );
} );
