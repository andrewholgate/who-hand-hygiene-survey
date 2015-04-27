define( "form", [
    "jquery",
    "underscore",
    "backbone"
], function( $, _, Backbone ) {
    "use strict";

    _.extend( Backbone.View.prototype, {
        rowsRender: function( results ) {
            var output = "";
            if ( results.length > 0 ) {
                $.each( results, function( index, values ) {
                    output += '<tr><th scope="row">' + ( index + 1 ) + "</th>";
                    $.each( values, function( key, value ) {
                        output += "<td>" + value + "</td>";
                    } );
                    output += "</tr>";
                } );
            } else {

                // @todo The colspan should be dynamic, based on number of steps + 1.
                output = '<tr><td colspan="4">No results. Start a new survey to gather results.' +
                    "</td></tr>";
            }
            return output;
        },
        radioChecked: function( target ) {
            $( target ).parents( ".button-group" ).find( "label.checked" ).removeClass( "checked" );

            // While the radio should be checked automatically, enforce this.
            $( target ).next( "input" ).prop( "checked", true );
            $( target ).addClass( "checked" );
        }
    } );
} );
