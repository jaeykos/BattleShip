import { directions } from "./directions"

class Ship {
  startCoord: number[] = []
  coords: number[][] = []
  span = 0
  hitCoords: number[][] = []
  isHit = false
  isSunk = false
  isPlaced = false
  direction = directions.x

  constructor(span: number) {
    this.span = span
  }

  setDirection(direction: directions) {
    this.direction = direction
  }

  switchDirection() {
    if (this.direction == directions.x) {
      this.direction = directions.y
    } else {
      this.direction = directions.x
    }
  }
}

export { Ship }
