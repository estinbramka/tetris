import { Block } from "./Block.js";
import { COLORS } from "./Colors.js";

let blockArray = [];
let gameState = [];
gameState.push([
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [0,1,2,3,4,5,6,-1,0,1],
    [0,1,2,3,4,5,6,-1,0,1],
    [0,1,2,3,4,5,6,-1,0,1],
    [0,1,2,3,4,5,6,-1,0,1],
    [0,1,2,3,4,5,6,-1,0,1],
]);

export function setupGameState(tetrisGame,selectedState) {
    blockArray = [];
    let selectedGameState = gameState[selectedState];
    for (let i = 0; i < selectedGameState.length; i++) {
        for (let j = 0; j < selectedGameState[i].length; j++) {
            const colorNum = selectedGameState[i][j];
            if (colorNum !== -1) {
                let block = new Block(COLORS[colorNum],j,i,tetrisGame);
                blockArray.push(block);
            }
        }
    }
    tetrisGame.gameState.addBlocks(blockArray);
    //console.log(selectedGameState);
}
