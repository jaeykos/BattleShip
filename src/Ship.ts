import { directions } from "./directions"

class Ship {
  startCoord: number[] = []
  coords: number[][] = []
  span = 0
  hitCoords: number[][] = []
  isHit = false
  isSunk = false
  direction = directions.notSet

  constructor() {}

  setSpanAndDirection(span: number, direction: directions) {
    this.span = span
    this.direction = direction
  }
}

export { Ship }
