import { Block } from "./Block.js";
import { I_Block, J_Block, L_Block, O_Block, S_Block, T_Block, Z_Block } from './Tetrominoes.js';

export class GameState {
    constructor(tetrisGame) {
        this.tetrisGame = tetrisGame;
        this.blockList = [];
    }

    createNewTetromino() {
        this.tetrisGame.state.tetromino.current = this.getRandomTetromino();
        this.addTetromino(this.tetrisGame.state.tetromino.current);
        this.tetrisGame.state.tetromino.current.checkGameOver();
    }

    getRandomTetromino() {
        let possibleTetrominoes = [I_Block, J_Block, L_Block, O_Block, S_Block, T_Block, Z_Block];
        let tetromino = new possibleTetrominoes[Math.floor(Math.random() * possibleTetrominoes.length)](this.tetrisGame);
        return tetromino;
    }

    addTetromino(Tetromino) {
        this.addBlocks(Tetromino.blockList);
    }

    addBlocks(blocks) {
        blocks.forEach(bl => {
            if (bl instanceof Block) {
                this.blockList.push(bl);
            } else {
                throw new Error('The content of the array is not of type Block');
            }
        });
    }

    renderBlocks() {
        this.blockList.forEach((bl)=> bl.update());
    }

    updateLogic() {
        this.tetrisGame.state.tetromino.current.updateDrop();
        //console.log(this.tetrisGame.state.timeStamp);
    }

    checkCollision(blocks) {
        let flag = false;
        for (let i = 0; i < blocks.length; i++) {
            const bl = blocks[i];
            if (bl.x < 0 || bl.x >= this.tetrisGame.state.blockNums.width) {
                flag = true;
                break;
            }
            if (bl.y < 0 || bl.y >= this.tetrisGame.state.blockNums.height) {
                flag = true;
                break;
            }
            let results = this.blockList.filter((blAll) => blAll.x === bl.x && blAll.y === bl.y);
            if(results.length >= 2) {
                flag = true;
                break;
            }
        }
        //console.log(flag);
        return flag;
    }
}