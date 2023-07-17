import { Player } from "./Player"
import { Ship } from "./Ship"
import { directions } from "./directions"
import { dom } from "./dom"

const p1: Player = new Player("player1")

const p1s1: Ship = new Ship()
p1s1.setSpanAndDirection(2, directions.x)
p1.placeShip(p1s1, 0, 0)
p1.getShot(0, 0)
p1.getShot(0, 1)
p1.getAutoShot()

console.log(p1)

const df = dom.selectTile(1, 1)
df.style.backgroundColor = "red"

document.addEventListener("click", (e: MouseEvent) => {
  if (e.target instanceof HTMLElement) {
    if (e.target.className == "placementTile") {
      e.target.style.backgroundColor = "red"
      console.log(dom.getTileCoord(e.target))
      dom.hoverShip()
      dom.placeShip()
    }
  }
})
