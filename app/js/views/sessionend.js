define( [
    "jquery",
    "underscore",
    "backbone",
    "AppConfiguration",
    "libs/text!templates/sessionend.html"
], function( $, _, Backbone, AppConfiguration, sessionEndTpl ) {
    "use strict";

    return Backbone.View.extend( {
        el: "#content",
        template: sessionEndTpl,
        events: {
            "click #session-end": "sessionend"
        },
        render: function() {
            this.$el.html( _.template( this.template ) );
        },
        sessionend: function() {
            window.appConfig = new AppConfiguration( {
                id: "config",
                email: window.appConfig.attributes.email,
                language: window.appConfig.attributes.language,
                session: null,
                department: null
            } );
            window.appConfig.save();
        }
    } );
} );
