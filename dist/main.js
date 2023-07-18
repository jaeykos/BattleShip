/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Action.js":
/*!***********************!*\
  !*** ./src/Action.js ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Action = void 0;
const DOM_1 = __webpack_require__(/*! ./DOM */ "./src/DOM.js");
const directions_1 = __webpack_require__(/*! ./directions */ "./src/directions.js");
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


/***/ }),

/***/ "./src/Bot.js":
/*!********************!*\
  !*** ./src/Bot.js ***!
  \********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Bot = void 0;
const Player_1 = __webpack_require__(/*! ./Player */ "./src/Player.js");
class Bot extends Player_1.Player {
    autoPlaceShips() {
        let numShipPlaced = 0;
        do {
            const shipToPlace = this.ships[numShipPlaced];
            if (shipToPlace.isPlaced == false) {
                //generate random direction start coordinate
                const randRow = Math.floor(Math.random() * 10);
                const randCol = Math.floor(Math.random() * 10);
                const randDirInd = Math.floor(Math.random() * 2);
                shipToPlace.setDirection(randDirInd);
                this.placeShip(shipToPlace, randRow, randCol);
            }
            else {
                console.log(this);
                numShipPlaced++;
            }
        } while (numShipPlaced < 5);
    }
    getAutoShot() {
        let randRow = Math.floor(Math.random() * 10);
        let randCol = Math.floor(Math.random() * 10);
        while (this.board[randRow][randCol].isShot == true) {
            randRow = Math.floor(Math.random() * 10);
            randCol = Math.floor(Math.random() * 10);
        }
        this.getShot(randRow, randCol);
    }
}
exports.Bot = Bot;


/***/ }),

/***/ "./src/DOM.js":
/*!********************!*\
  !*** ./src/DOM.js ***!
  \********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DOM = void 0;
class DOM {
    static placeShipHover() { }
    static getTile(row, col) {
        const n = 10 * row + col + 1;
        return (document.querySelector(".placementTile:nth-child(" + n + ")"));
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
exports.DOM = DOM;


/***/ }),

/***/ "./src/Player.js":
/*!***********************!*\
  !*** ./src/Player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Player = void 0;
const Ship_1 = __webpack_require__(/*! ./Ship */ "./src/Ship.js");
const Tile_1 = __webpack_require__(/*! ./Tile */ "./src/Tile.js");
const directions_1 = __webpack_require__(/*! ./directions */ "./src/directions.js");
class Player {
    constructor() {
        this.turn = false;
        this.board = [];
        this.ships = [];
        this.isLost = false;
        for (let i = 0; i < 10; i++) {
            this.board.push([]);
            for (let j = 0; j < 10; j++) {
                this.board[i].push(new Tile_1.Tile(i, j));
            }
        }
        this.ships.push(new Ship_1.Ship(5));
        this.ships.push(new Ship_1.Ship(4));
        this.ships.push(new Ship_1.Ship(3));
        this.ships.push(new Ship_1.Ship(3));
        this.ships.push(new Ship_1.Ship(2));
    }
    placeShip(ship, row, col) {
        ship.startCoord = [row, col];
        const tempShipCoords = [];
        for (let i = 0; i < ship.span; i++) {
            let tempRow, tempCol;
            if (ship.direction == directions_1.directions.x) {
                tempCol = col + i;
                tempRow = row;
            }
            else {
                tempRow = row + i;
                tempCol = col;
            }
            if (tempRow == -1 ||
                tempRow == 10 ||
                tempCol == -1 ||
                tempCol == 10 ||
                this.board[tempRow][tempCol].isOccupied) {
                return;
            }
            tempShipCoords.push([tempRow, tempCol]);
        }
        for (const tempShipCoord of tempShipCoords) {
            const tempRow = tempShipCoord[0];
            const tempCol = tempShipCoord[1];
            ship.coords.push(tempShipCoord);
            this.board[tempRow][tempCol].isShipPlaced = true;
            for (let tempRow2 = tempRow - 1; tempRow2 <= tempRow + 1; tempRow2++) {
                for (let tempCol2 = tempCol - 1; tempCol2 <= tempCol + 1; tempCol2++) {
                    if (tempRow2 == -1 ||
                        tempRow2 == 10 ||
                        tempCol2 == -1 ||
                        tempCol2 == 10) {
                        continue;
                    }
                    this.board[tempRow2][tempCol2].isOccupied = true;
                }
            }
        }
        ship.isPlaced = true;
    }
    getShot(row, col) {
        this.board[row][col].isShot = true;
        let tempIsMiss = true;
        for (const ship of this.ships) {
            for (const coord of ship.coords) {
                if (coord[0] == row && coord[1] == col) {
                    ship.hitCoords.push([row, col]);
                    ship.isHit = true;
                    this.board[row][col].isHit = true;
                    tempIsMiss = false;
                    if (ship.hitCoords.length == ship.span) {
                        ship.isSunk = true;
                        if (this.ships.filter((ship) => ship.isSunk).length ==
                            this.ships.length) {
                            this.isLost = true;
                        }
                    }
                }
            }
        }
        if (tempIsMiss == true) {
            this.board[row][col].isMiss = true;
        }
    }
}
exports.Player = Player;


