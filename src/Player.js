"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const Ship_1 = require("./Ship");
const Tile_1 = require("./Tile");
const directions_1 = require("./directions");
class Player {
    constructor(name) {
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
    resetPlayer() {
        this.board = [];
        for (let i = 0; i < 10; i++) {
            this.board.push([]);
            for (let j = 0; j < 10; j++) {
                this.board[i].push(new Tile_1.Tile(i, j));
            }
        }
        this.ships = [];
        this.ships.push(new Ship_1.Ship(5));
        this.ships.push(new Ship_1.Ship(4));
        this.ships.push(new Ship_1.Ship(3));
        this.ships.push(new Ship_1.Ship(3));
        this.ships.push(new Ship_1.Ship(2));
        this.isLost = false;
    }
}
exports.Player = Player;
