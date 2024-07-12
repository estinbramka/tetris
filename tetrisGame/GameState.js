import { Block } from "./Block.js";

export class GameState {
    constructor() {
        this.blockList = [];
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

    checkCollision(blocks) {
        let flag = false;
        for (let i = 0; i < this.blockList.length; i++) {
            const bl = this.blockList[i];
            let results = this.blockList.filter((blAll) => blAll.x === bl.x && blAll.y === bl.y);
            if(results.length >= 2) {
                flag = true;
                break;
            }
        }
        console.log(flag);
        return flag;
    }
}