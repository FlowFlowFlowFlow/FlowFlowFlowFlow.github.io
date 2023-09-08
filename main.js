function gameOver() {
    window.location.replace("game-over.html");
}

function rangeShuffle() {
    for (let i = range.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [range[i], range[j]] = [range[j], range[i]];
    }
}

function tigerFightsDragon() {
    dragonsVitality -= 3;
}

function grassTurn(i, adjSources, adjCoords) {
    if (Math.floor(Math.random() * 100) > Math.floor(genID / tigers / 4) - 1) {
        return;
    }
    const unchangedAdjTigerAreas = [];
    for (let j = 0; j < adjSources.length; j++) {
        const adjArea = body.querySelector(
            `[data-x-coord="${adjCoords[j][0]}"][data-y-coord="${adjCoords[j][1]}"]`
        );
        if (
            adjArea.dataset.changed === "false" &&
            (
                adjSources[j] === "assets/tiger-on-grass-tile.png" ||
                adjSources[j] === "assets/tiger-on-sand-tile.png" ||
                adjSources[j] === "assets/friendly-tiger-on-grass-tile.png" ||
                adjSources[j] === "assets/friendly-tiger-on-sand-tile.png"
            )
        ) {
            unchangedAdjTigerAreas.push(adjArea);
        }
    }
    if (unchangedAdjTigerAreas.length === 2) {
        tigers++;
        hexagons[i].setAttribute("src", "assets/tiger-on-grass-tile.png");
        areas[i].setAttribute("data-changed", "true");
        unchangedAdjTigerAreas[0].setAttribute("data-changed", "true");
        unchangedAdjTigerAreas[1].setAttribute("data-changed", "true");
    }
}

function sandTurn(i, adjSources, adjCoords) {
    if (Math.floor(Math.random() * 100) > Math.floor(genID / tigers / 4) - 1) {
        return;
    }
    const unchangedAdjSources = [];
    const unchangedAdjTigerAreas = [];
    for (let j = 0; j < adjSources.length; j++) {
        const adjArea = body.querySelector(
            `[data-x-coord="${adjCoords[j][0]}"][data-y-coord="${adjCoords[j][1]}"]`
        );
        if (adjArea.dataset.changed === "false") {
            unchangedAdjSources.push(adjSources[j]);
            switch (adjSources[j]) {
                case "assets/tiger-on-grass-tile.png":
                case "assets/tiger-on-sand-tile.png":
                    unchangedAdjTigerAreas.push(adjArea);
            }
        }
    }
    if (unchangedAdjTigerAreas.length === 2 && hexagons[i].getAttribute("src") === "assets/sand-tile.png") {
        tigers++;
        hexagons[i].setAttribute("src", "assets/tiger-on-sand-tile.png");
        areas[i].setAttribute("data-changed", "true");
        unchangedAdjTigerAreas[0].setAttribute("data-changed", "true");
        unchangedAdjTigerAreas[1].setAttribute("data-changed", "true");
    } else if (
        (
            adjSources.includes("assets/water-tile.png") ||
            adjSources.includes("assets/fish-on-water-tile.png")
        ) &&
        (
            unchangedAdjSources.includes("assets/grass-tile.png") ||
            unchangedAdjSources.includes("assets/player-on-grass-tile.png") ||
            unchangedAdjSources.includes("assets/player-on-grass-tile-highlighted.png") ||
            unchangedAdjSources.includes("assets/tiger-on-grass-tile.png") ||
            unchangedAdjSources.includes("assets/dragon-on-grass-tile.png")
        )
    ) {
        const currentHexagon = hexagons[i];
        switch (currentHexagon.getAttribute('src')) {
            case "assets/sand-tile.png":
                currentHexagon.setAttribute("src", "assets/grass-tile.png");
                break;
            case "assets/player-on-sand-tile.png":
                currentHexagon.setAttribute("src", "assets/player-on-grass-tile.png");
                break;
            case "assets/player-on-sand-tile-highlighted.png":
                currentHexagon.setAttribute("src", "assets/player-on-grass-tile-highlighted.png");
                break;
            case "assets/tiger-on-sand-tile.png":
                currentHexagon.setAttribute("src", "assets/tiger-on-grass-tile.png");
                break;
            case "assets/dragon-on-sand-tile.png":
                currentHexagon.setAttribute("src", "assets/dragon-on-grass-tile.png");
        }
        areas[i].setAttribute("changed", "true");
    }
}

