define( [
    "jquery",
    "underscore",
    "backbone",
    "AppConfiguration",
    "form",
    "libs/text!templates/sessionstart.html"
], function( $, _, Backbone, AppConfiguration, form, sessionStartTpl ) {
    "use strict";

    return Backbone.View.extend( {
        el: "#content",
        template: sessionStartTpl,
        events: {
            "click .radio label": "radioCheck",
            "click #start": "start"
        },
        render: function() {
            this.$el.html( _.template( this.template ) );
            $( "#start" ).addClass( "disabled" );
        },
        radioCheck: function( e ) {
            this.radioChecked( e.currentTarget ) ;
            $( "#start" ).removeClass( "disabled" );
        },
        start: function() {
            var selected = $( "input[type='radio']:checked" );
            window.appConfig = new AppConfiguration( {
                id: "config",
                email: window.appConfig.attributes.email,
                language: window.appConfig.attributes.language,
                session: 1,
                department: selected.val()
            } );
            window.appConfig.save();
        }
    } );
} );
