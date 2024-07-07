import {html, render} from 'https://esm.run/lit-html@1';
import { Block } from './Block.js';

class tetrisGame extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
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
        //console.log(this.state);
    }

    draw() {
        const template = html`
        <div class="mainContainer">
            <canvas id="tetrisCanvas" width="${this.state.canvasDim.width}" height="${this.state.canvasDim.height}" style="border:1px solid #000000;"></canvas>
        </div>
        `;
        render(template, this.shadowRoot);

        let c = this.shadowRoot.querySelector("#tetrisCanvas");
        let ctx = c.getContext("2d");
        this.ctx = ctx;
    }

    startGame() {
        this.block = new Block('red',0,0,this);
        window.requestAnimationFrame(this.updateGameAreaBind);
    }

    update(timeStamp) {
        //this.block.x = parseInt(timeStamp/1000);
        this.block.update();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.state.canvasDim.width, this.state.canvasDim.height);
    }

    updateGameAreaBind = this.updateGameArea.bind(this);
    updateGameArea(timeStamp) {
        this.clear();
        this.update(timeStamp);
        window.requestAnimationFrame(this.updateGameAreaBind);
    }
}

customElements.define("tetris-game", tetrisGame);