function waterTurn(i, adjSources, adjCoords) {
    if (
        Math.floor(Math.random() * 18) < 17 ||
        areas[i].getAttribute("data-changed") === "true"
    ) {
        return;
    }
    const unchangedAdjFishAreas = [];
    for (let j = 0; j < adjSources.length; j++) {
        const adjArea = body.querySelector(
            `[data-x-coord="${adjCoords[j][0]}"][data-y-coord="${adjCoords[j][1]}"]`
        );
        if (
            adjArea.dataset.changed === "false" &&
            adjSources[j] === "assets/fish-on-water-tile.png"
        ) {
            unchangedAdjFishAreas.push(adjArea);
        }
    }
    if (unchangedAdjFishAreas.length === 2) {
        hexagons[i].setAttribute("src", "assets/fish-on-water-tile.png");
        areas[i].setAttribute("data-changed", "true");
        unchangedAdjFishAreas[0].setAttribute("data-changed", "true");
        unchangedAdjFishAreas[1].setAttribute("data-changed", "true");
    }
}

function fireTurn(i, adjSources, adjCoords) {
    const possibleMoves = [];
    for (let j = 0; j < adjSources.length; j++) {
        if (
            (
                adjSources[j] === "assets/grass-tile.png" ||
                adjSources[j] === "assets/player-on-grass-tile.png" ||
                adjSources[j] === "assets/player-on-grass-tile-highlighted.png" ||
                adjSources[j] === "assets/tiger-on-grass-tile.png" ||
                adjSources[j] === "assets/friendly-tiger-on-grass-tile.png" ||
                adjSources[j] === "assets/dragon-on-grass-tile.png" ||
                adjSources[j] === "assets/dragon-on-grass-tile-sleeping.png"
            ) &&
            body.querySelector(
                `[data-x-coord="${adjCoords[j][0]}"][data-y-coord="${adjCoords[j][1]}"]`
            ).dataset.changed === "false"
        ) {
            possibleMoves.push(adjCoords[j]);
        }
    }
    if (possibleMoves.length > 0) {
        const chosenMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        const chosenArea =
            body.querySelector(
                `[data-x-coord="${chosenMove[0]}"][data-y-coord="${chosenMove[1]}"]`
            );
        const chosenHexagon = hexagons[chosenArea.dataset.id];
        switch (chosenHexagon.getAttribute("src")) {
            case "assets/player-on-grass-tile.png":
            case "assets/player-on-grass-tile-highlighted.png":
                gameOver();
                break;
            case "assets/dragon-on-grass-tile.png":
                chosenHexagon.setAttribute("src", "assets/dragon-on-fire-tile.png");
                break;
            case "assets/dragon-on-grass-tile-sleeping.png":
                chosenHexagon.setAttribute("src", "assets/dragon-on-fire-tile-sleeping");
                break;
            case "assets/tiger-on-grass-tile.png":
            case "assets/friendly-tiger-on-grass-tile.png":
                tigers--;
                chosenHexagon.setAttribute("src", "assets/fire-tile.png");
                break;
            default:
                chosenHexagon.setAttribute("src", "assets/fire-tile.png");
        }
        chosenArea.setAttribute("data-changed", "true");
    } else {
        const currentHexagon = hexagons[i];
        switch (currentHexagon.getAttribute("src")) {
            case "assets/dragon-on-fire-tile.png":
                currentHexagon.setAttribute("src", "assets/dragon-on-sand-tile.png");
                break;
            case "assets/dragon-on-fire-tile-sleeping.png":
                currentHexagon.setAttribute("src", "assets/dragon-on-sand-tile-sleeping.png");
                break;
            default:
                currentHexagon.setAttribute("src", "assets/sand-tile.png");
        }
        areas[i].setAttribute("data-changed", "true");
    }
}

