import { Block } from "./Block.js";
import { COLORS } from "./Colors.js";

class Tetromino {
    constructor() {
        this.blockList = [];
    }

    rotateRight() {
        let beta = Math.PI/2;
        this.rotate(beta);
    }

    rotateLeft() {
        let beta = -Math.PI/2;
        this.rotate(beta);
    }

    rotate(beta) {
        let originX = this.origin.x;
        let originY = this.origin.y;
        this.blockList.forEach((bl) => {
            let x0 = bl.x - originX;
            let y0 = bl.y - originY;
            let xr = x0*Math.cos(beta) - y0*Math.sin(beta);
            let yr = x0*Math.sin(beta) + y0*Math.cos(beta);
            xr = xr + originX;
            yr = yr + originY;
            xr = Math.round(xr);
            yr = Math.round(yr);
            bl.x = xr;
            bl.y = yr;
        });
    }

    softDrop() {
        this.blockList.forEach((bl)=> bl.y++);
    }
}

export class I_Block extends Tetromino {
    constructor(tetrisGame) {
        super();
        let block;
        block = new Block(COLORS[4], 3, 0, tetrisGame);
        this.blockList.push(block);
        block = new Block(COLORS[4], 4, 0, tetrisGame);
        this.origin = block;
        this.blockList.push(block);
        block = new Block(COLORS[4], 5, 0, tetrisGame);
        this.blockList.push(block);
        block = new Block(COLORS[4], 6, 0, tetrisGame);
        this.blockList.push(block);
        this.isHorizontal = true;
    }

    rotateRight() {this.sameRotate()}

    rotateLeft() {this.sameRotate()}

    sameRotate() {
        if (this.isHorizontal) {
            let beta = Math.PI/2;
            this.rotate(beta);
        } else {
            let beta = -Math.PI/2;
            this.rotate(beta);
        }
        this.isHorizontal = !this.isHorizontal;
    }
}

export class J_Block extends Tetromino {
    constructor(tetrisGame) {
        super();
        let block;
        block = new Block(COLORS[5], 3, 0, tetrisGame);
        this.blockList.push(block);
        block = new Block(COLORS[5], 4, 0, tetrisGame);
        this.origin = block;
        this.blockList.push(block);
        block = new Block(COLORS[5], 5, 0, tetrisGame);
        this.blockList.push(block);
        block = new Block(COLORS[5], 5, 1, tetrisGame);
        this.blockList.push(block);
    }
}

export class L_Block extends Tetromino {
    constructor(tetrisGame) {
        super();
        let block;
        block = new Block(COLORS[1], 3, 0, tetrisGame);
        this.blockList.push(block);
        block = new Block(COLORS[1], 4, 0, tetrisGame);
        this.origin = block;
        this.blockList.push(block);
        block = new Block(COLORS[1], 5, 0, tetrisGame);
        this.blockList.push(block);
        block = new Block(COLORS[1], 3, 1, tetrisGame);
        this.blockList.push(block);
    }
}

export class O_Block extends Tetromino {
    constructor(tetrisGame) {
        super();
        let block;
        block = new Block(COLORS[2], 5, 1, tetrisGame);
        this.blockList.push(block);
        block = new Block(COLORS[2], 4, 0, tetrisGame);
        this.origin = block;
        this.blockList.push(block);
        block = new Block(COLORS[2], 5, 0, tetrisGame);
        this.blockList.push(block);
        block = new Block(COLORS[2], 4, 1, tetrisGame);
        this.blockList.push(block);
    }

    rotateRight() {}

    rotateLeft() {}
}

export class S_Block extends Tetromino {
    constructor(tetrisGame) {
        super();
        let block;
        block = new Block(COLORS[3], 4, 1, tetrisGame);
        this.blockList.push(block);
        block = new Block(COLORS[3], 4, 0, tetrisGame);
        this.origin = block;
        this.blockList.push(block);
        block = new Block(COLORS[3], 5, 0, tetrisGame);
        this.blockList.push(block);
        block = new Block(COLORS[3], 3, 1, tetrisGame);
        this.blockList.push(block);
        this.isHorizontal = true;
    }

    rotateRight() {this.sameRotate()}

    rotateLeft() {this.sameRotate()}

    sameRotate() {
        if (this.isHorizontal) {
            let beta = -Math.PI/2;
            this.rotate(beta);
        } else {
            let beta = Math.PI/2;
            this.rotate(beta);
        }
        this.isHorizontal = !this.isHorizontal;
    }
}

export class T_Block extends Tetromino {
    constructor(tetrisGame) {
        super();
        let block;
        block = new Block(COLORS[6], 3, 0, tetrisGame);
        this.blockList.push(block);
        block = new Block(COLORS[6], 4, 0, tetrisGame);
        this.origin = block;
        this.blockList.push(block);
        block = new Block(COLORS[6], 5, 0, tetrisGame);
        this.blockList.push(block);
        block = new Block(COLORS[6], 4, 1, tetrisGame);
        this.blockList.push(block);
    }
}

export class Z_Block extends Tetromino {
    constructor(tetrisGame) {
        super();
        let block;
        block = new Block(COLORS[0], 4, 1, tetrisGame);
        this.blockList.push(block);
        block = new Block(COLORS[0], 4, 0, tetrisGame);
        this.origin = block;
        this.blockList.push(block);
        block = new Block(COLORS[0], 5, 1, tetrisGame);
        this.blockList.push(block);
        block = new Block(COLORS[0], 3, 0, tetrisGame);
        this.blockList.push(block);
        this.isHorizontal = true;
    }

    rotateRight() {this.sameRotate()}

    rotateLeft() {this.sameRotate()}

    sameRotate() {
        if (this.isHorizontal) {
            let beta = -Math.PI/2;
            this.rotate(beta);
        } else {
            let beta = Math.PI/2;
            this.rotate(beta);
        }
        this.isHorizontal = !this.isHorizontal;
    }
}