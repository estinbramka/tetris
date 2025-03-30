import {html, render} from 'https://esm.run/lit-html@1';
import { GameState } from './GameState.js';
import { setupGameState } from './testTetrisGame.js';

class tetrisGame extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.gameState = new GameState(this);
        this.state = {};
        this.initState();
        this.draw();
        this.startGame();
    }

    connectedCallback() {
        //console.log("Custom element added to page.");
    }

    initState() {
        let canvasWidth;
        let canvasHeight;
        let blockWidth;
        let blockHeight;
        let verticalBlocksNum = 18;
        let horizontalBlocksNum = 10;

        if(this.getAttribute('width')) {
            canvasWidth = parseInt(this.getAttribute('width'));
        } else {
            canvasWidth = 400;
        }
        canvasHeight = (canvasWidth / horizontalBlocksNum) * verticalBlocksNum;
        this.state.canvasDim = {
            width: canvasWidth,
            height: canvasHeight,
        };

        blockWidth = blockHeight = canvasWidth / horizontalBlocksNum;
        this.state.blockDim = {
            width: blockWidth,
            height: blockHeight,
        };
        
        this.state.blockNums = {
            width: horizontalBlocksNum,
            height: verticalBlocksNum,
        };

        this.state.dropIntervalDelay = {
            default: 1000,
            soft: 300,
            hard: 5,
        };

        this.state.tetromino = {
            current: null,
            next: null,
        }

        this.state.timeStamp = 0;

        this.state.nextTetrominoCanvasDim = {
            width: blockWidth * 5,
            height: blockHeight * 5,
        };
        //console.log(this.state);
    }

    draw() {
        const template = html`
        <style>
            canvas {
                border: 1px solid #000000;
            }
            .mainContainer {
                display: flex;
                align-items: flex-start;
                gap: 10px;
            }
        </style>
        <div class="mainContainer d-flex">
            <canvas id="tetrisCanvas" width="${this.state.canvasDim.width}" height="${this.state.canvasDim.height}"></canvas>
            <canvas id="nextTetrominoCanvas" width="${this.state.nextTetrominoCanvasDim.width}" height="${this.state.nextTetrominoCanvasDim.height}"></canvas>
        </div>
        `;
        render(template, this.shadowRoot);

        let c = this.shadowRoot.querySelector("#tetrisCanvas");
        let ctx = c.getContext("2d");
        this.ctx = ctx;

        let cNextTetromino = this.shadowRoot.querySelector("#nextTetrominoCanvas");
        let ctxNextTetromino = cNextTetromino.getContext("2d");
        this.ctxNextTetromino = ctxNextTetromino;
    }

    startGame() {
        //setupGameState(this,0);
        this.state.timeStamp = 0;
        window.requestAnimationFrame(this.updateGameAreaBind);
    }

    update() {
        this.gameState.updateLogic();
        this.gameState.renderBlocks();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.state.canvasDim.width, this.state.canvasDim.height);
    }

    updateGameAreaBind = this.updateGameArea.bind(this);
    updateGameArea(timeStamp) {
        if(this.state.timeStamp === 0) {
            this.state.timeStamp = timeStamp;
            this.gameState.createNewTetromino();
        } else {
            this.state.timeStamp = timeStamp;
        }
        this.clear();
        this.update();
        window.requestAnimationFrame(this.updateGameAreaBind);
    }
}

customElements.define("tetris-game", tetrisGame);