function fishTurn(i, adjSources, adjCoords) {
    const possibleMoves = [];
    for (let j = 0; j < adjSources.length; j++) {
        if (
            adjSources[j] === "assets/water-tile.png" &&
            body.querySelector(
                `[data-x-coord="${adjCoords[j][0]}"][data-y-coord="${adjCoords[j][1]}"]`
            ).dataset.changed === "false"
        ) {
            possibleMoves.push(adjCoords[j]);
        }
    }
    if (possibleMoves.length > 0) {
        const chosenMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        const chosenArea =
            body.querySelector(
                `[data-x-coord="${chosenMove[0]}"][data-y-coord="${chosenMove[1]}"]`
            );
        hexagons[i].setAttribute("src", "assets/water-tile.png");
        areas[i].setAttribute("data-changed", "true");
        hexagons[chosenArea.dataset.id].setAttribute("src", "assets/fish-on-water-tile.png");
        chosenArea.setAttribute("data-changed", "true");
    }
}

function tigerTurn(i, adjSources, adjCoords) {
    const possibleMoves = [];
    for (let j = 0; j < adjSources.length; j++) {
        if (
            body.querySelector(
                `[data-x-coord="${adjCoords[j][0]}"][data-y-coord="${adjCoords[j][1]}"]`
            ).dataset.changed === "false"
        ) {
            switch (adjSources[j]) {
                case "assets/player-on-grass-tile.png":
                case "assets/player-on-sand-tile.png":
                case "assets/player-on-grass-tile-highlighted.png":
                case "assets/player-on-sand-tile-highlighted.png":
                    gameOver();
                    return;
                case "assets/dragon-on-grass-tile.png":
                case "assets/dragon-on-sand-tile.png":
                case "assets/dragon-on-water-tile.png":
                case "assets/dragon-on-fire-tile.png":
                case "assets/dragon-on-grass-tile-sleeping.png":
                case "assets/dragon-on-sand-tile-sleeping.png":
                case "assets/dragon-on-water-tile-sleeping.png":
                case "assets/dragon-on-fire-tile-sleeping.png":
                    tigerFightsDragon();
                    return;
                case "assets/grass-tile.png":
                case "assets/sand-tile.png":
                    possibleMoves.push(adjCoords[j]);
            }
        }
    }
    if (possibleMoves.length > 0) {
        const chosenMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        const chosenArea =
            body.querySelector(`[data-x-coord="${chosenMove[0]}"][data-y-coord="${chosenMove[1]}"]`);
        const originHexagon = hexagons[i];
        const destinationHexagon = hexagons[chosenArea.dataset.id];
        originHexagon.setAttribute(
            "src", `assets/${originHexagon.getAttribute("src").slice(16, -9)}-tile.png`
        );
        areas[i].setAttribute("data-changed", "true");
        destinationHexagon.setAttribute(
            "src",
            `assets/tiger-on-${destinationHexagon.getAttribute("src").slice(7, -9)}-tile.png`
        );
        chosenArea.setAttribute("data-changed", "true");
    }
}

function friendlyTigerTurn(i, adjSources, adjCoords) {
    const possibleMoves = [];
    for (let j = 0; j < adjSources.length; j++) {
        if (
            body.querySelector(
                `[data-x-coord="${adjCoords[j][0]}"][data-y-coord="${adjCoords[j][1]}"]`
            ).dataset.changed === "false"
        ) {
            switch (adjSources[j]) {
                case "assets/dragon-on-grass-tile.png":
                case "assets/dragon-on-sand-tile.png":
                case "assets/dragon-on-water-tile.png":
                case "assets/dragon-on-fire-tile.png":
                case "assets/dragon-on-grass-tile-sleeping.png":
                case "assets/dragon-on-sand-tile-sleeping.png":
                case "assets/dragon-on-water-tile-sleeping.png":
                case "assets/dragon-on-fire-tile-sleeping.png":
                    tigerFightsDragon();
                    return;
                case "assets/grass-tile.png":
                case "assets/sand-tile.png":
                    possibleMoves.push(adjCoords[j]);
            }
        }
    }
    if (possibleMoves.length > 0) {
        const chosenMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        const chosenArea =
            body.querySelector(
                `[data-x-coord="${chosenMove[0]}"][data-y-coord="${chosenMove[1]}"]`
            );
        const originHexagon = hexagons[i];
        const destinationHexagon = hexagons[chosenArea.dataset.id];
        originHexagon.setAttribute(
            "src", `assets/${originHexagon.getAttribute("src").slice(25, -9)}-tile.png`
        );
        areas[i].setAttribute("data-changed", "true");
        destinationHexagon.setAttribute(
            "src",
            `assets/friendly-tiger-on-${destinationHexagon.getAttribute("src").slice(7, -9)}-tile.png`
        );
        chosenArea.setAttribute("data-changed", "true");
    }
}

