"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
const Player_1 = require("./Player");
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
