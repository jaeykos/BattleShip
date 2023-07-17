"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ship = void 0;
const directions_1 = require("./directions");
class Ship {
    constructor() {
        this.startCoord = [];
        this.coords = [];
        this.span = 0;
        this.hitCoords = [];
        this.isHit = false;
        this.isSunk = false;
        this.direction = directions_1.directions.notSet;
    }
    setSpanAndDirection(span, direction) {
        this.span = span;
        this.direction = direction;
    }
}
exports.Ship = Ship;
