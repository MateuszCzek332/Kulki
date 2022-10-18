import { Field } from "./Field";
import { Ball } from "./Ball";

export class Board {
    public width: number;
    public height: number;
    public fields: Field[][];
    public html: HTMLDivElement;
    public ballsDiv: HTMLDivElement;
    public qBalls: Ball[] = []
    constructor() {
        this.fields = []
        this.width = 9;
        this.height = 9;
        this.init()
    }

    init = () => {
        this.createBoard()
        this.createBallsQ()
    }

    createBoard = () => {
        this.html = document.createElement("div")

        this.html.className = "board"
        for (let i: number = 0; i < this.height; i++) {
            this.fields[i] = []
            for (let j = 0; j < this.width; j++) {
                let f: Field = new Field(i, j)
                this.fields[i][j] = f
                this.html.appendChild(f.html)
            }
        }
        document.body.appendChild(this.html)
        console.log(this.fields[0][0])
    }

    createBallsQ = () => {
        this.ballsDiv = document.createElement("div");
        document.body.appendChild(this.ballsDiv)
        this.ballsToQ()
        this.spawnBalls()
    }

    ballsToQ = () => {
        for (let i: number = 0; i < 3; i++) {
            let b = new Ball()
            this.qBalls[i] = b
            this.ballsDiv.appendChild(b.html)
        }
    }

    spawnBalls = () => {
        let i: number = 0
        while (i < this.qBalls.length) {
            let x: number = Math.floor(Math.random() * this.width)
            let y: number = Math.floor(Math.random() * this.height)
            //if()
            // console.log(this.fields[x][y])
            this.fields[x][y].html.appendChild(this.qBalls[i].html)
            i++
        }
        this.ballsToQ()
    }
}