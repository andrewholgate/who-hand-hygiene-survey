// Test page structural elements.
casper.pageStructure = function() {
    casper.test.begin( "Test Content, Header and Footer structure", 7, function suite( test ) {
        casper.start( "http://localhost:8080", function() {

            // Verify that the main content element is present.
            test.assertExists( "#content", "Content container is found." );
            casper.waitForSelectorTextChange( "header", function() {
                this.echo( "Site header is found." );

                // Verify that the header elements are present.
                test.assertExists( "#content h1", "Homepage header text is found." );
                test.assertExists( "header a.navbar-brand", "Home link is found." );
                test.assertExists( "header .navbar-right a#about", "About link is found." );
                test.assertExists( "header .navbar-right a#settings", "Settings link is found." );
            } );
            casper.waitForSelectorTextChange( "footer", function() {
                this.echo( "Site footer is found." );

                // Verify that the footer text is present.
                test.assertExists( "footer #author", "Author text is found." );
                test.assertExists( "footer #version", "Version text is found." );
            } );
    } );
    casper.run( function() {
        test.done();
    } );
  } );
};

casper.pageStructure();
