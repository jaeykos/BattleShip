import { Ship } from "./Ship"
import { Tile } from "./Tile"
import { directions } from "./directions"

class Player {
  name: string
  board: Tile[][] = []
  ships: Ship[] = []
  isLost = false

  constructor(name: string) {
    this.name = name
    for (let i = 0; i < 10; i++) {
      this.board.push([])
      for (let j = 0; j < 10; j++) {
        this.board[i].push(new Tile(i, j))
      }
    }

    this.ships.push(new Ship(5))
    this.ships.push(new Ship(4))
    this.ships.push(new Ship(3))
    this.ships.push(new Ship(3))
    this.ships.push(new Ship(2))
  }

  placeShip(ship: Ship, row: number, col: number) {
    ship.startCoord = [row, col]

    const tempShipCoords: number[][] = []
    for (let i = 0; i < ship.span; i++) {
      let tempRow, tempCol
      if (ship.direction == directions.x) {
        tempCol = col + i
        tempRow = row
      } else {
        tempRow = row + i
        tempCol = col
      }

      if (
        tempRow == -1 ||
        tempRow == 10 ||
        tempCol == -1 ||
        tempCol == 10 ||
        this.board[tempRow][tempCol].isOccupied
      ) {
        return
      }

      tempShipCoords.push([tempRow, tempCol])
    }

    for (const tempShipCoord of tempShipCoords) {
      const tempRow = tempShipCoord[0]
      const tempCol = tempShipCoord[1]
      ship.coords.push(tempShipCoord)
      this.board[tempRow][tempCol].isShipPlaced = true

      for (let tempRow2 = tempRow - 1; tempRow2 <= tempRow + 1; tempRow2++) {
        for (let tempCol2 = tempCol - 1; tempCol2 <= tempCol + 1; tempCol2++) {
          if (
            tempRow2 == -1 ||
            tempRow2 == 10 ||
            tempCol2 == -1 ||
            tempCol2 == 10
          ) {
            continue
          }
          this.board[tempRow2][tempCol2].isOccupied = true
        }
      }
    }

    ship.isPlaced = true
  }

  getShot(row: number, col: number) {
    this.board[row][col].isShot = true
    let tempIsMiss = true
    for (const ship of this.ships) {
      for (const coord of ship.coords) {
        if (coord[0] == row && coord[1] == col) {
          ship.hitCoords.push([row, col])
          ship.isHit = true
          this.board[row][col].isHit = true

          tempIsMiss = false

          if (ship.hitCoords.length == ship.span) {
            ship.isSunk = true
            if (
              this.ships.filter((ship) => ship.isSunk).length ==
              this.ships.length
            ) {
              this.isLost = true
            }
          }
        }
      }
    }

    if (tempIsMiss == true) {
      this.board[row][col].isMiss = true
    }
  }

  resetPlayer() {
    this.board = []
    for (let i = 0; i < 10; i++) {
      this.board.push([])
      for (let j = 0; j < 10; j++) {
        this.board[i].push(new Tile(i, j))
      }
    }

    this.ships = []
    this.ships.push(new Ship(5))
    this.ships.push(new Ship(4))
    this.ships.push(new Ship(3))
    this.ships.push(new Ship(3))
    this.ships.push(new Ship(2))

    this.isLost = false
  }
}

export { Player }
