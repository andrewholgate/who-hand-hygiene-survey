define( "AppRouter", [
    "backbone",
    "AboutView",
    "FooterView",
    "HeaderView",
    "HomeView",
    "SessionEndView",
    "SessionStartView",
    "SurveyView",
    "DeleteView",
    "SettingsView",
    "ResultsView"
], function(
    Backbone,
    AboutView,
    FooterView,
    HeaderView,
    HomeView,
    SessionEndView,
    SessionStartView,
    SurveyView,
    DeleteView,
    SettingsView,
    ResultsView
) {
    "use strict";

    return Backbone.Router.extend( {
        routes: {
            "": "home",
            "about": "about",
            "delete": "deleteSurveys",
            "results": "results",
            "settings": "settings",
            "sessionend": "sessionend",
            "sessionstart": "sessionstart",
            "survey": "survey",
            "*actions": "defaultRoute"
        },
        initialize: function() {
            new HeaderView().render();
            new FooterView().render();
        },
        about: function() {
            new AboutView().render();
        },
        deleteSurveys: function() {
            new DeleteView().render();
        },
        home: function() {
            new HomeView().render();
        },
        results: function() {
            new ResultsView().render();
        },
        settings: function() {
            new SettingsView().render();
        },
        sessionend: function() {
            new SessionEndView().render();
        },
        sessionstart: function() {
            new SessionStartView().render();
        },
        survey: function() {
            new SurveyView().render();
        }
    } );
} );
