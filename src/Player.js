"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const Tile_1 = require("./Tile");
const directions_1 = require("./directions");
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
