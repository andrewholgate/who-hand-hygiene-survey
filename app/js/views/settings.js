define( [
    "jquery",
    "underscore",
    "backbone",
    "AppConfiguration",
    "form",
    "libs/text!templates/settings.html"
], function( $, _, Backbone, AppConfiguration, form, settingsTpl ) {
    "use strict";

    return Backbone.View.extend( {
        el: "#content",
        template: settingsTpl,
        events: {
            "click #save-settings": "saveSettings"
        },
        initialize: function() {
            this.$el.undelegate( "#save-settings", "click" );
        },
        render: function() {
            var data = { email: window.appConfig.attributes.email };
            var template = _.template( this.template );
            this.$el.html( template( data ) );
        },
        saveSettings: function() {
            var email = $( "input[type='email']", "form" ).val();
            if ( this.emailValid( email ) ) {

                // see: http://stackoverflow.com/questions/7544503/backbone-js-saving-one-model-in-local-storage
                window.appConfig = new AppConfiguration( {
                    id: "config",
                    email: email,
                    language: window.appConfig.attributes.language,
                    session: window.appConfig.attributes.session,
                    department: window.appConfig.attributes.department
                } );
                window.appConfig.save();

                // @todo make this modal
                window.alert( "Email address saved." );
            } else {
                window.alert( "Email address not valid." );
            }
        },
        emailValid: function( email ) {

            // @note Regex is a bad solution to determine if it is a valid email address.
            var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return emailRegex.test( email );
        }
    } );
} );
