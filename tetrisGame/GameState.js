import { Block } from "./Block.js";

export class GameState {
    constructor() {
        this.blockList = [];
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
}