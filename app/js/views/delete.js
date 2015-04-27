define( [
  "jquery",
  "underscore",
  "backbone",
  "AppConfiguration",
  "libs/text!templates/delete.html"
], function( $, _, Backbone, AppConfiguration, deleteTpl ) {
    "use strict";

    return Backbone.View.extend( {
        el: "#content",
        template: deleteTpl,
        events: {
            "click #results-delete": "deleteResults"
        },
        initialize: function() {
            this.$el.undelegate( "#results-delete", "click" );
        },
        render: function() {
            this.$el.html( _.template( this.template ) );
        },
        deleteResults: function() {
            window.surveys.fetch();

            // Destroy all surveys.
            // see: http://stackoverflow.com/questions/26207835/destroy-all-models-in-backbone-collection-persisted-in-local-storage
            _.invoke( window.surveys.toArray(), "destroy" );

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