function dragonTurn(i, adjSources, adjCoords) {
    const possibleSecondPriorityMoves = [];
    const possibleThirdPriorityMoves = [];
    for (let j = 0; j < adjSources.length; j++) {
        switch (adjSources[j]) {
            case "assets/player-on-grass-tile.png":
            case "assets/player-on-sand-tile.png":
            case "assets/player-on-grass-tile-highlighted.png":
            case "assets/player-on-sand-tile-highlighted.png":
                gameOver();
                return;
            case "assets/tiger-on-grass-tile.png":
            case "assets/tiger-on-sand-tile.png":
            case "assets/friendly-tiger-on-grass-tile.png":
            case "assets/friendly-tiger-on-sand-tile.png":
                possibleSecondPriorityMoves.push(adjCoords[j]);
                break;
            case "assets/fish-on-water-tile.png":
                possibleThirdPriorityMoves.push(adjCoords[j]);
                break;
        }
    }
    if (possibleSecondPriorityMoves.length > 0) {
        const chosenMove =
            possibleSecondPriorityMoves[Math.floor(Math.random() * possibleSecondPriorityMoves.length)];
        const chosenArea = body.querySelector(
            `[data-x-coord="${chosenMove[0]}"][data-y-coord="${chosenMove[1]}"]`
        );
        tigerFightsDragon();
        hexagons[chosenArea.dataset.id].setAttribute("src", "assets/fire-tile.png");
        chosenArea.setAttribute("data-changed", "true");
        tigers--;
        return;
    }
    if (possibleThirdPriorityMoves.length > 0) {
        const chosenMove =
            possibleThirdPriorityMoves[Math.floor(Math.random() * possibleThirdPriorityMoves.length)];
        const chosenArea = body.querySelector(
            `[data-x-coord="${chosenMove[0]}"][data-y-coord="${chosenMove[1]}"]`
        );
        hexagons[chosenArea.dataset.id].setAttribute("src", "assets/fire-tile.png");
        chosenArea.setAttribute("data-changed", "true");
        return;
    }
    const adjCoordsAndCombinedDeltas = [];
    for (let i = 0; adjCoords.length > i; i++) {
        const absoluteDeltaX = Math.abs(adjCoords[i][0] - playerCoords[0]);
        const absoluteDeltaY = Math.abs(adjCoords[i][1] - playerCoords[1]);
        adjCoordsAndCombinedDeltas.push(
            [
                adjCoords[i],
                absoluteDeltaX * absoluteDeltaX + absoluteDeltaY * absoluteDeltaY
            ]);
    }
    let lowestCombinedDelta = adjCoordsAndCombinedDeltas[0][1];
    let possibleFourthPriorityMoves = [];
    possibleFourthPriorityMoves.push(adjCoordsAndCombinedDeltas[0][0]);
    let currentCombinedDelta;
    for (let i = 1; adjCoordsAndCombinedDeltas.length > i; i++) {
        currentCombinedDelta = adjCoordsAndCombinedDeltas[i][1];
        if (lowestCombinedDelta > currentCombinedDelta) {
            lowestCombinedDelta = currentCombinedDelta;
            possibleFourthPriorityMoves = [];
            possibleFourthPriorityMoves.push(adjCoordsAndCombinedDeltas[i][0]);
        } else if (lowestCombinedDelta === currentCombinedDelta) {
            possibleFourthPriorityMoves.push(adjCoordsAndCombinedDeltas[i][0]);
        }
    }
    const chosenMove = possibleFourthPriorityMoves[Math.floor(Math.random() * possibleFourthPriorityMoves.length)];
    const chosenArea =
        body.querySelector(`[data-x-coord="${chosenMove[0]}"][data-y-coord="${chosenMove[1]}"]`);
    const originHexagon = hexagons[i];
    const destinationHexagon = hexagons[chosenArea.dataset.id];
    originHexagon.setAttribute(
        "src", `assets/${originHexagon.getAttribute("src").slice(17, -9)}-tile.png`
    );
    areas[i].setAttribute("data-changed", "true");
    destinationHexagon.setAttribute(
        "src",
        `assets/dragon-on-${destinationHexagon.getAttribute("src").slice(7, -9)}-tile.png`
    );
    chosenArea.setAttribute("data-changed", "true");
}

