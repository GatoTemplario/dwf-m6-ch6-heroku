"use strict";
exports.__esModule = true;
exports.state = void 0;
var ws_1 = require("./server-side/ws");
var API_BASE_URL = "http://localhost:";
var PORT = 3000;
var state = {
    data: {
        nombre: "",
        messages: [],
        userId: "",
        roomId: "",
        rtdbRoomId: ""
    },
    listeners: [],
    initState: function () {
        // aqui pienso que deberia haber algun metodo o funcion que consiga los mensajes de rtdb y los meta en messages. y de algun modo usar la autentificacion que hice
        console.log("initstate");
        this.auth();
    },
    getState: function () {
        return this.data;
    },
    setState: function (newState) {
        this.data = newState;
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var cb = _a[_i];
            cb(newState);
        }
        console.log("state cambio!", this.data);
    },
    suscribe: function (callback) {
        this.listeners.push(callback);
    },
    pushMessages: function (newMessage) {
        var nombreDelUser = this.data.nombre;
        var currentState = this.getState();
        fetch(API_BASE_URL + PORT + "/rooms/" + currentState.rtdbRoomId, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                from: nombreDelUser,
                message: newMessage
            })
        });
    },
    auth: function () {
        var _this = this;
        var currentState = state.getState();
        fetch(API_BASE_URL + PORT + '/auth', {
            method: "POST",
            headers: { "content-type": 'application/json' },
            body: JSON.stringify({ email: currentState.email })
        })
            .then(function (res) { return res.json(); })
            .then(function (responseData) {
            // AQUI DEBERIA IR EL IF( EXISTE) =>
            currentState.userId = responseData.id;
            _this.setState(currentState);
        })
            .then(function () { _this.chatRoomHandler(); });
        //  FALTA AGREGAR QUE PASA CUANDO NO TENES EL MAIL COSO
    },
    chatRoomHandler: function () {
        var _this = this;
        var currentState = state.getState();
        if (currentState.roomId !== "") {
            // si puso un Id Corto
            console.log("id corto!");
            fetch(API_BASE_URL + PORT + '/rooms/' + currentState.roomId, {
                method: "GET",
                headers: { "content-type": 'application/json' }
            })
                .then(function (res) { return res.json(); })
                .then(function (response) {
                var newCurrentState = Object.assign(currentState, response.data);
                console.log("responda.data", response.data);
                console.log("newcurrentstate", newCurrentState);
                _this.setState(newCurrentState);
            })
                .then(function () {
                (0, ws_1.initWs)();
            });
        }
        else {
            // si NO puso un Id Corto, es porque no tiene y hay que crear uno nuevo
            console.log("SIN id corto!");
            fetch(API_BASE_URL + PORT + '/rooms', {
                method: "POST",
                headers: { "content-type": 'application/json' },
                body: JSON.stringify({ userId: currentState.userId })
            })
                .then(function (res) { return res.json(); })
                .then(function (response) {
                var newCurrentState = Object.assign(currentState, response);
                _this.setState(newCurrentState);
            })
                .then(function () {
                (0, ws_1.initWs)();
            });
        }
    }
};
exports.state = state;
