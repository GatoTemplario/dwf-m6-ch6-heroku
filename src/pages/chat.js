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
exports.ChatRoom = void 0;
var state_1 = require("../state");
var ChatRoom = /** @class */ (function (_super) {
    __extends(ChatRoom, _super);
    function ChatRoom() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.messages = [];
        _this.roomId = "";
        return _this;
    }
    ChatRoom.prototype.connectedCallback = function () {
        var _this = this;
        state_1.state.suscribe(function () {
            var currentState = state_1.state.getState();
            _this.messages = currentState.messages;
            console.log("render!");
            _this.render();
        });
        state_1.state.suscribe(function () {
            var currentState = state_1.state.getState();
            _this.roomId = currentState.roomId;
            _this.render();
        });
        this.render();
    };
    ChatRoom.prototype.render = function () {
        // const currentState = state.getState()
        this.innerHTML = "\n            <h1 class=\"chatroom__title\">Chat</h1>\n            <h2 class=\"chatroom__roomId\">room id: ".concat(this.roomId, "</h2>\n            <div class=\"chatroom__container-messages\">\n                ").concat(this.messages.map(function (m) {
            return " <div class=\"message\"> ".concat(m.from, ":").concat(m.message, " </div> ");
        }).join(""), "\n            </div>\n            <form class=\"chatroom__form\">\n                <input class=\"chatroom__input\" placeholder=\"escribe un mensaje\" name=\"new-message\"></input>\n                <button class=\"chatroom__button\" name=\"\">Enviar</button>\n            </form>\n        ");
        this.querySelector(".chatroom__form").addEventListener("submit", function (e) {
            e.preventDefault();
            var target = e.target;
            // console.log("nuew message", target["new-message"].value);
            state_1.state.pushMessages(target["new-message"].value);
        });
    };
    return ChatRoom;
}(HTMLElement));
exports.ChatRoom = ChatRoom;
customElements.define("chatroom-page", ChatRoom);