function combinedSandDragonTurn(i, adjSources, adjCoords) {
    sandTurn(i, adjSources, adjCoords);
    dragonTurn(i, adjSources, adjCoords);
}

function combinedFireDragonTurn(i, adjSources, adjCoords) {
    fireTurn(i, adjSources, adjCoords);
    dragonTurn(i, adjSources, adjCoords);
}

function walkableHexagon(e) {
    switch ([playerCoords[0] - e.target.dataset.xCoord, playerCoords[1] - e.target.dataset.yCoord].toString()) {
        case "0,0":
        case "0,2":
        case "0,-2":
        case "1,1":
        case "-1,-1":
        case "1,-1":
        case "-1,1":
            return true;
    }
    return false;
}

function clickHexagon(e) {
    const clickedHexagon = hexagons[e.target.dataset.id];
    const clickedSource = clickedHexagon.getAttribute("src");
    if (walkableHexagon(e) && highlightedTiles.includes(clickedSource)) {
        turnsTaken++;
        switch (clickedSource) {
            case "assets/player-on-grass-tile-highlighted.png":
            case "assets/player-on-sand-tile-highlighted.png":
                break;
            case "assets/fish-on-water-tile-highlighted.png":
                clickedHexagon.setAttribute("src", "assets/water-tile.png");
                fishCaught++;
                areas[e.target.dataset.id].setAttribute("data-changed", "true");
                break;
            case "assets/tiger-on-grass-tile-highlighted.png":
                fishCaught--;
                clickedHexagon.setAttribute("src", "assets/friendly-tiger-on-grass-tile.png");
                areas[e.target.dataset.id].setAttribute("data-changed", "true");
                break;
            case "assets/tiger-on-sand-tile-highlighted.png":
                fishCaught--;
                clickedHexagon.setAttribute("src", "assets/friendly-tiger-on-sand-tile.png");
                areas[e.target.dataset.id].setAttribute("data-changed", "true");
                break;
            case "assets/dragon-on-grass-tile-highlighted.png":
                fishCaught--;
                clickedHexagon.setAttribute("src", "assets/dragon-on-grass-tile-sleeping.png");
                areas[e.target.dataset.id].setAttribute("data-changed", "true");
                break;
            case "assets/dragon-on-sand-tile-highlighted.png":
                fishCaught--;
                clickedHexagon.setAttribute("src", "assets/dragon-on-sand-tile-sleeping.png");
                areas[e.target.dataset.id].setAttribute("data-changed", "true");
                break;
            case "assets/dragon-on-water-tile-highlighted.png":
                fishCaught--;
                clickedHexagon.setAttribute("src", "assets/dragon-on-water-tile-sleeping.png");
                areas[e.target.dataset.id].setAttribute("data-changed", "true");
                break;
            case "assets/dragon-on-fire-tile-highlighted.png":
                fishCaught--;
                clickedHexagon.setAttribute("src", "assets/dragon-on-fire-tile-sleeping.png");
                areas[e.target.dataset.id].setAttribute("data-changed", "true");
                break;
            default:
                const playerHexagon = hexagons[playerHexagonID];
                const playerSource = playerHexagon.getAttribute("src");
                playerHexagon.setAttribute(
                    "src", `assets/${playerSource.slice(17, -4)}.png`
                );
                playerHexagonID = e.target.dataset.id;
                clickedHexagon.setAttribute(
                    "src", `assets/player-on-${clickedSource.slice(7, -16)}.png`
                );
                playerCoords = [e.target.dataset.xCoord, e.target.dataset.yCoord];
        }
        rangeShuffle();
        for (let i = 0; range.length > i; i++) {
            const currentRangeNumber = range[i];
            if (areas[currentRangeNumber].dataset.changed === "true") {
                continue;
            }
            const currentSource = hexagons[currentRangeNumber].getAttribute("src");
            if (Object.keys(prioTurnTakers).includes(currentSource)) {
                let [adjSources, adjCoords] = getAdjInfo(currentRangeNumber);
                prioTurnTakers[currentSource](currentRangeNumber, adjSources, adjCoords);
            }
        }
        for (let i = 0; range.length > i; i++) {
            const currentRangeNumber = range[i];
            const currentArea = areas[currentRangeNumber];
            if (currentArea.dataset.changed === "true") {
                continue;
            }
            const currentHexagon = hexagons[currentRangeNumber];
            const currentSource = currentHexagon.getAttribute("src");
            switch (currentSource) {
                case "assets/dragon-on-grass-tile-sleeping.png":
                    currentHexagon.setAttribute("src", "assets/dragon-on-grass-tile.png");
                    break;
                case "assets/dragon-on-sand-tile-sleeping.png":
                    currentHexagon.setAttribute("src", "assets/dragon-on-sand-tile.png");
                    break;
                case "assets/dragon-on-water-tile-sleeping.png":
                    currentHexagon.setAttribute("src", "assets/dragon-on-water-tile.png");
                    break;
                case "assets/dragon-on-fire-tile-sleeping.png":
                    currentHexagon.setAttribute("src", "assets/dragon-on-fire-tile.png");
                    break;
                default:
                    if (Object.keys(otherTurnTakers).includes(currentSource)) {
                        const [adjSources, adjCoords] = getAdjInfo(currentRangeNumber); // Remove const if breaks
                        otherTurnTakers[currentSource](currentRangeNumber, adjSources, adjCoords);
                    }
            }
        }
        if (dragonsVitality < 1) {
            window.location.replace("you-win.html");
        }
        for (let i = 0; i < hexagons.length; i++) {
            areas[i].setAttribute("data-changed", "false");
        }
        if (turnsTaken === 100) {
            let potentialDragonSpawnHexagon;
            let potentialDragonSpawnSource;
            for (let i = 0; range.length > i; i++) {
                potentialDragonSpawnHexagon = hexagons[range[i]];
                potentialDragonSpawnSource = potentialDragonSpawnHexagon.getAttribute("src");
                if (potentialDragonSpawnSource === "assets/grass-tile.png") {
                    potentialDragonSpawnHexagon.setAttribute("src", "assets/dragon-on-grass-tile.png");
                    break;
                } else if (potentialDragonSpawnSource === "assets/sand-tile.png") {
                    potentialDragonSpawnHexagon.setAttribute("src", "assets/dragon-on-sand-tile.png");
                    break;
                } else if (potentialDragonSpawnSource === "assets/water-tile.png") {
                    potentialDragonSpawnHexagon.setAttribute("src", "assets/dragon-on-water-tile.png");
                    break;
                }
            }
        }
        if (turnsTaken > 99) {
            statistics.innerHTML = `
            Turns taken: ${turnsTaken}&emsp;&emsp;
            Fish caught: ${fishCaught}&emsp;&emsp;
            Dragon's vitality: ${dragonsVitality}
            `;
        } else {
            statistics.innerHTML = `Turns taken: ${turnsTaken}&emsp;&emsp;Fish caught: ${fishCaught}`;
        }
    }
    console.log(tigers);
}

