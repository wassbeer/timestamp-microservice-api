app = require( "express" )();
moment = require( "moment" );
fs = require( "fs" );

app.set( "views", "./views" );
app.set( "view engine", "pug" );

app.get( "/", function( req, res ) {
	res.render( "index" );
} );

app.get( "/:potentialdate", function( req, res ) {
	let potentialDate = req.params.potentialdate.replace( /[.\/#!$%\^&\*;:{}=\-_`~()]/g, "" );
	if ( moment( potentialDate ).isValid() ) { // if url params contain natural language date
		res.json( {
			unix: moment( potentialDate ).unix(),
			natural: potentialDate
		} );
	} else if ( moment.unix( potentialDate ).isValid() ) { // if url params contain unix code date
		res.json( {
			unix: potentialDate,
			natural: moment.unix( potentialDate ).format( "DD-MM-YYYY" )
		} );
	} else { // if url params contain neither a natural language nor a unix code date
		res.json( {
			unix: null,
			natural: null
		} );
	}
} );

app.listen( 3002, function( res ) {
	console.log( "App listening on port 3002" )
} );