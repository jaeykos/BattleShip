"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("./Player");
const Ship_1 = require("./Ship");
const directions_1 = require("./directions");
const dom_1 = require("./dom");
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