function getAdjInfo(i) {
    const currentArea = areas[i];
    const adjSources = [];
    const adjCoords = [];
    for (let j = 0; j < 6; j++) {
        const adjCoordsPart = [
            Number(currentArea.dataset.xCoord) + coordDeltas[j][0],
            Number(currentArea.dataset.yCoord) + coordDeltas[j][1]
        ];
        const adjArea =
            body.querySelector(
                `[data-x-coord="${adjCoordsPart[0]}"][data-y-coord="${adjCoordsPart[1]}"]`
            );
        if (adjArea) {
            adjSources.push(hexagons[adjArea.dataset.id].getAttribute("src"));
            adjCoords.push(adjCoordsPart);
        }
    }
    return [adjSources, adjCoords];
}

function mouseOverHexagon(e) {
    const mousedOverHexagon = hexagons[e.target.dataset.id];
    const mousedOverSource = mousedOverHexagon.getAttribute("src");
    if (
        fishCaught < 1 &&
        (
            mousedOverSource === "assets/tiger-on-grass-tile.png" ||
            mousedOverSource === "assets/tiger-on-sand-tile.png" ||
            mousedOverSource === "assets/dragon-on-grass-tile.png" ||
            mousedOverSource === "assets/dragon-on-sand-tile.png" ||
            mousedOverSource === "assets/dragon-on-water-tile.png"
        )
    ) {
        return;
    }
    if (walkableHexagon(e) && highlightableTiles.includes(mousedOverSource)) {
        mousedOverHexagon.setAttribute(
            "src", `assets/${mousedOverSource.slice(7, -4)}-highlighted.png`
        );
    }
}

