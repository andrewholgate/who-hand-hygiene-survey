// Test About page.
casper.pageAbout = function() {
    casper.test.begin( "Test About page", 2, function suite( test ) {
        casper.start( "http://localhost:8080/#/about", function() {

            // Verify that the main content element is present.
            casper.waitForSelectorTextChange( "#content", function() {
                this.echo( "About page content is found." );

                // Verify the About page elements are present.
                test.assertExists( "#content h1", "About page header is found." );
                test.assertExists( "#content p", "About content is found." );
            } );
    } );
    casper.run( function() {
        test.done();
    } );
  } );
};

casper.pageAbout();
