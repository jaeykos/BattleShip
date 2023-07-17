"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.directions = void 0;
var directions;
(function (directions) {
    directions[directions["x"] = 0] = "x";
    directions[directions["y"] = 1] = "y";
    directions[directions["notSet"] = 2] = "notSet";
})(directions || (directions = {}));
exports.directions = directions;