function mouseOutHexagon(e) {
    const mousedOutHexagon = hexagons[e.target.dataset.id];
    const mousedOutSource = mousedOutHexagon.getAttribute("src");
    if (highlightedTiles.includes(mousedOutSource)) {
        mousedOutHexagon.setAttribute(
            "src", `assets/${mousedOutSource.slice(7, mousedOutSource.length - 16)}.png`
        );
    }
}

const coordDeltas = [[0, 2], [0, -2], [1, 1], [-1, -1], [1, -1], [-1, 1]];
const highlightableTiles = [
    "assets/grass-tile.png",
    "assets/sand-tile.png",
    "assets/player-on-grass-tile.png",
    "assets/player-on-sand-tile.png",
    "assets/fish-on-water-tile.png",
    "assets/tiger-on-grass-tile.png",
    "assets/tiger-on-sand-tile.png",
    "assets/dragon-on-grass-tile.png",
    "assets/dragon-on-sand-tile.png",
    "assets/dragon-on-water-tile.png",
    "assets/dragon-on-fire-tile.png"
];
const highlightedTiles = [
    "assets/grass-tile-highlighted.png",
    "assets/sand-tile-highlighted.png",
    "assets/player-on-grass-tile-highlighted.png",
    "assets/player-on-sand-tile-highlighted.png",
    "assets/fish-on-water-tile-highlighted.png",
    "assets/tiger-on-grass-tile-highlighted.png",
    "assets/tiger-on-sand-tile-highlighted.png",
    "assets/dragon-on-grass-tile-highlighted.png",
    "assets/dragon-on-sand-tile-highlighted.png",
    "assets/dragon-on-water-tile-highlighted.png",
    "assets/dragon-on-fire-tile-highlighted.png"
];
const prioTurnTakers = {
    "assets/grass-tile.png": grassTurn,
    "assets/sand-tile.png": sandTurn,
    "assets/player-on-sand-tile.png": sandTurn,
    "assets/player-on-sand-tile-highlighted.png": sandTurn,
    "assets/tiger-on-sand-tile.png": sandTurn,
    "assets/water-tile.png": waterTurn,
    "assets/fire-tile.png": fireTurn,
    "assets/dragon-on-grass-tile.png": dragonTurn,
    "assets/dragon-on-sand-tile.png": combinedSandDragonTurn,
    "assets/dragon-on-water-tile.png": dragonTurn,
    "assets/dragon-on-fire-tile.png": combinedFireDragonTurn,
    "assets/dragon-on-fire-tile-sleeping.png": fireTurn
};
const otherTurnTakers = {
    "assets/fish-on-water-tile.png": fishTurn,
    "assets/tiger-on-grass-tile.png": tigerTurn,
    "assets/tiger-on-sand-tile.png": tigerTurn,
    "assets/friendly-tiger-on-grass-tile.png": friendlyTigerTurn,
    "assets/friendly-tiger-on-sand-tile.png": friendlyTigerTurn,
};
const body = document.querySelector('body');
const hexagons = [];
const maps = [];
const areas = [];
let rowStartCoords = [0, 0];
let currentCoords = [0, 0];
let genID = 0;
let tigers = 2;
const rows = Math.floor((document.documentElement.clientHeight - 81) / 67);
const columns = Math.floor((document.documentElement.clientWidth - 50) / 133);
if (rows < 1 || columns < 1) {
    window.location.replace("screen-error.html");
}
for (let parity = 0; parity < 2; parity++) {
    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            maps[genID] = document.createElement("map");
            maps[genID].setAttribute("name", `hexagon-shape-${genID}`);
            body.appendChild(maps[genID]);
            areas[genID] = document.createElement("area");
            areas[genID].setAttribute("shape", "polygon");
            areas[genID].setAttribute("coords", "30,0,61,0,91,30,61,60,30,60,0,30");
            areas[genID].setAttribute("data-x-coord", `${currentCoords[0]}`);
            areas[genID].setAttribute("data-y-coord", `${currentCoords[1]}`);
            areas[genID].setAttribute("data-id", `${genID}`);
            areas[genID].setAttribute("data-changed", "false");
            areas[genID].addEventListener("mouseover", mouseOverHexagon);
            areas[genID].addEventListener("click", clickHexagon);
            areas[genID].addEventListener("mouseout", mouseOutHexagon);
            maps[genID].appendChild(areas[genID]);
            hexagons[genID] = document.createElement("img");
            hexagons[genID].setAttribute(
                "style",
                `left:${column * 134 + parity * 67 + 10}px; top:${row * 68 + parity * 34 + 10}px;`
            );
            hexagons[genID].setAttribute('usemap', `#hexagon-shape-${genID}`);
            body.appendChild(hexagons[genID]);
            currentCoords[0] += 2;
            genID++;
        }
        rowStartCoords[1] -= 2;
        currentCoords = [...rowStartCoords];
    }
    rowStartCoords = [1, -1];
    currentCoords = [1, -1];
}
const range = [];
for (let i = 0; i < genID; i++) {
    range.push(i);
}
rangeShuffle();
let playerHexagonID;
let playerCoords;
for (let i = 0; i < range.length; i++) {
    switch (i) {
        case 0:
            playerHexagonID = range[i];
            hexagons[playerHexagonID].setAttribute("src", "assets/player-on-grass-tile.png");
            const playerStartArea = areas[playerHexagonID];
            playerCoords = [playerStartArea.dataset.xCoord, playerStartArea.dataset.yCoord];
            break;
        case 1:
            hexagons[range[i]].setAttribute("src", "assets/tiger-on-grass-tile.png");
            break;
        case 2:
            hexagons[range[i]].setAttribute("src", "assets/tiger-on-sand-tile.png");
            break;
        default:
            if (Math.floor(Math.random() * 100) > Math.floor(genID / tigers / 4) - 1) {
                const randomNumber = Math.floor(Math.random() * 9);
                if (randomNumber < 1) {
                    hexagons[range[i]].setAttribute("src", "assets/fish-on-water-tile.png");
                } else if (randomNumber < 3) {
                    hexagons[range[i]].setAttribute("src", "assets/water-tile.png");
                } else if (randomNumber < 6) {
                    hexagons[range[i]].setAttribute("src", "assets/grass-tile.png");
                } else {
                    hexagons[range[i]].setAttribute("src", "assets/sand-tile.png");
                }
            } else {
                tigers++;
                switch (Math.floor(Math.random() * 2)) {
                    case 0:
                        hexagons[range[i]].setAttribute("src", "assets/tiger-on-grass-tile.png");
                        break;
                    case 1:
                        hexagons[range[i]].setAttribute("src", "assets/tiger-on-sand-tile.png");
                }
            }
    }
}
let turnsTaken = 0;
let fishCaught = 0;
let dragonsVitality = hexagons.length / 2;
const statistics = document.createElement("p");
statistics.setAttribute("style", `left:10px; top:${rows * 67 + 51}px;`);
statistics.innerHTML = "Turns taken: 0&emsp;&emsp;Fish caught: 0";
body.appendChild(statistics);