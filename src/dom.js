"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dom = void 0;
class dom {
    static placeShipHover() { }
    static selectTile(row, col) {
        const n = 10 * row + col + 1;
        return (document.querySelector(".tile:nth-child(" + n + ")"));
    }
    static getTileCoord(tileElement) {
        const parent = tileElement.parentNode;
        if (parent != null) {
            const index = Array.prototype.indexOf.call(parent.children, tileElement);
            const row = Math.floor(index / 10);
            const col = index % 10;
            return [row, col];
        }
        else {
            return [];
        }
    }
}
exports.dom = dom;
