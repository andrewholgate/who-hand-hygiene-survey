// Test Session start functionality.

var x = require( "casper" ).selectXPath;

casper.surveySession = function() {
    casper.test.begin( "Test Session creation", 13, function suite( test ) {
        casper.start( "http://localhost:8080/#/", function() {

            // Verify that the main content element is present.
            casper.waitForSelectorTextChange( "#content", function() {
                this.echo( "Homepage content is found." );

                // Verify the About page elements are present.
                test.assertExists( "#content h1", "Session page header is found." );
                test.assertVisible( "#content #session", "New Session button is visible." );
                test.assertNotVisible( "#content #survey", "Survey button is not visible." );
                test.assertNotVisible( "#content #session-end", "Survey button is not visible." );
                test.assertNotVisible( "#content #results",
                    "Survey results button is not visible." );

                this.waitForUrl( "http://localhost:8080/#/sessionstart", function then() {
                    this.test.pass( "Navigated to Session Start page", "INFO" );
                },
                function onTimeout() {
                    this.test.fail( "Failed to navigate to homepage", "ERROR" );
                } );
                this.click( "#content #session" );
            } );

            // Verify that the main content element is present.
            casper.waitForSelectorTextChange( "#content", function() {
                this.echo( "Session Start content is found." );

                test.assertElementCount( "#content input[type=radio]", 10,
                    "10 department are listed." );
                test.assertExists( "#content #start.disabled", "Start button is disabled." );

                // This would be a better test but does not work with the way Bootstrap handles
                // disabled links.
                // this.click( "#content #start" );
                // test.assertUrlMatch( "http://localhost:8080/#/sessionstart", "Start button is disabled." );

                // Using XPath as a workaround to https://github.com/n1k0/casperjs/issues/378
                // test.assertExists( "input[type=radio]:checked:nth-child(5)",
                // "Department is checked." );
                this.click( x( "(//label)[5]" ) );
                test.assertNotExists( "#content #start.disabled", "Start button is enabled." );
                this.click( "#content #start" );

                // Verify that the main content element is present.
                casper.waitForSelectorTextChange( "#content", function() {
                    this.echo( "Homepage content is found." );
                    test.assertVisible( "#content #survey", "Survey button is visible." );
                    test.assertNotVisible( "#content #session",
                        "New Session button is not visible." );
                    test.assertNotVisible( "#content #session-end",
                        "Survey End button is not visible." );
                    test.assertNotVisible( "#content #results", "Results button is not visible." );
                } );
            } );
        } );
        casper.run( function() {
            test.done();
        } );
    } );
};

casper.surveySession();
