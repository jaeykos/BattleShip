"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tile = void 0;
class Tile {
    constructor(row, col) {
        this.isHit = false;
        this.isMiss = false;
        this.isShot = false;
        this.isOccupied = false;
        this.isdf = false;
        this.coord = [row, col];
    }
}
exports.Tile = Tile;
