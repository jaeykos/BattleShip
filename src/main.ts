import { Player } from "./Player"
import { Bot } from "./Bot"
import { Action } from "./Action"
import { DOM } from "./DOM"

const player: Player = new Player("player")
const bot: Bot = new Bot("bot")
DOM.fillGameboardDiv("gameboardDiv", "placementTile")
bot.autoPlaceShips()

let numShipPlaced = 0
document.addEventListener("click", (e: MouseEvent) => {
  if (e.target instanceof HTMLElement) {
    if (e.target.classList.contains("placeHoverLegal")) {
      Action.placeNextShip(player, numShipPlaced, e.target)
      numShipPlaced++
      if (numShipPlaced == 5) {
        Action.loadBattle(player)
      }
    }

    if (e.target.id == "switchDirectionBtn") {
      player.ships[numShipPlaced].switchDirection()
    }

    if (e.target.id == "restartBtn") {
      numShipPlaced = 0
      Action.restart(player, bot)
    }

    if (e.target.classList.contains("botTile")) {
      Action.playerAttacks(e.target, bot)
      if (bot.isLost) {
        DOM.displayResult("PLAYER")
      }
      Action.botAttacks(player)
      if (player.isLost) {
        DOM.displayResult("BOT")
      }
    }
  }
})

document.addEventListener("mouseover", (e: MouseEvent) => {
  if (e.target instanceof HTMLElement) {
    if (e.target.classList.contains("placementTile")) {
      Action.displayHint(player, numShipPlaced, e.target)
    }
  }
})
