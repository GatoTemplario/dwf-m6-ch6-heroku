"use strict";
exports.__esModule = true;
exports.router = void 0;
var router_1 = require("@vaadin/router");
var router = new router_1.Router(document.querySelector(".root"));
exports.router = router;
router.setRoutes([
    { path: '/', component: 'welcome-page' },
    { path: "/chatroom", component: "chatroom-page" },
]);
