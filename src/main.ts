import { Player } from "./Player"
import { Bot } from "./Bot"
import { Action } from "./Action"

const player: Player = new Player()
const bot: Bot = new Bot()

bot.autoPlaceShips()

console.log(bot)

let numShipPlaced = 0
document.addEventListener("click", (e: MouseEvent) => {
  if (e.target instanceof HTMLElement) {
    if (e.target.classList.contains("placeHoverLegal")) {
      Action.placeNextShip(player, numShipPlaced, e.target)
      numShipPlaced++
      if (numShipPlaced == 5) {
        Action.loadBattle()
      }
    }

    if (e.target.id == "switchDirectionBtn") {
      player.ships[numShipPlaced].switchDirection()
    }
  }
})

document.addEventListener("mouseover", (e: MouseEvent) => {
  if (e.target instanceof HTMLElement) {
    if (e.target.className == "placementTile") {
      Action.displayHint(player, numShipPlaced, e.target)
    }
  }
})