/***/ }),

/***/ "./src/Ship.js":
/*!*********************!*\
  !*** ./src/Ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Ship = void 0;
const directions_1 = __webpack_require__(/*! ./directions */ "./src/directions.js");
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


/***/ }),

/***/ "./src/Tile.js":
/*!*********************!*\
  !*** ./src/Tile.js ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Tile = void 0;
class Tile {
    constructor(row, col) {
        this.isHit = false;
        this.isMiss = false;
        this.isShot = false;
        this.isOccupied = false;
        this.isShipPlaced = false;
        this.coord = [row, col];
    }
}
exports.Tile = Tile;


/***/ }),

/***/ "./src/directions.js":
/*!***************************!*\
  !*** ./src/directions.js ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.directions = void 0;
var directions;
(function (directions) {
    directions[directions["x"] = 0] = "x";
    directions[directions["y"] = 1] = "y";
})(directions || (directions = {}));
exports.directions = directions;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const Player_1 = __webpack_require__(/*! ./Player */ "./src/Player.js");
const Bot_1 = __webpack_require__(/*! ./Bot */ "./src/Bot.js");
const Action_1 = __webpack_require__(/*! ./Action */ "./src/Action.js");
const player = new Player_1.Player();
const bot = new Bot_1.Bot();
bot.autoPlaceShips();
console.log(bot);
let numShipPlaced = 0;
document.addEventListener("click", (e) => {
    if (e.target instanceof HTMLElement) {
        if (e.target.classList.contains("placeHoverLegal")) {
            Action_1.Action.placeNextShip(player, numShipPlaced, e.target);
            numShipPlaced++;
            if (numShipPlaced == 5) {
                Action_1.Action.loadBattle();
            }
        }
        if (e.target.id == "switchDirectionBtn") {
            player.ships[numShipPlaced].switchDirection();
        }
    }
});
document.addEventListener("mouseover", (e) => {
    if (e.target instanceof HTMLElement) {
        if (e.target.className == "placementTile") {
            Action_1.Action.displayHint(player, numShipPlaced, e.target);
        }
    }
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZOzs7Ozs7Ozs7OztBQ2JDO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsZ0NBQWdDO0FBQ2pDLGtCQUFrQjs7Ozs7OztVQ1JsQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7O0FDdEJhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGlCQUFpQixtQkFBTyxDQUFDLGlDQUFVO0FBQ25DLGNBQWMsbUJBQU8sQ0FBQywyQkFBTztBQUM3QixpQkFBaUIsbUJBQU8sQ0FBQyxpQ0FBVTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9BY3Rpb24uanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0JvdC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvRE9NLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9QbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL1NoaXAuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL1RpbGUuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL2RpcmVjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5BY3Rpb24gPSB2b2lkIDA7XG5jb25zdCBET01fMSA9IHJlcXVpcmUoXCIuL0RPTVwiKTtcbmNvbnN0IGRpcmVjdGlvbnNfMSA9IHJlcXVpcmUoXCIuL2RpcmVjdGlvbnNcIik7XG5jbGFzcyBBY3Rpb24ge1xuICAgIHN0YXRpYyBob3ZlcldpdGhTaGlwKCkgeyB9XG4gICAgc3RhdGljIHBsYWNlTmV4dFNoaXAocGxheWVyLCBudW1TaGlwUGxhY2VkLCBzZWxlY3RlZEVsZW1lbnQpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRSb3cgPSBET01fMS5ET00uZ2V0VGlsZUNvb3JkKHNlbGVjdGVkRWxlbWVudClbMF07XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkQ29sID0gRE9NXzEuRE9NLmdldFRpbGVDb29yZChzZWxlY3RlZEVsZW1lbnQpWzFdO1xuICAgICAgICBwbGF5ZXIucGxhY2VTaGlwKHBsYXllci5zaGlwc1tudW1TaGlwUGxhY2VkXSwgc2VsZWN0ZWRSb3csIHNlbGVjdGVkQ29sKTtcbiAgICAgICAgY29uc3QgdGVtcFNoaXAgPSBwbGF5ZXIuc2hpcHNbbnVtU2hpcFBsYWNlZF07XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGVtcFNoaXAuc3BhbjsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgdGVtcFJvdywgdGVtcENvbDtcbiAgICAgICAgICAgIGlmICh0ZW1wU2hpcC5kaXJlY3Rpb24gPT0gZGlyZWN0aW9uc18xLmRpcmVjdGlvbnMueCkge1xuICAgICAgICAgICAgICAgIHRlbXBDb2wgPSBzZWxlY3RlZENvbCArIGk7XG4gICAgICAgICAgICAgICAgdGVtcFJvdyA9IHNlbGVjdGVkUm93O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGVtcFJvdyA9IHNlbGVjdGVkUm93ICsgaTtcbiAgICAgICAgICAgICAgICB0ZW1wQ29sID0gc2VsZWN0ZWRDb2w7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB0ZW1wVGlsZSA9IERPTV8xLkRPTS5nZXRUaWxlKHRlbXBSb3csIHRlbXBDb2wpO1xuICAgICAgICAgICAgdGVtcFRpbGUuY2xhc3NMaXN0LnJlbW92ZShcInBsYWNlSG92ZXJMZWdhbFwiKTtcbiAgICAgICAgICAgIHRlbXBUaWxlLmNsYXNzTGlzdC5hZGQoXCJzaGlwUGxhY2VkXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBkaXNwbGF5SGludChwbGF5ZXIsIG51bVNoaXBQbGFjZWQsIHNlbGVjdGVkRWxlbWVudCkge1xuICAgICAgICAvL2NsZWFyIGFsbCBoaW50c1xuICAgICAgICBjb25zdCBwbGFjZW1lbnRUaWxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxhY2VtZW50VGlsZVwiKTtcbiAgICAgICAgZm9yIChjb25zdCBwbGFjZW1lbnRUaWxlIG9mIHBsYWNlbWVudFRpbGVzKSB7XG4gICAgICAgICAgICBwbGFjZW1lbnRUaWxlLmNsYXNzTGlzdC5yZW1vdmUoXCJwbGFjZUhvdmVyTGVnYWxcIik7XG4gICAgICAgICAgICBwbGFjZW1lbnRUaWxlLmNsYXNzTGlzdC5yZW1vdmUoXCJwbGFjZUhvdmVySWxsZWdhbFwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZWxlY3RlZFJvdyA9IERPTV8xLkRPTS5nZXRUaWxlQ29vcmQoc2VsZWN0ZWRFbGVtZW50KVswXTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRDb2wgPSBET01fMS5ET00uZ2V0VGlsZUNvb3JkKHNlbGVjdGVkRWxlbWVudClbMV07XG4gICAgICAgIGNvbnN0IHRlbXBTaGlwID0gcGxheWVyLnNoaXBzW251bVNoaXBQbGFjZWRdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRlbXBTaGlwLnNwYW47IGkrKykge1xuICAgICAgICAgICAgbGV0IHRlbXBSb3csIHRlbXBDb2w7XG4gICAgICAgICAgICBpZiAodGVtcFNoaXAuZGlyZWN0aW9uID09IGRpcmVjdGlvbnNfMS5kaXJlY3Rpb25zLngpIHtcbiAgICAgICAgICAgICAgICB0ZW1wQ29sID0gc2VsZWN0ZWRDb2wgKyBpO1xuICAgICAgICAgICAgICAgIHRlbXBSb3cgPSBzZWxlY3RlZFJvdztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRlbXBSb3cgPSBzZWxlY3RlZFJvdyArIGk7XG4gICAgICAgICAgICAgICAgdGVtcENvbCA9IHNlbGVjdGVkQ29sO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRlbXBSb3cgPCAwIHx8IHRlbXBSb3cgPiA5IHx8IHRlbXBDb2wgPCAwIHx8IHRlbXBDb2wgPiA5KSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwbGF5ZXIuYm9hcmRbdGVtcFJvd11bdGVtcENvbF0uaXNPY2N1cGllZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRlbXBUaWxlID0gRE9NXzEuRE9NLmdldFRpbGUodGVtcFJvdywgdGVtcENvbCk7XG4gICAgICAgICAgICAgICAgdGVtcFRpbGUuY2xhc3NMaXN0LmFkZChcInBsYWNlSG92ZXJJbGxlZ2FsXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGVtcFRpbGUgPSBET01fMS5ET00uZ2V0VGlsZSh0ZW1wUm93LCB0ZW1wQ29sKTtcbiAgICAgICAgICAgICAgICB0ZW1wVGlsZS5jbGFzc0xpc3QuYWRkKFwicGxhY2VIb3ZlckxlZ2FsXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5BY3Rpb24gPSBBY3Rpb247XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQm90ID0gdm9pZCAwO1xuY29uc3QgUGxheWVyXzEgPSByZXF1aXJlKFwiLi9QbGF5ZXJcIik7XG5jbGFzcyBCb3QgZXh0ZW5kcyBQbGF5ZXJfMS5QbGF5ZXIge1xuICAgIGF1dG9QbGFjZVNoaXBzKCkge1xuICAgICAgICBsZXQgbnVtU2hpcFBsYWNlZCA9IDA7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGNvbnN0IHNoaXBUb1BsYWNlID0gdGhpcy5zaGlwc1tudW1TaGlwUGxhY2VkXTtcbiAgICAgICAgICAgIGlmIChzaGlwVG9QbGFjZS5pc1BsYWNlZCA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIC8vZ2VuZXJhdGUgcmFuZG9tIGRpcmVjdGlvbiBzdGFydCBjb29yZGluYXRlXG4gICAgICAgICAgICAgICAgY29uc3QgcmFuZFJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgICAgICBjb25zdCByYW5kQ29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhbmREaXJJbmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTtcbiAgICAgICAgICAgICAgICBzaGlwVG9QbGFjZS5zZXREaXJlY3Rpb24ocmFuZERpckluZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGFjZVNoaXAoc2hpcFRvUGxhY2UsIHJhbmRSb3csIHJhbmRDb2wpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcyk7XG4gICAgICAgICAgICAgICAgbnVtU2hpcFBsYWNlZCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlIChudW1TaGlwUGxhY2VkIDwgNSk7XG4gICAgfVxuICAgIGdldEF1dG9TaG90KCkge1xuICAgICAgICBsZXQgcmFuZFJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgbGV0IHJhbmRDb2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgIHdoaWxlICh0aGlzLmJvYXJkW3JhbmRSb3ddW3JhbmRDb2xdLmlzU2hvdCA9PSB0cnVlKSB7XG4gICAgICAgICAgICByYW5kUm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgcmFuZENvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdldFNob3QocmFuZFJvdywgcmFuZENvbCk7XG4gICAgfVxufVxuZXhwb3J0cy5Cb3QgPSBCb3Q7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRE9NID0gdm9pZCAwO1xuY2xhc3MgRE9NIHtcbiAgICBzdGF0aWMgcGxhY2VTaGlwSG92ZXIoKSB7IH1cbiAgICBzdGF0aWMgZ2V0VGlsZShyb3csIGNvbCkge1xuICAgICAgICBjb25zdCBuID0gMTAgKiByb3cgKyBjb2wgKyAxO1xuICAgICAgICByZXR1cm4gKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxhY2VtZW50VGlsZTpudGgtY2hpbGQoXCIgKyBuICsgXCIpXCIpKTtcbiAgICB9XG4gICAgc3RhdGljIGdldFRpbGVDb29yZCh0aWxlRWxlbWVudCkge1xuICAgICAgICBjb25zdCBwYXJlbnQgPSB0aWxlRWxlbWVudC5wYXJlbnROb2RlO1xuICAgICAgICBpZiAocGFyZW50ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChwYXJlbnQuY2hpbGRyZW4sIHRpbGVFbGVtZW50KTtcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoaW5kZXggLyAxMCk7XG4gICAgICAgICAgICBjb25zdCBjb2wgPSBpbmRleCAlIDEwO1xuICAgICAgICAgICAgcmV0dXJuIFtyb3csIGNvbF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkRPTSA9IERPTTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5QbGF5ZXIgPSB2b2lkIDA7XG5jb25zdCBTaGlwXzEgPSByZXF1aXJlKFwiLi9TaGlwXCIpO1xuY29uc3QgVGlsZV8xID0gcmVxdWlyZShcIi4vVGlsZVwiKTtcbmNvbnN0IGRpcmVjdGlvbnNfMSA9IHJlcXVpcmUoXCIuL2RpcmVjdGlvbnNcIik7XG5jbGFzcyBQbGF5ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnR1cm4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ib2FyZCA9IFtdO1xuICAgICAgICB0aGlzLnNoaXBzID0gW107XG4gICAgICAgIHRoaXMuaXNMb3N0ID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5ib2FyZC5wdXNoKFtdKTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbaV0ucHVzaChuZXcgVGlsZV8xLlRpbGUoaSwgaikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2hpcHMucHVzaChuZXcgU2hpcF8xLlNoaXAoNSkpO1xuICAgICAgICB0aGlzLnNoaXBzLnB1c2gobmV3IFNoaXBfMS5TaGlwKDQpKTtcbiAgICAgICAgdGhpcy5zaGlwcy5wdXNoKG5ldyBTaGlwXzEuU2hpcCgzKSk7XG4gICAgICAgIHRoaXMuc2hpcHMucHVzaChuZXcgU2hpcF8xLlNoaXAoMykpO1xuICAgICAgICB0aGlzLnNoaXBzLnB1c2gobmV3IFNoaXBfMS5TaGlwKDIpKTtcbiAgICB9XG4gICAgcGxhY2VTaGlwKHNoaXAsIHJvdywgY29sKSB7XG4gICAgICAgIHNoaXAuc3RhcnRDb29yZCA9IFtyb3csIGNvbF07XG4gICAgICAgIGNvbnN0IHRlbXBTaGlwQ29vcmRzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5zcGFuOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB0ZW1wUm93LCB0ZW1wQ29sO1xuICAgICAgICAgICAgaWYgKHNoaXAuZGlyZWN0aW9uID09IGRpcmVjdGlvbnNfMS5kaXJlY3Rpb25zLngpIHtcbiAgICAgICAgICAgICAgICB0ZW1wQ29sID0gY29sICsgaTtcbiAgICAgICAgICAgICAgICB0ZW1wUm93ID0gcm93O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGVtcFJvdyA9IHJvdyArIGk7XG4gICAgICAgICAgICAgICAgdGVtcENvbCA9IGNvbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0ZW1wUm93ID09IC0xIHx8XG4gICAgICAgICAgICAgICAgdGVtcFJvdyA9PSAxMCB8fFxuICAgICAgICAgICAgICAgIHRlbXBDb2wgPT0gLTEgfHxcbiAgICAgICAgICAgICAgICB0ZW1wQ29sID09IDEwIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZFt0ZW1wUm93XVt0ZW1wQ29sXS5pc09jY3VwaWVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGVtcFNoaXBDb29yZHMucHVzaChbdGVtcFJvdywgdGVtcENvbF0pO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgdGVtcFNoaXBDb29yZCBvZiB0ZW1wU2hpcENvb3Jkcykge1xuICAgICAgICAgICAgY29uc3QgdGVtcFJvdyA9IHRlbXBTaGlwQ29vcmRbMF07XG4gICAgICAgICAgICBjb25zdCB0ZW1wQ29sID0gdGVtcFNoaXBDb29yZFsxXTtcbiAgICAgICAgICAgIHNoaXAuY29vcmRzLnB1c2godGVtcFNoaXBDb29yZCk7XG4gICAgICAgICAgICB0aGlzLmJvYXJkW3RlbXBSb3ddW3RlbXBDb2xdLmlzU2hpcFBsYWNlZCA9IHRydWU7XG4gICAgICAgICAgICBmb3IgKGxldCB0ZW1wUm93MiA9IHRlbXBSb3cgLSAxOyB0ZW1wUm93MiA8PSB0ZW1wUm93ICsgMTsgdGVtcFJvdzIrKykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHRlbXBDb2wyID0gdGVtcENvbCAtIDE7IHRlbXBDb2wyIDw9IHRlbXBDb2wgKyAxOyB0ZW1wQ29sMisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZW1wUm93MiA9PSAtMSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcFJvdzIgPT0gMTAgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBDb2wyID09IC0xIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wQ29sMiA9PSAxMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2FyZFt0ZW1wUm93Ml1bdGVtcENvbDJdLmlzT2NjdXBpZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzaGlwLmlzUGxhY2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgZ2V0U2hvdChyb3csIGNvbCkge1xuICAgICAgICB0aGlzLmJvYXJkW3Jvd11bY29sXS5pc1Nob3QgPSB0cnVlO1xuICAgICAgICBsZXQgdGVtcElzTWlzcyA9IHRydWU7XG4gICAgICAgIGZvciAoY29uc3Qgc2hpcCBvZiB0aGlzLnNoaXBzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNvb3JkIG9mIHNoaXAuY29vcmRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvb3JkWzBdID09IHJvdyAmJiBjb29yZFsxXSA9PSBjb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hpcC5oaXRDb29yZHMucHVzaChbcm93LCBjb2xdKTtcbiAgICAgICAgICAgICAgICAgICAgc2hpcC5pc0hpdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbcm93XVtjb2xdLmlzSGl0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGVtcElzTWlzcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2hpcC5oaXRDb29yZHMubGVuZ3RoID09IHNoaXAuc3Bhbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcC5pc1N1bmsgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2hpcHMuZmlsdGVyKChzaGlwKSA9PiBzaGlwLmlzU3VuaykubGVuZ3RoID09XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGlwcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzTG9zdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRlbXBJc01pc3MgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5ib2FyZFtyb3ddW2NvbF0uaXNNaXNzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuUGxheWVyID0gUGxheWVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlNoaXAgPSB2b2lkIDA7XG5jb25zdCBkaXJlY3Rpb25zXzEgPSByZXF1aXJlKFwiLi9kaXJlY3Rpb25zXCIpO1xuY2xhc3MgU2hpcCB7XG4gICAgY29uc3RydWN0b3Ioc3Bhbikge1xuICAgICAgICB0aGlzLnN0YXJ0Q29vcmQgPSBbXTtcbiAgICAgICAgdGhpcy5jb29yZHMgPSBbXTtcbiAgICAgICAgdGhpcy5zcGFuID0gMDtcbiAgICAgICAgdGhpcy5oaXRDb29yZHMgPSBbXTtcbiAgICAgICAgdGhpcy5pc0hpdCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU3VuayA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzUGxhY2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uc18xLmRpcmVjdGlvbnMueDtcbiAgICAgICAgdGhpcy5zcGFuID0gc3BhbjtcbiAgICB9XG4gICAgc2V0RGlyZWN0aW9uKGRpcmVjdGlvbikge1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICB9XG4gICAgc3dpdGNoRGlyZWN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT0gZGlyZWN0aW9uc18xLmRpcmVjdGlvbnMueCkge1xuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb25zXzEuZGlyZWN0aW9ucy55O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb25zXzEuZGlyZWN0aW9ucy54O1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5TaGlwID0gU2hpcDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5UaWxlID0gdm9pZCAwO1xuY2xhc3MgVGlsZSB7XG4gICAgY29uc3RydWN0b3Iocm93LCBjb2wpIHtcbiAgICAgICAgdGhpcy5pc0hpdCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzTWlzcyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU2hvdCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzT2NjdXBpZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1NoaXBQbGFjZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jb29yZCA9IFtyb3csIGNvbF07XG4gICAgfVxufVxuZXhwb3J0cy5UaWxlID0gVGlsZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kaXJlY3Rpb25zID0gdm9pZCAwO1xudmFyIGRpcmVjdGlvbnM7XG4oZnVuY3Rpb24gKGRpcmVjdGlvbnMpIHtcbiAgICBkaXJlY3Rpb25zW2RpcmVjdGlvbnNbXCJ4XCJdID0gMF0gPSBcInhcIjtcbiAgICBkaXJlY3Rpb25zW2RpcmVjdGlvbnNbXCJ5XCJdID0gMV0gPSBcInlcIjtcbn0pKGRpcmVjdGlvbnMgfHwgKGRpcmVjdGlvbnMgPSB7fSkpO1xuZXhwb3J0cy5kaXJlY3Rpb25zID0gZGlyZWN0aW9ucztcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IFBsYXllcl8xID0gcmVxdWlyZShcIi4vUGxheWVyXCIpO1xuY29uc3QgQm90XzEgPSByZXF1aXJlKFwiLi9Cb3RcIik7XG5jb25zdCBBY3Rpb25fMSA9IHJlcXVpcmUoXCIuL0FjdGlvblwiKTtcbmNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXJfMS5QbGF5ZXIoKTtcbmNvbnN0IGJvdCA9IG5ldyBCb3RfMS5Cb3QoKTtcbmJvdC5hdXRvUGxhY2VTaGlwcygpO1xuY29uc29sZS5sb2coYm90KTtcbmxldCBudW1TaGlwUGxhY2VkID0gMDtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwbGFjZUhvdmVyTGVnYWxcIikpIHtcbiAgICAgICAgICAgIEFjdGlvbl8xLkFjdGlvbi5wbGFjZU5leHRTaGlwKHBsYXllciwgbnVtU2hpcFBsYWNlZCwgZS50YXJnZXQpO1xuICAgICAgICAgICAgbnVtU2hpcFBsYWNlZCsrO1xuICAgICAgICAgICAgaWYgKG51bVNoaXBQbGFjZWQgPT0gNSkge1xuICAgICAgICAgICAgICAgIEFjdGlvbl8xLkFjdGlvbi5sb2FkQmF0dGxlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGUudGFyZ2V0LmlkID09IFwic3dpdGNoRGlyZWN0aW9uQnRuXCIpIHtcbiAgICAgICAgICAgIHBsYXllci5zaGlwc1tudW1TaGlwUGxhY2VkXS5zd2l0Y2hEaXJlY3Rpb24oKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT0gXCJwbGFjZW1lbnRUaWxlXCIpIHtcbiAgICAgICAgICAgIEFjdGlvbl8xLkFjdGlvbi5kaXNwbGF5SGludChwbGF5ZXIsIG51bVNoaXBQbGFjZWQsIGUudGFyZ2V0KTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9