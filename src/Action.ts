import { Player } from "./Player"
import { Tile } from "./Tile"
import { DOM } from "./DOM"
import { directions } from "./directions"

class Action {
  static hoverWithShip() {}
  static placeNextShip(
    player: Player,
    numShipPlaced: number,
    selectedElement: HTMLElement
  ) {
    const selectedRow = DOM.getTileCoord(selectedElement)[0]
    const selectedCol = DOM.getTileCoord(selectedElement)[1]

    player.placeShip(player.ships[numShipPlaced], selectedRow, selectedCol)
    const tempShip = player.ships[numShipPlaced]

    for (let i = 0; i < tempShip.span; i++) {
      let tempRow, tempCol
      if (tempShip.direction == directions.x) {
        tempCol = selectedCol + i
        tempRow = selectedRow
      } else {
        tempRow = selectedRow + i
        tempCol = selectedCol
      }
      const tempTile = DOM.getTile(tempRow, tempCol)
      tempTile.classList.remove("placeHoverLegal")
      tempTile.classList.add("shipPlaced")
    }
  }

  static displayHint(
    player: Player,
    numShipPlaced: number,
    selectedElement: HTMLElement
  ) {
    //clear all hints
    const placementTiles = document.querySelectorAll(".placementTile")
    for (const placementTile of placementTiles) {
      placementTile.classList.remove("placeHoverLegal")
      placementTile.classList.remove("placeHoverIllegal")
    }

    const selectedRow = DOM.getTileCoord(selectedElement)[0]
    const selectedCol = DOM.getTileCoord(selectedElement)[1]

    const tempShip = player.ships[numShipPlaced]
    for (let i = 0; i < tempShip.span; i++) {
      let tempRow, tempCol
      if (tempShip.direction == directions.x) {
        tempCol = selectedCol + i
        tempRow = selectedRow
      } else {
        tempRow = selectedRow + i
        tempCol = selectedCol
      }
      if (tempRow < 0 || tempRow > 9 || tempCol < 0 || tempCol > 9) {
        continue
      } else if (player.board[tempRow][tempCol].isOccupied) {
        const tempTile = DOM.getTile(tempRow, tempCol)
        tempTile.classList.add("placeHoverIllegal")
      } else {
        const tempTile = DOM.getTile(tempRow, tempCol)
        tempTile.classList.add("placeHoverLegal")
      }
    }
  }
}

export { Action }
