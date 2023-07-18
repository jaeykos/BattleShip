"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("./Player");
const Bot_1 = require("./Bot");
const Action_1 = require("./Action");
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
