// Test About page.

casper.pageSettings = function() {
    casper.test.begin( "Test Settings page configurations", 8, function suite( test ) {
        casper.start( "http://localhost:8080/#/settings", function() {

            // Verify that the main content element is present.
            casper.waitForSelectorTextChange( "#content", function() {
                this.echo( "Settings page content is found." );

                // Verify that the Settings page elements are present.
                test.assertExists( "#content h1", "Settings page header is found." );
                test.assertExists( "input#email-address", "Email address input is found." );
                test.assertField( "input#email-address", null );
                test.assertExists( "select#language:disabled",
                    "Language input is found and disabled." );

                // Verify buttons are present.
                test.assertVisible( "a#cancel", "Cancel button is visible." );
                test.assertVisible( "a#save-settings", "Save button is visible." );

                // Verify saving valid email address.
                function testAlertSuccess( message ) {
                    this.echo( message );
                    this.test.assertMatch( message, /Email address saved\./ );
                }
                casper.then( function() {
                    this.on( "remote.alert", testAlertSuccess );
                } );
                casper.then( function() {
                    this.sendKeys( "input#email-address", "andrewholgate@example.com" );
                    this.click( "a#save-settings" );
                } );
                casper.then( function() {
                    this.removeListener( "remote.alert", testAlertSuccess );
                } );

                // Verify saving invalid email address.
                function testAlertFail( message ) {
                    this.echo( message );
                    this.test.assertMatch( message, /Email address not valid\./ );
                }
                casper.then( function() {
                    this.on( "remote.alert", testAlertFail );
                } );
                casper.then( function() {
                    this.sendKeys( "input#email-address", "andrewholgate@example" );
                    this.click( "a#save-settings" );
                } );
                casper.then( function() {
                    this.removeListener( "remote.alert", testAlertFail );
                } );
            } );
        } );
        casper.run( function() {
            test.done();
        } );
    } );
};

casper.pageSettingsCancel = function() {
    casper.test.begin( "Test Settings page cancel", 1, function suite( test ) {
        casper.start( "http://localhost:8080/#/settings", function() {

            // Verify that the main content element is present.
            casper.waitForSelectorTextChange( "#content", function() {
                this.echo( "Settings page content is found." );

                this.waitForUrl( "http://localhost:8080/#/", function then() {
                    this.test.pass( "Navigated to homepage", "INFO" );
                },
                function onTimeout() {
                    this.test.fail( "Failed to navigate to homepage", "ERROR" );
                } );
                this.click( "a#cancel" );

            } );
        } );
        casper.run( function() {
            test.done();
        } );
    } );
};

casper.pageSettings();
casper.pageSettingsCancel();
