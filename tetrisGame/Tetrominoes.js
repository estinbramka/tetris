import { Block } from "./Block.js";
import { COLORS } from "./Colors.js";

class Tetromino {
    constructor(tetrisGame) {
        this.tetrisGame = tetrisGame;
        this.blockList = [];
        this.lastUpdateDrop = 0;
        this.dropDelay = 0;
        this.freeze = false;
    }

    childConstructorComplete() {
        this.defaultDrop();
        this.lastUpdateDrop = this.tetrisGame.state.timeStamp;
    }

    moveRight() {
        if (this.freeze) {
            return;
        }
        this.blockList.forEach((bl)=> bl.x++);
        let isColliding = this.tetrisGame.gameState.checkCollision(this.blockList);
        if(isColliding) {
            this.blockList.forEach((bl)=> bl.x--);
        }
    }

    moveLeft() {
        if (this.freeze) {
            return;
        }
        this.blockList.forEach((bl)=> bl.x--);
        let isColliding = this.tetrisGame.gameState.checkCollision(this.blockList);
        if(isColliding) {
            this.blockList.forEach((bl)=> bl.x++);
        }
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
        if (this.freeze) {
            return false;
        }
        let didRotate = true;
        this.tryRotate(beta);
        let isColliding = this.tetrisGame.gameState.checkCollision(this.blockList);
        if(isColliding) {
            this.tryRotate(-beta);
            didRotate = false;
        }
        return didRotate;
    }

    tryRotate(beta) {
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

    defaultDrop() {
        if (this.tetrisGame.state.dropIntervalDelay.default < this.dropDelay) {
            this.lastUpdateDrop = this.tetrisGame.state.timeStamp - this.tetrisGame.state.dropIntervalDelay.default;
        }
        this.dropDelay = this.tetrisGame.state.dropIntervalDelay.default;
    }

    softDrop() {
        if (this.tetrisGame.state.dropIntervalDelay.soft < this.dropDelay) {
            this.lastUpdateDrop = this.tetrisGame.state.timeStamp - this.tetrisGame.state.dropIntervalDelay.soft;
        }
        this.dropDelay = this.tetrisGame.state.dropIntervalDelay.soft;
    }

    hardDrop() {
        if (this.tetrisGame.state.dropIntervalDelay.hard < this.dropDelay) {
            this.lastUpdateDrop = this.tetrisGame.state.timeStamp - this.tetrisGame.state.dropIntervalDelay.hard;
        }
        this.dropDelay = this.tetrisGame.state.dropIntervalDelay.hard;
    }

    async drop() {
        this.blockList.forEach((bl)=> bl.y++);
        let isColliding = this.tetrisGame.gameState.checkCollision(this.blockList);
        if(isColliding) {
            this.blockList.forEach((bl)=> bl.y--);
            this.freeze = true;
            await this.tetrisGame.gameState.checkLineDelete();
            this.tetrisGame.gameState.createNewTetromino();
            return false;
        }
        return true;
    }

    async updateDrop() {
        if (this.freeze) {
            return;
        }
        if(this.tetrisGame.state.timeStamp - this.lastUpdateDrop >= this.dropDelay) {
            let timePassedSinceLastUpdate = this.tetrisGame.state.timeStamp - this.lastUpdateDrop;
            let dropCount = Math.floor(timePassedSinceLastUpdate/this.dropDelay);
            for (let i = 0; i < dropCount; i++) {
                if (!await this.drop()) {
                    return;
                }
            }
            let timeLeft = timePassedSinceLastUpdate - dropCount*this.dropDelay;
            this.lastUpdateDrop = this.tetrisGame.state.timeStamp - timeLeft;
            //console.log(this.lastUpdateDrop);
        }
    }

    checkGameOver() {
        //console.log('checkGameOver');
        let isColliding = this.tetrisGame.gameState.checkCollision(this.blockList);
        if(isColliding) {
            this.freeze = true;
        }
    }
}

export class I_Block extends Tetromino {
    constructor(tetrisGame) {
        super(tetrisGame);
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
        this.childConstructorComplete();
    }

    rotateRight() {this.sameRotate()}

    rotateLeft() {this.sameRotate()}

    sameRotate() {
        let didRotate;
        if (this.isHorizontal) {
            let beta = Math.PI/2;
            didRotate = this.rotate(beta);
        } else {
            let beta = -Math.PI/2;
            didRotate = this.rotate(beta);
        }
        if (didRotate) {
            this.isHorizontal = !this.isHorizontal;
        }
    }
}

export class J_Block extends Tetromino {
    constructor(tetrisGame) {
        super(tetrisGame);
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
        this.childConstructorComplete();
    }
}

export class L_Block extends Tetromino {
    constructor(tetrisGame) {
        super(tetrisGame);
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
        this.childConstructorComplete();
    }
}

export class O_Block extends Tetromino {
    constructor(tetrisGame) {
        super(tetrisGame);
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
        this.childConstructorComplete();
    }

    rotateRight() {}

    rotateLeft() {}
}

export class S_Block extends Tetromino {
    constructor(tetrisGame) {
        super(tetrisGame);
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
        this.childConstructorComplete();
    }

    rotateRight() {this.sameRotate()}

    rotateLeft() {this.sameRotate()}

    sameRotate() {
        let didRotate;
        if (this.isHorizontal) {
            let beta = -Math.PI/2;
            didRotate = this.rotate(beta);
        } else {
            let beta = Math.PI/2;
            didRotate = this.rotate(beta);
        }
        if (didRotate) {
            this.isHorizontal = !this.isHorizontal;
        }
    }
}

export class T_Block extends Tetromino {
    constructor(tetrisGame) {
        super(tetrisGame);
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
        this.childConstructorComplete();
    }
}

export class Z_Block extends Tetromino {
    constructor(tetrisGame) {
        super(tetrisGame);
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
        this.childConstructorComplete();
    }

    rotateRight() {this.sameRotate()}

    rotateLeft() {this.sameRotate()}

    sameRotate() {
        let didRotate;
        if (this.isHorizontal) {
            let beta = -Math.PI/2;
            didRotate = this.rotate(beta);
        } else {
            let beta = Math.PI/2;
            didRotate = this.rotate(beta);
        }
        if (didRotate) {
            this.isHorizontal = !this.isHorizontal;
        }
    }
}