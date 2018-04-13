
const socket = io()

let myPeerConnection

function joinCall() {

        socket.emit( 'join_call' )

}

socket.on( 'in_call', () => {

        console.log( 'you just joined a call' )
        createCall()

} )

function createPeerConnection() {

        myPeerConnection = new RTCPeerConnection({
                iceServers: [     // Information about ICE servers - Use your own!
                {
                        urls: "turn:" + window.loaction.hostname,  // A TURN server
                        username: "webrtc",
                        credential: "turnserver"
                }
                ]
        })

}

function handleNegotiationNeededEvent() {

        myPeerConnection.createOffer().then( function( offer ) {

                return myPeerConnection.setLocalDescription( offer )

        } )
        .then( function() {

                sendToServer( {
                        name: myUsername,
                        target: targetUsername,
                        type: "video-offer",
                        sdp: myPeerConnection.localDescription
                } )

        } )
        .catch( reportError )

}

function createCall() {

        const mediaConstraints = {
                  audio: true,
                  video: true
        }

}

export default joinCall
export {
        socket
}
