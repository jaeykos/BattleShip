"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ship = void 0;
const directions_1 = require("./directions");
class Ship {
    constructor(span) {
        this.startCoord = [];
        this.coords = [];
        this.span = 0;
        this.hitCoords = [];
        this.isHit = false;
        this.isSunk = false;
        this.isPlaced = false;
        this.direction = directions_1.directions.x;
        this.span = span;
    }
    setDirection(direction) {
        this.direction = direction;
    }
    switchDirection() {
        if (this.direction == directions_1.directions.x) {
            this.direction = directions_1.directions.y;
        }
        else {
            this.direction = directions_1.directions.x;
        }
    }
}
exports.Ship = Ship;
