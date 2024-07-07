import {html, render} from 'https://esm.run/lit-html@1';

class tetrisGame extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.state = {};
        this.initState();
        this.draw();
        this.setupCanvas();
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
    }

    setupCanvas (){
        let c = this.shadowRoot.querySelector("#tetrisCanvas");
        let ctx = c.getContext("2d");
        ctx.beginPath();
        ctx.arc(95, 50, 40, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

customElements.define("tetris-game", tetrisGame);