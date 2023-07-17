/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Player.js":
/*!***********************!*\
  !*** ./src/Player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Player = void 0;
const Tile_1 = __webpack_require__(/*! ./Tile */ "./src/Tile.js");
const directions_1 = __webpack_require__(/*! ./directions */ "./src/directions.js");
class Player {
    constructor(name) {
        this.name = "";
        this.turn = false;
        this.board = [];
        this.ships = [];
        this.isLost = false;
        this.name = name;
        for (let i = 0; i < 10; i++) {
            this.board.push([]);
            for (let j = 0; j < 10; j++) {
                this.board[i].push(new Tile_1.Tile(i, j));
            }
        }
    }
    placeShip(ship, row, col) {
        this.ships.push(ship);
        ship.startCoord = [row, col];
        for (let i = 0; i < ship.span; i++) {
            let tempRow, tempCol;
            if (ship.direction == directions_1.directions.x) {
                tempCol = col + i;
                tempRow = row;
            }
            else if (ship.direction == directions_1.directions.y) {
                tempRow = row + 1;
                tempCol = col;
            }
            else {
                throw Error;
            }
            ship.coords.push([tempRow, tempCol]);
            for (let tempRow2 = tempRow - 1; tempRow2 <= tempRow + 1; tempRow2++) {
                for (let tempCol2 = tempCol - 1; tempCol2 <= tempCol + 1; tempCol2++) {
                    if (tempRow2 == -1 ||
                        tempRow2 == 10 ||
                        tempCol2 == -1 ||
                        tempCol2 == 10) {
                        continue;
                    }
                    else {
                        this.board[tempRow2][tempCol2].isOccupied = true;
                    }
                }
            }
        }
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
        this.isdf = false;
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
    directions[directions["notSet"] = 2] = "notSet";
})(directions || (directions = {}));
exports.directions = directions;


