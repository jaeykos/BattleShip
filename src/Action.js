"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = void 0;
const DOM_1 = require("./DOM");
const directions_1 = require("./directions");
class Action {
    static hoverWithShip() { }
    static placeNextShip(player, numShipPlaced, selectedElement) {
        const selectedRow = DOM_1.DOM.getTileCoord(selectedElement)[0];
        const selectedCol = DOM_1.DOM.getTileCoord(selectedElement)[1];
        player.placeShip(player.ships[numShipPlaced], selectedRow, selectedCol);
        const tempShip = player.ships[numShipPlaced];
        for (let i = 0; i < tempShip.span; i++) {
            let tempRow, tempCol;
            if (tempShip.direction == directions_1.directions.x) {
                tempCol = selectedCol + i;
                tempRow = selectedRow;
            }
            else {
                tempRow = selectedRow + i;
                tempCol = selectedCol;
            }
            const tempTile = DOM_1.DOM.getTile(tempRow, tempCol);
            tempTile.classList.remove("placeHoverLegal");
            tempTile.classList.add("shipPlaced");
        }
    }
    static displayHint(player, numShipPlaced, selectedElement) {
        //clear all hints
        const placementTiles = document.querySelectorAll(".placementTile");
        for (const placementTile of placementTiles) {
            placementTile.classList.remove("placeHoverLegal");
            placementTile.classList.remove("placeHoverIllegal");
        }
        const selectedRow = DOM_1.DOM.getTileCoord(selectedElement)[0];
        const selectedCol = DOM_1.DOM.getTileCoord(selectedElement)[1];
        const tempShip = player.ships[numShipPlaced];
        for (let i = 0; i < tempShip.span; i++) {
            let tempRow, tempCol;
            if (tempShip.direction == directions_1.directions.x) {
                tempCol = selectedCol + i;
                tempRow = selectedRow;
            }
            else {
                tempRow = selectedRow + i;
                tempCol = selectedCol;
            }
            if (tempRow < 0 || tempRow > 9 || tempCol < 0 || tempCol > 9) {
                continue;
            }
            else if (player.board[tempRow][tempCol].isOccupied) {
                const tempTile = DOM_1.DOM.getTile(tempRow, tempCol);
                tempTile.classList.add("placeHoverIllegal");
            }
            else {
                const tempTile = DOM_1.DOM.getTile(tempRow, tempCol);
                tempTile.classList.add("placeHoverLegal");
            }
        }
    }
}
exports.Action = Action;
