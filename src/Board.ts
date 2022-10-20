import { Field } from "./Field";
import { Ball } from "./Ball";

export class Board {
    public queue: Field[] = []
    public visited: Field[] = []
    static firstField: Field = null;
    static lastField: Field = null;
    public width: number;
    public height: number;
    public fields: Field[][];
    public html: HTMLDivElement;
    public ballsDiv: HTMLDivElement;
    public qBalls: Ball[] = [];
    constructor() {
        this.fields = [];
        this.width = 9;
        this.height = 9;
        this.init();
    }

    init = () => {
        this.createBoard();
        this.createBallsQ();
    }

    createBoard = () => {
        this.html = document.createElement("div");
        this.html.className = "board";
        for (let i: number = 0; i < this.height; i++) {
            this.fields[i] = [];
            for (let j = 0; j < this.width; j++) {
                let f: Field = new Field(i, j, () => { this.findPath() });
                this.fields[i][j] = f;
                this.html.appendChild(f.html);
            }
        }
        document.body.appendChild(this.html);
    }

    createBallsQ = () => {
        this.ballsDiv = document.createElement("div");
        document.body.appendChild(this.ballsDiv);
        this.ballsToQ();
        this.spawnBalls();
    }

    ballsToQ = () => {
        for (let i: number = 0; i < 3; i++) {
            let b = new Ball();
            this.qBalls[i] = b;
            this.ballsDiv.appendChild(b.html);
        }
    }

    spawnBalls = () => {
        let i: number = 0;
        while (i < this.qBalls.length) {
            let x: number = Math.floor(Math.random() * this.width);
            let y: number = Math.floor(Math.random() * this.height);
            if (this.fields[x][y].ball == null) {
                this.fields[x][y].spawnBall(this.qBalls[i]);
                i++;
            }
        }
        this.ballsToQ();
    }

    findPath = () => {
        if (Board.firstField != null) {
            this.queue = [Board.firstField,]
            //this.visited = []
            // let x = this.queue[0].x
            // let y = this.queue[0].y
            // while
            // if (this.queue[0] == Board.lastField) {
            //     Board.lastField.html.style.backgroundColor = "blue"
            //     Board.lastField.html.innerText = "M";
            //     break
            // }
            while (this.queue.length > 0) {
                if (Board.lastField == this.queue[0]) {
                    this.queue[0].html.style.backgroundColor = "blue"
                    this.queue[0].html.innerText = "M"
                    break;
                }
                this.queue[0].visited = true
                this.queue[0].html.style.backgroundColor = "red"
                this.queue[0].html.innerText = this.queue[0].val.toString()
                this.dodajSasiadow(this.queue[0].val + 1)
                this.queue.shift()
            }


        }



    }

    dodajSasiadow = (i: number) => {
        let x = this.queue[0].x
        let y = this.queue[0].y

        if (x + 1 < this.width && !this.fields[x + 1][y].visited && this.fields[x + 1][y].ball == null) {
            this.fields[x + 1][y].val = i
            this.queue.push(this.fields[x + 1][y])
        }
        if (x - 1 >= 0 && !this.fields[x - 1][y].visited && this.fields[x - 1][y].ball == null) {
            this.fields[x - 1][y].val = i
            this.queue.push(this.fields[x - 1][y])
        }
        if (y + 1 < this.height && !this.fields[x][y + 1].visited && this.fields[x][y + 1].ball == null) {
            this.fields[x][y + 1].val = i
            this.queue.push(this.fields[x][y + 1])
        }
        if (y - 1 >= 0 && !this.fields[x][y - 1].visited && this.fields[x][y - 1].ball == null) {
            this.fields[x][y - 1].val = i
            this.queue.push(this.fields[x][y - 1])
        }
    }
}