/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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
const Ship_1 = __webpack_require__(/*! ./Ship */ "./src/Ship.js");
const directions_1 = __webpack_require__(/*! ./directions */ "./src/directions.js");
const dom_1 = __webpack_require__(/*! ./dom */ "./src/dom.js");
const p1 = new Player_1.Player("player1");
const p1s1 = new Ship_1.Ship();
p1s1.setSpanAndDirection(2, directions_1.directions.x);
p1.placeShip(p1s1, 0, 0);
p1.getShot(0, 0);
p1.getShot(0, 1);
p1.getAutoShot();
console.log(p1);
const df = dom_1.dom.selectTile(1, 1);
df.style.backgroundColor = "red";
document.addEventListener("click", (e) => {
    if (e.target instanceof HTMLElement) {
        if (e.target.className == "placementTile") {
            e.target.style.backgroundColor = "red";
            console.log(dom_1.dom.getTileCoord(e.target));
            dom_1.dom.hoverShip();
            dom_1.dom.placeShip();
        }
    }
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsY0FBYztBQUNkLGVBQWUsbUJBQU8sQ0FBQyw2QkFBUTtBQUMvQixxQkFBcUIsbUJBQU8sQ0FBQyx5Q0FBYztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFFBQVE7QUFDaEM7QUFDQSw0QkFBNEIsUUFBUTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixlQUFlO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLHlCQUF5QjtBQUN0RSxpREFBaUQseUJBQXlCO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjOzs7Ozs7Ozs7OztBQ3RGRDtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxZQUFZO0FBQ1oscUJBQXFCLG1CQUFPLENBQUMseUNBQWM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTs7Ozs7Ozs7Ozs7QUNuQkM7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTs7Ozs7Ozs7Ozs7QUNiQztBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsZ0NBQWdDO0FBQ2pDLGtCQUFrQjs7Ozs7Ozs7Ozs7QUNUTDtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXOzs7Ozs7O1VDdEJYO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7QUN0QmE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsaUJBQWlCLG1CQUFPLENBQUMsaUNBQVU7QUFDbkMsZUFBZSxtQkFBTyxDQUFDLDZCQUFRO0FBQy9CLHFCQUFxQixtQkFBTyxDQUFDLHlDQUFjO0FBQzNDLGNBQWMsbUJBQU8sQ0FBQywyQkFBTztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvUGxheWVyLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9TaGlwLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9UaWxlLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9kaXJlY3Rpb25zLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5QbGF5ZXIgPSB2b2lkIDA7XG5jb25zdCBUaWxlXzEgPSByZXF1aXJlKFwiLi9UaWxlXCIpO1xuY29uc3QgZGlyZWN0aW9uc18xID0gcmVxdWlyZShcIi4vZGlyZWN0aW9uc1wiKTtcbmNsYXNzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBcIlwiO1xuICAgICAgICB0aGlzLnR1cm4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ib2FyZCA9IFtdO1xuICAgICAgICB0aGlzLnNoaXBzID0gW107XG4gICAgICAgIHRoaXMuaXNMb3N0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5ib2FyZC5wdXNoKFtdKTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbaV0ucHVzaChuZXcgVGlsZV8xLlRpbGUoaSwgaikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHBsYWNlU2hpcChzaGlwLCByb3csIGNvbCkge1xuICAgICAgICB0aGlzLnNoaXBzLnB1c2goc2hpcCk7XG4gICAgICAgIHNoaXAuc3RhcnRDb29yZCA9IFtyb3csIGNvbF07XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5zcGFuOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB0ZW1wUm93LCB0ZW1wQ29sO1xuICAgICAgICAgICAgaWYgKHNoaXAuZGlyZWN0aW9uID09IGRpcmVjdGlvbnNfMS5kaXJlY3Rpb25zLngpIHtcbiAgICAgICAgICAgICAgICB0ZW1wQ29sID0gY29sICsgaTtcbiAgICAgICAgICAgICAgICB0ZW1wUm93ID0gcm93O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc2hpcC5kaXJlY3Rpb24gPT0gZGlyZWN0aW9uc18xLmRpcmVjdGlvbnMueSkge1xuICAgICAgICAgICAgICAgIHRlbXBSb3cgPSByb3cgKyAxO1xuICAgICAgICAgICAgICAgIHRlbXBDb2wgPSBjb2w7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNoaXAuY29vcmRzLnB1c2goW3RlbXBSb3csIHRlbXBDb2xdKTtcbiAgICAgICAgICAgIGZvciAobGV0IHRlbXBSb3cyID0gdGVtcFJvdyAtIDE7IHRlbXBSb3cyIDw9IHRlbXBSb3cgKyAxOyB0ZW1wUm93MisrKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgdGVtcENvbDIgPSB0ZW1wQ29sIC0gMTsgdGVtcENvbDIgPD0gdGVtcENvbCArIDE7IHRlbXBDb2wyKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRlbXBSb3cyID09IC0xIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wUm93MiA9PSAxMCB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcENvbDIgPT0gLTEgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBDb2wyID09IDEwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbdGVtcFJvdzJdW3RlbXBDb2wyXS5pc09jY3VwaWVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRBdXRvU2hvdCgpIHtcbiAgICAgICAgbGV0IHJhbmRSb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgIGxldCByYW5kQ29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICB3aGlsZSAodGhpcy5ib2FyZFtyYW5kUm93XVtyYW5kQ29sXS5pc1Nob3QgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmFuZFJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgIHJhbmRDb2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nZXRTaG90KHJhbmRSb3csIHJhbmRDb2wpO1xuICAgIH1cbiAgICBnZXRTaG90KHJvdywgY29sKSB7XG4gICAgICAgIHRoaXMuYm9hcmRbcm93XVtjb2xdLmlzU2hvdCA9IHRydWU7XG4gICAgICAgIGxldCB0ZW1wSXNNaXNzID0gdHJ1ZTtcbiAgICAgICAgZm9yIChjb25zdCBzaGlwIG9mIHRoaXMuc2hpcHMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgY29vcmQgb2Ygc2hpcC5jb29yZHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29vcmRbMF0gPT0gcm93ICYmIGNvb3JkWzFdID09IGNvbCkge1xuICAgICAgICAgICAgICAgICAgICBzaGlwLmhpdENvb3Jkcy5wdXNoKFtyb3csIGNvbF0pO1xuICAgICAgICAgICAgICAgICAgICBzaGlwLmlzSGl0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2FyZFtyb3ddW2NvbF0uaXNIaXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0ZW1wSXNNaXNzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzaGlwLmhpdENvb3Jkcy5sZW5ndGggPT0gc2hpcC5zcGFuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwLmlzU3VuayA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zaGlwcy5maWx0ZXIoKHNoaXApID0+IHNoaXAuaXNTdW5rKS5sZW5ndGggPT1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNoaXBzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNMb3N0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGVtcElzTWlzcyA9PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLmJvYXJkW3Jvd11bY29sXS5pc01pc3MgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5QbGF5ZXIgPSBQbGF5ZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU2hpcCA9IHZvaWQgMDtcbmNvbnN0IGRpcmVjdGlvbnNfMSA9IHJlcXVpcmUoXCIuL2RpcmVjdGlvbnNcIik7XG5jbGFzcyBTaGlwIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zdGFydENvb3JkID0gW107XG4gICAgICAgIHRoaXMuY29vcmRzID0gW107XG4gICAgICAgIHRoaXMuc3BhbiA9IDA7XG4gICAgICAgIHRoaXMuaGl0Q29vcmRzID0gW107XG4gICAgICAgIHRoaXMuaXNIaXQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1N1bmsgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb25zXzEuZGlyZWN0aW9ucy5ub3RTZXQ7XG4gICAgfVxuICAgIHNldFNwYW5BbmREaXJlY3Rpb24oc3BhbiwgZGlyZWN0aW9uKSB7XG4gICAgICAgIHRoaXMuc3BhbiA9IHNwYW47XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgIH1cbn1cbmV4cG9ydHMuU2hpcCA9IFNoaXA7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVGlsZSA9IHZvaWQgMDtcbmNsYXNzIFRpbGUge1xuICAgIGNvbnN0cnVjdG9yKHJvdywgY29sKSB7XG4gICAgICAgIHRoaXMuaXNIaXQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc01pc3MgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1Nob3QgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc09jY3VwaWVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNkZiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNvb3JkID0gW3JvdywgY29sXTtcbiAgICB9XG59XG5leHBvcnRzLlRpbGUgPSBUaWxlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRpcmVjdGlvbnMgPSB2b2lkIDA7XG52YXIgZGlyZWN0aW9ucztcbihmdW5jdGlvbiAoZGlyZWN0aW9ucykge1xuICAgIGRpcmVjdGlvbnNbZGlyZWN0aW9uc1tcInhcIl0gPSAwXSA9IFwieFwiO1xuICAgIGRpcmVjdGlvbnNbZGlyZWN0aW9uc1tcInlcIl0gPSAxXSA9IFwieVwiO1xuICAgIGRpcmVjdGlvbnNbZGlyZWN0aW9uc1tcIm5vdFNldFwiXSA9IDJdID0gXCJub3RTZXRcIjtcbn0pKGRpcmVjdGlvbnMgfHwgKGRpcmVjdGlvbnMgPSB7fSkpO1xuZXhwb3J0cy5kaXJlY3Rpb25zID0gZGlyZWN0aW9ucztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kb20gPSB2b2lkIDA7XG5jbGFzcyBkb20ge1xuICAgIHN0YXRpYyBwbGFjZVNoaXBIb3ZlcigpIHsgfVxuICAgIHN0YXRpYyBzZWxlY3RUaWxlKHJvdywgY29sKSB7XG4gICAgICAgIGNvbnN0IG4gPSAxMCAqIHJvdyArIGNvbCArIDE7XG4gICAgICAgIHJldHVybiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50aWxlOm50aC1jaGlsZChcIiArIG4gKyBcIilcIikpO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0VGlsZUNvb3JkKHRpbGVFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHRpbGVFbGVtZW50LnBhcmVudE5vZGU7XG4gICAgICAgIGlmIChwYXJlbnQgIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKHBhcmVudC5jaGlsZHJlbiwgdGlsZUVsZW1lbnQpO1xuICAgICAgICAgICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihpbmRleCAvIDEwKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbCA9IGluZGV4ICUgMTA7XG4gICAgICAgICAgICByZXR1cm4gW3JvdywgY29sXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuZG9tID0gZG9tO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgUGxheWVyXzEgPSByZXF1aXJlKFwiLi9QbGF5ZXJcIik7XG5jb25zdCBTaGlwXzEgPSByZXF1aXJlKFwiLi9TaGlwXCIpO1xuY29uc3QgZGlyZWN0aW9uc18xID0gcmVxdWlyZShcIi4vZGlyZWN0aW9uc1wiKTtcbmNvbnN0IGRvbV8xID0gcmVxdWlyZShcIi4vZG9tXCIpO1xuY29uc3QgcDEgPSBuZXcgUGxheWVyXzEuUGxheWVyKFwicGxheWVyMVwiKTtcbmNvbnN0IHAxczEgPSBuZXcgU2hpcF8xLlNoaXAoKTtcbnAxczEuc2V0U3BhbkFuZERpcmVjdGlvbigyLCBkaXJlY3Rpb25zXzEuZGlyZWN0aW9ucy54KTtcbnAxLnBsYWNlU2hpcChwMXMxLCAwLCAwKTtcbnAxLmdldFNob3QoMCwgMCk7XG5wMS5nZXRTaG90KDAsIDEpO1xucDEuZ2V0QXV0b1Nob3QoKTtcbmNvbnNvbGUubG9nKHAxKTtcbmNvbnN0IGRmID0gZG9tXzEuZG9tLnNlbGVjdFRpbGUoMSwgMSk7XG5kZi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJlZFwiO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZSA9PSBcInBsYWNlbWVudFRpbGVcIikge1xuICAgICAgICAgICAgZS50YXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZWRcIjtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRvbV8xLmRvbS5nZXRUaWxlQ29vcmQoZS50YXJnZXQpKTtcbiAgICAgICAgICAgIGRvbV8xLmRvbS5ob3ZlclNoaXAoKTtcbiAgICAgICAgICAgIGRvbV8xLmRvbS5wbGFjZVNoaXAoKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9