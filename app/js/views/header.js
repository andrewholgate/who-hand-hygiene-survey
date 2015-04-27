define( [
    "jquery",
    "underscore",
    "backbone",
    "libs/text!templates/header.html"
], function( $, _, Backbone, headerTpl ) {
    "use strict";

    return Backbone.View.extend( {
        el: "header",
        template: headerTpl,
        events: {
            "click .navbar-toggle": "menuToggle",
            "click #navbar-collapse li": "menuLink"
        },
        initialize: function() {
        },
        render: function() {
            this.$el.html( _.template( this.template ) );
        },
        menuToggle: function() {
            $( "#navbar-collapse" ).toggleClass( "collapse" );
        },
        menuLink: function() {
            $( "#navbar-collapse" ).addClass( "collapse" );
        }
    } );
} );
