class Tile {
  coord: number[]
  isHit = false
  isMiss = false
  isShot = false
  isOccupied = false
  isdf = false

  constructor(row: number, col: number) {
    this.coord = [row, col]
  }
}

export { Tile }
