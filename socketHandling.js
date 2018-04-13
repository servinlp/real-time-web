

function s( socket ) {

        console.log( 'conntected' )

        socket.on( 'join_call', () => {

                socket.join( 'call' )
                socket.emit( 'in_call' )
                console.log( 'your in a call' )

        } )
}

module.exports = s
