"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOM = void 0;
class DOM {
    static placeShipHover() { }
    static getTile(row, col, tileClass) {
        const n = 10 * row + col + 1;
        return (document.querySelector(`.${tileClass}:nth-child( ` + n + ")"));
    }
    static getTileCoord(tileElement) {
        const parent = tileElement.parentNode;
        if (parent != null) {
            const index = Array.prototype.indexOf.call(parent.children, tileElement);
            const row = Math.floor(index / 10);
            const col = index % 10;
            return [row, col];
        }
        else {
            return [];
        }
    }
    static fillGameboardDiv(gameboardId, tileClassName) {
        const gameboardDiv = document.getElementById(gameboardId);
        for (let i = 0; i < 100; i++) {
            const tempDiv = document.createElement("div");
            tempDiv.classList.add(tileClassName);
            gameboardDiv === null || gameboardDiv === void 0 ? void 0 : gameboardDiv.appendChild(tempDiv);
        }
    }
    static clearGameboardDiv(gameboardId) {
        var _a;
        (_a = document.getElementById(gameboardId)) === null || _a === void 0 ? void 0 : _a.textContent = "";
    }
    static displayResult(winnerName) {
        var _a, _b;
        (_a = document.getElementById("resultMessage")) === null || _a === void 0 ? void 0 : _a.innerHTML = `${winnerName} WON!`;
        (_b = document.getElementById("resultMessage")) === null || _b === void 0 ? void 0 : _b.classList.remove("hidden");
        throw Error;
    }
}
exports.DOM = DOM;
