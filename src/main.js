"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("./Player");
const Bot_1 = require("./Bot");
const Action_1 = require("./Action");
const DOM_1 = require("./DOM");
const player = new Player_1.Player("player");
const bot = new Bot_1.Bot("bot");
DOM_1.DOM.fillGameboardDiv("gameboardDiv", "placementTile");
bot.autoPlaceShips();
let numShipPlaced = 0;
document.addEventListener("click", (e) => {
    if (e.target instanceof HTMLElement) {
        if (e.target.classList.contains("placeHoverLegal")) {
            Action_1.Action.placeNextShip(player, numShipPlaced, e.target);
            numShipPlaced++;
            if (numShipPlaced == 5) {
                Action_1.Action.loadBattle(player);
            }
        }
        if (e.target.id == "switchDirectionBtn") {
            player.ships[numShipPlaced].switchDirection();
        }
        if (e.target.id == "restartBtn") {
            numShipPlaced = 0;
            Action_1.Action.restart(player, bot);
        }
        if (e.target.classList.contains("botTile")) {
            Action_1.Action.playerAttacks(e.target, bot);
            if (bot.isLost) {
                DOM_1.DOM.displayResult("PLAYER");
            }
            Action_1.Action.botAttacks(player);
            if (player.isLost) {
                DOM_1.DOM.displayResult("BOT");
            }
        }
    }
});
document.addEventListener("mouseover", (e) => {
    if (e.target instanceof HTMLElement) {
        if (e.target.classList.contains("placementTile")) {
            Action_1.Action.displayHint(player, numShipPlaced, e.target);
        }
    }
});
