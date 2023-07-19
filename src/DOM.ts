class DOM {
  static placeShipHover() {}

  static getTile(row: number, col: number, tileClass: string) {
    const n = 10 * row + col + 1
    return <HTMLScriptElement>(
      document.querySelector(`.${tileClass}:nth-child( ` + n + ")")
    )
  }

  static getTileCoord(tileElement: HTMLElement): number[] {
    const parent = tileElement.parentNode
    if (parent != null) {
      const index = Array.prototype.indexOf.call(parent.children, tileElement)

      const row = Math.floor(index / 10)

      const col = index % 10

      return [row, col]
    } else {
      return []
    }
  }

  static fillGameboardDiv(gameboardId: string, tileClassName: string) {
    const gameboardDiv = document.getElementById(gameboardId)
    for (let i = 0; i < 100; i++) {
      const tempDiv = document.createElement("div")
      tempDiv.classList.add(tileClassName)
      gameboardDiv?.appendChild(tempDiv)
    }
  }

  static clearGameboardDiv(gameboardId: string) {
    document.getElementById(gameboardId)?.textContent = ""
  }

  static displayResult(winnerName: string) {
    document.getElementById("resultMessage")?.innerHTML = `${winnerName} WON!`
    document.getElementById("resultMessage")?.classList.remove("hidden")
    throw Error
  }
}

export { DOM }
