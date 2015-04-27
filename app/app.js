require.config({
    paths: {
        jquery: "libs/jquery",
        Survey: "js/models/survey",
        SurveySession: "js/collections/session",
        AppConfiguration: "js/models/config",
        underscore: "libs/underscore",
        backbone: "libs/backbone",
        localstorage: "libs/backbone.localStorage",
        text: "libs/text",
        AppRouter: "js/router/router",
        form: "js/form",
        HeaderView: "js/views/header",
        FooterView: "js/views/footer",
        HomeView: "js/views/home",
        SurveyView: "js/views/survey",
        AboutView: "js/views/about",
        SessionEndView: "js/views/sessionend",
        SessionStartView: "js/views/sessionstart",
        DeleteView: "js/views/delete",
        SettingsView: "js/views/settings",
        ResultsView: "js/views/results"
    }
});

require([
    "SurveySession", "AppConfiguration", "AppRouter"
], function(SurveySession, AppConfiguration, AppRouter) {

    window.VERSION = "v0.9.0";
    window.surveys = new SurveySession();
    window.appConfig = new AppConfiguration({id: "config"});
    window.appConfig.fetch();

    app = new AppRouter();
    Backbone.history.start();
});
