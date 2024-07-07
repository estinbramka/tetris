
export class Block {
    constructor(color, x, y, tetrisGame) {
        this.color=color;
        this.x=x;
        this.y=y;
        this.tetrisGame=tetrisGame;
    }

    update() {
        let pixelX = this.x * this.tetrisGame.state.blockDim.width;
        let pixelY = this.y * this.tetrisGame.state.blockDim.height;
        this.tetrisGame.ctx.fillStyle = this.color;
        this.tetrisGame.ctx.fillRect(pixelX, pixelY, this.tetrisGame.state.blockDim.width, this.tetrisGame.state.blockDim.height);
    }
}