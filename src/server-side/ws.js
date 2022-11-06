"use strict";
exports.__esModule = true;
exports.initWs = void 0;
var state_1 = require("../state");
function initWs() {
    var currentState = state_1.state.getState();
    console.log("currentstate", currentState.rtdbRoomId);
    // Create WebSocket connection.
    var socket = new WebSocket('ws://localhost:8080');
    // Connection opened
    socket.addEventListener('open', function (event) {
        socket.send(currentState.rtdbRoomId);
    });
    // Listen for messages
    socket.addEventListener('message', function (event) {
        // convierto a json lo que me manda el WS
        var usefulJson = JSON.parse(event.data);
        // agrego el any para salvar el  "Property 'hasOwn' does not exist on type 'ObjectConstructor' "
        var boolean = Object.hasOwn(usefulJson, "messages");
        // hago esto porque la primera propiedad del objeto es owner y me estaba avisando en el eventlistener. sospecho que me iba a romper las bolas
        if (boolean == true) {
            // convierto el objeto en un array. el return el[1] es porque en la posicion 0 está el key del obj
            var messagesList = Object.entries(usefulJson.messages).map(function (el) { return el[1]; });
            // me quedo con la primera propiedad que es un objeto de objetos (idMensaje : {obj importante})
            currentState.messages = messagesList;
            state_1.state.setState(currentState);
        }
    });
    socket.onclose = function (event) {
        console.log('Chau amigo! ', event.reason);
    };
}
exports.initWs = initWs;
