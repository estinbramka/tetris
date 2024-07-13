import {html, render} from 'https://esm.run/lit-html@1';
import '../tetrisGame/tetrisGame.js'

class tetrisGameController extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.draw();
    }

    connectedCallback() {
        document.addEventListener('keydown', this.keydown.bind(this));
    }

    draw() {
        const template = html`
        <tetris-game width="300"></tetris-game>
        `;
        render(template, this.shadowRoot);

        let tetrisGame = this.shadowRoot.querySelector("tetris-game");
        this.tetrisGame = tetrisGame;
    }

    keydown(e) {
        //console.log(e.keyCode)
        switch (e.keyCode) {
            case 37://left arrow
            this.tetrisGame.state.tetromino.current.moveLeft();
                break;
            case 39://right arrow
            this.tetrisGame.state.tetromino.current.moveRight();
                break;
            case 38://up arrow
            this.tetrisGame.state.tetromino.current.rotateRight();
                break;
            case 32://space
            this.tetrisGame.state.tetromino.current.hardDrop();
                break;
            default:
                break;
        }
    }
}

customElements.define("tetris-game-controller", tetrisGameController);