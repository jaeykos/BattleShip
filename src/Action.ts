import { Player } from "./Player";
import { Tile } from "./Tile";
import { DOM } from "./DOM";
import { directions } from "./directions";

class Action {
  static hoverWithShip() {}
  static placeNextShip(
    player: Player,
    numShipPlaced: number,
    selectedElement: HTMLElement
  ) {
    const selectedRow = DOM.getTileCoord(selectedElement)[0];
    const selectedCol = DOM.getTileCoord(selectedElement)[1];

    player.placeShip(player.ships[numShipPlaced], selectedRow, selectedCol);
    const tempShip = player.ships[numShipPlaced];

    for (let i = 0; i < tempShip.span; i++) {
      let tempRow, tempCol;
      if (tempShip.direction == directions.x) {
        tempCol = selectedCol + i;
        tempRow = selectedRow;
      } else {
        tempRow = selectedRow + i;
        tempCol = selectedCol;
      }
      const tempTile = DOM.getTile(tempRow, tempCol, "placementTile");
      tempTile.classList.remove("placeHoverLegal", "animate-pulse");
      tempTile.classList.add("shipPlaced");
    }
  }

  static displayHint(
    player: Player,
    numShipPlaced: number,
    selectedElement: HTMLElement
  ) {
    //clear all hints
    const placementTiles = document.getElementById("gameboardDiv")?.children;
    for (const placementTile of placementTiles) {
      placementTile.classList.remove("placeHoverLegal", "animate-pulse");
      placementTile.classList.remove("placeHoverIllegal", "animate-pulse");
    }

    const selectedRow = DOM.getTileCoord(selectedElement)[0];
    const selectedCol = DOM.getTileCoord(selectedElement)[1];

    const tempShip = player.ships[numShipPlaced];
    let isLegal = true;
    for (let i = 0; i < tempShip.span; i++) {
      let tempRow, tempCol;
      if (tempShip.direction == directions.x) {
        tempCol = selectedCol + i;
        tempRow = selectedRow;
      } else {
        tempRow = selectedRow + i;
        tempCol = selectedCol;
      }
      if (tempRow < 0 || tempRow > 9 || tempCol < 0 || tempCol > 9) {
        isLegal = false;
        break;
      } else if (player.board[tempRow][tempCol].isOccupied) {
        isLegal = false;
        break;
      }
    }

    for (let i = 0; i < tempShip.span; i++) {
      let tempRow, tempCol;
      if (tempShip.direction == directions.x) {
        tempCol = selectedCol + i;
        tempRow = selectedRow;
      } else {
        tempRow = selectedRow + i;
        tempCol = selectedCol;
      }

      const tempTile = DOM.getTile(tempRow, tempCol, "placementTile");
      if (tempRow < 0 || tempRow > 9 || tempCol < 0 || tempCol > 9) {
        continue;
      } else {
        if (isLegal) {
          tempTile.classList.add("placeHoverLegal", "animate-pulse");
        } else {
          tempTile.classList.add("placeHoverIllegal", "animate-pulse");
        }
      }
    }
  }

  static loadBattle(player: Player) {
    document.getElementById("startMainDiv")?.classList.add("hidden");
    document.getElementById("battleMainDiv")?.classList.remove("hidden");
    DOM.fillGameboardDiv("playerBoardDiv", "playerTile");
    DOM.fillGameboardDiv("botBoardDiv", "botTile");

    //assign shipPlaced html class
    for (let tempRow = 0; tempRow < 10; tempRow++) {
      for (let tempCol = 0; tempCol < 10; tempCol++) {
        if (player.board[tempRow][tempCol].isShipPlaced) {
          DOM.getTile(tempRow, tempCol, "playerTile").classList.add(
            "playerShipPlaced"
          );
        }
      }
    }
  }

  static botAttacks(attackReciever: Player) {
    let randRow = Math.floor(Math.random() * 10);
    let randCol = Math.floor(Math.random() * 10);

    while (attackReciever.board[randRow][randCol].isShot == true) {
      randRow = Math.floor(Math.random() * 10);
      randCol = Math.floor(Math.random() * 10);
    }

    attackReciever.getShot(randRow, randCol);

    if (attackReciever.board[randRow][randCol].isHit) {
      DOM.getTile(randRow, randCol, "playerTile").classList.add("isHit");
    } else {
      DOM.getTile(randRow, randCol, "playerTile").classList.add("isMiss");
    }

    this.displaySunkShips(attackReciever, "playerTile");
  }

  static displaySunkShips(player: Player, tileDivClassName: string) {
    const sunkShips = player.ships.filter((ship) => ship.isSunk == true);
    for (const sunkShip of sunkShips) {
      for (const tempCoord of sunkShip.coords)
        DOM.getTile(tempCoord[0], tempCoord[1], tileDivClassName).classList.add(
          "isSunk"
        );
    }
  }

  static playerAttacks(selectedElement: HTMLElement, attackReciever: Player) {
    const selectedCoord = DOM.getTileCoord(selectedElement);
    const selectedRow = selectedCoord[0];
    const selectedCol = selectedCoord[1];

    const selectedTile = attackReciever.board[selectedRow][selectedCol];

    selectedTile.isShot = true;

    attackReciever.getShot(selectedRow, selectedCol);

    if (selectedTile.isShipPlaced) {
      selectedTile.isHit = true;
      selectedElement.classList.add("isHit");
    } else {
      selectedTile.isMiss = true;
      selectedElement.classList.add("isMiss");
    }

    this.displaySunkShips(attackReciever, "botTile");
  }

  static restart(player: Player, bot: Player) {
    document.getElementById("resultMessage")?.classList.add("hidden");
    document.getElementById("battleMainDiv")?.classList.add("hidden");
    document.getElementById("startMainDiv")?.classList.remove("hidden");

    DOM.clearGameboardDiv("gameboardDiv");
    DOM.clearGameboardDiv("playerBoardDiv");
    DOM.clearGameboardDiv("botBoardDiv");
    DOM.fillGameboardDiv("gameboardDiv", "placementTile");

    player.resetPlayer();
    bot.resetPlayer();
  }
}

export { Action };
