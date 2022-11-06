"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Welcome = void 0;
var router_1 = require("@vaadin/router");
var state_1 = require("../state");
var Welcome = /** @class */ (function (_super) {
    __extends(Welcome, _super);
    function Welcome() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Welcome.prototype.render = function () {
        var style = document.createElement("style");
        this.innerHTML = "\n        <form action=\"\" class=\"welcome__form\">\n            <div class=\"welcome__campo email\">\n                <label for=\"\" class=\"welcome__label\">Tu email</label>\n                <input type=\"text\" name=\"email\" class=\"welcome__input\" placeholder=\"ingresa tu e-mail aqui\">\n            </div>\n            <div class=\"welcome__campo nombre\">\n                <label for=\"\" class=\"welcome__label\">Tu nombre</label>\n                <input type=\"text\" name=\"nombre\" class=\"welcome__input\" placeholder=\"ingresa tu nombre aqui\">\n            </div>\n            <div class=\"welcome__campo opcionRoom\">\n                <label for=\"options\">Elegi una opcion:</label>\n                <select name=\"options\" id=\"\">\n                    <option value=\"room-nuevo\">Nuevo Room</option>\n                    <option value=\"room-existente\">Room existente</option>\n                </select>\n            </div>\n            <div class=\"welcome__campo roomid\">\n                <label for=\"\" class=\"welcome__label\">Ingresa un ID</label>\n                <input type=\"text\" name=\"roomId\" class=\"welcome__input\" placeholder=\"ingresa un id aqui\">\n            </div>\n            <button class=\"welcome__button\">Comenzar</button>\n        </form>\n        ";
    };
    Welcome.prototype.connectedCallback = function () {
        this.render();
        this.querySelector(".welcome__form").addEventListener("submit", function (e) {
            var currentState = state_1.state.getState();
            var target = e.target;
            e.preventDefault();
            currentState.nombre = target.nombre.value;
            currentState.email = target.email.value;
            if (target.options.value == "room-existente") {
                currentState.roomId = target.roomId.value;
            }
            state_1.state.initState();
            state_1.state.setState(currentState);
            setTimeout(function () {
                router_1.Router.go("/chatroom");
            }, 1250);
        });
    };
    return Welcome;
}(HTMLElement));
exports.Welcome = Welcome;
customElements.define("welcome-page", Welcome);
