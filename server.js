const express =	        require( 'express' ),
      http =            require( 'http' ),
      https =           require( 'https' ),
      http2 =	        require( 'http2' ),
      fs =	        require( 'fs' ),
      path =	        require( 'path' ),
      ejs =	        require( 'ejs' ),
      app =             express(),

      PORT =            process.env.PORT || 8000,
      HTTPS_PORT =      process.env.HTTPS_PORT || 8001,
      HTTP2_PORT =	process.env.HTTP2_PORT || 8002,

      http_server =     http.createServer( app ),
      https_server =    https.createServer( {
              key: fs.readFileSync( path.resolve( __dirname, './keys/key.pem' ) ),
              cert: fs.readFileSync( path.resolve( __dirname, './keys/cert.pem' ) ),
              passphrase: 'servin'
      }, app ),
      http2_server =	http2.createServer( {
	      //key: fs.readFileSync( path.resolve( __dirname, './keys/key.pem' ) ),
              //cert: fs.readFileSync( path.resolve( __dirname, './keys/cert.pem' ) ),
              //passphrase: 'servin'
      }, app ),
      io =              require( 'socket.io' )( http_server )

app.use( express.static( 'public' ) )
app.set( 'view engine', 'ejs' )
app.set( 'views', './views' )

app.get( '/', ( req, res ) => {

	console.log( 'ghello' )
	//res.send( 'hello' )
        res.render( 'index' )

} )

http2_server.on( 'error', err => console.error( err ) )

http2_server.on( 'stream', ( stream, headers ) => {

	console.log( 'stream' )

	stream.respond( {
		'content-type': 'text/html',
		'status': 200
	} )

	stream.end( '<h1>Hello World!!</h1>' )

} )

http_server.listen( PORT, err => console.log( `You can find me at http://localhost:${ PORT }` ) )
https_server.listen( HTTPS_PORT, err => console.log( `You can find me at https://localhost:${ HTTPS_PORT }` ) )
http2_server.listen( HTTP2_PORT, err => console.log( `You can find me at https://localhost:${ HTTP2_PORT }` ) )

io.on( 'connection', socket ) // Not a function yet