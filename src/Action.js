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
            const tempTile = DOM_1.DOM.getTile(tempRow, tempCol, "placementTile");
            tempTile.classList.remove("placeHoverLegal", "animate-pulse");
            tempTile.classList.add("shipPlaced");
        }
    }
    static displayHint(player, numShipPlaced, selectedElement) {
        var _a;
        //clear all hints
        const placementTiles = (_a = document.getElementById("gameboardDiv")) === null || _a === void 0 ? void 0 : _a.children;
        for (const placementTile of placementTiles) {
            placementTile.classList.remove("placeHoverLegal", "animate-pulse");
            placementTile.classList.remove("placeHoverIllegal", "animate-pulse");
        }
        const selectedRow = DOM_1.DOM.getTileCoord(selectedElement)[0];
        const selectedCol = DOM_1.DOM.getTileCoord(selectedElement)[1];
        const tempShip = player.ships[numShipPlaced];
        let isLegal = true;
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
                isLegal = false;
                break;
            }
            else if (player.board[tempRow][tempCol].isOccupied) {
                isLegal = false;
                break;
            }
        }
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
            const tempTile = DOM_1.DOM.getTile(tempRow, tempCol, "placementTile");
            if (tempRow < 0 || tempRow > 9 || tempCol < 0 || tempCol > 9) {
                continue;
            }
            else {
                if (isLegal) {
                    tempTile.classList.add("placeHoverLegal", "animate-pulse");
                }
                else {
                    tempTile.classList.add("placeHoverIllegal", "animate-pulse");
                }
            }
        }
    }
    static loadBattle(player) {
        var _a, _b;
        (_a = document.getElementById("startMainDiv")) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
        (_b = document.getElementById("battleMainDiv")) === null || _b === void 0 ? void 0 : _b.classList.remove("hidden");
        DOM_1.DOM.fillGameboardDiv("playerBoardDiv", "playerTile");
        DOM_1.DOM.fillGameboardDiv("botBoardDiv", "botTile");
        //assign shipPlaced html class
        for (let tempRow = 0; tempRow < 10; tempRow++) {
            for (let tempCol = 0; tempCol < 10; tempCol++) {
                if (player.board[tempRow][tempCol].isShipPlaced) {
                    DOM_1.DOM.getTile(tempRow, tempCol, "playerTile").classList.add("playerShipPlaced");
                }
            }
        }
    }
    static botAttacks(attackReciever) {
        let randRow = Math.floor(Math.random() * 10);
        let randCol = Math.floor(Math.random() * 10);
        while (attackReciever.board[randRow][randCol].isShot == true) {
            randRow = Math.floor(Math.random() * 10);
            randCol = Math.floor(Math.random() * 10);
        }
        attackReciever.getShot(randRow, randCol);
        if (attackReciever.board[randRow][randCol].isHit) {
            DOM_1.DOM.getTile(randRow, randCol, "playerTile").classList.add("isHit");
        }
        else {
            DOM_1.DOM.getTile(randRow, randCol, "playerTile").classList.add("isMiss");
        }
        this.displaySunkShips(attackReciever, "playerTile");
    }
    static displaySunkShips(player, tileDivClassName) {
        const sunkShips = player.ships.filter((ship) => ship.isSunk == true);
        for (const sunkShip of sunkShips) {
            for (const tempCoord of sunkShip.coords)
                DOM_1.DOM.getTile(tempCoord[0], tempCoord[1], tileDivClassName).classList.add("isSunk");
        }
    }
    static playerAttacks(selectedElement, attackReciever) {
        const selectedCoord = DOM_1.DOM.getTileCoord(selectedElement);
        const selectedRow = selectedCoord[0];
        const selectedCol = selectedCoord[1];
        const selectedTile = attackReciever.board[selectedRow][selectedCol];
        selectedTile.isShot = true;
        attackReciever.getShot(selectedRow, selectedCol);
        if (selectedTile.isShipPlaced) {
            selectedTile.isHit = true;
            selectedElement.classList.add("isHit");
        }
        else {
            selectedTile.isMiss = true;
            selectedElement.classList.add("isMiss");
        }
        this.displaySunkShips(attackReciever, "botTile");
    }
    static restart(player, bot) {
        var _a, _b, _c;
        (_a = document.getElementById("resultMessage")) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
        (_b = document.getElementById("battleMainDiv")) === null || _b === void 0 ? void 0 : _b.classList.add("hidden");
        (_c = document.getElementById("startMainDiv")) === null || _c === void 0 ? void 0 : _c.classList.remove("hidden");
        DOM_1.DOM.clearGameboardDiv("gameboardDiv");
        DOM_1.DOM.clearGameboardDiv("playerBoardDiv");
        DOM_1.DOM.clearGameboardDiv("botBoardDiv");
        DOM_1.DOM.fillGameboardDiv("gameboardDiv", "placementTile");
        player.resetPlayer();
        bot.resetPlayer();
    }
}
exports.Action = Action;
