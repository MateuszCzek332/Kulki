import { Field } from "./Field";
import { Ball } from "./Ball";

export class Board {
    static move: boolean = true;
    public queue: Field[] = []
    public path: Field[] = []
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
            this.queue[0].val = 1
            while (this.queue.length > 0) {
                if (Board.lastField == this.queue[0]) {
                    this.queue[0].html.style.backgroundColor = "blue"
                    // this.queue[0].html.innerText = "M"
                    this.goBack()
                    break;
                }
                this.queue[0].visited = true
                // this.queue[0].html.style.backgroundColor = "red"
                // this.queue[0].html.innerText = this.queue[0].val.toString()
                this.dodajSasiadow(this.queue[0].val + 1)
                this.queue.shift()
            }
        }
    }

    goBack = () => {
        this.path = []
        let min = Board.lastField
        min.val = 20;
        do {
            let newmin = new Field(0, 0, 0)
            if (min.x + 1 < this.width && this.fields[min.x + 1][min.y].val > 0 && this.fields[min.x + 1][min.y].val < min.val) {
                newmin = this.fields[min.x + 1][min.y]
            }
            if (min.x - 1 >= 0 && this.fields[min.x - 1][min.y].val > 0 && this.fields[min.x - 1][min.y].val < min.val) {
                newmin = this.fields[min.x - 1][min.y]
            }
            if (min.y + 1 < this.height && this.fields[min.x][min.y + 1].val > 0 && this.fields[min.x][min.y + 1].val < min.val) {
                newmin = this.fields[min.x][min.y + 1]
            }
            if (min.y - 1 >= 0 && this.fields[min.x][min.y - 1].val > 0 && this.fields[min.x][min.y - 1].val < min.val) {
                newmin = this.fields[min.x][min.y - 1]
            }

            this.path.push(newmin)
            // newmin.html.style.backgroundColor = "green"

            if (newmin.val == 0 || newmin.val == 1)
                break

            min = newmin;
        }
        while (true)
        this.selectPath()
        this.moveball()
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

    moveball = () => {
        Board.move = false;
        console.log(Board.firstField.ball)
        console.log(Board.lastField)
        Board.lastField.spawnBall(Board.firstField.ball)
        Board.lastField.ball.unSelect()
        Board.firstField.ball = null
        Board.firstField = null
        // Board.lastField.ball.unSelect()
        // Board.firstField.ball = null
        setTimeout(() => { this.unselectPath() }, 1000)
    }

    selectPath = () => {
        this.path.forEach((el) => {
            el.html.style.backgroundColor = 'green'
        })
    }

    unselectPath = () => {
        this.path.forEach((el) => {
            el.html.style.backgroundColor = 'white'
        })
        Board.lastField.html.style.backgroundColor = 'white'
        Board.lastField = null;
        for (let i = 0; i < this.width; i++)
            for (let j = 0; j < this.height; j++) {
                this.fields[i][j].val = 0;
                this.fields[i][j].visited = false;
            }
        Board.move = true;
        this.spawnBalls()
    }
}