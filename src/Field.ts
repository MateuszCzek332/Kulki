import { Ball } from "./Ball";
import { Board } from "./Board";

export class Field {
    public x: number;
    public y: number;
    public html: HTMLDivElement;
    public ball: Ball = null;
    public pf
    public val: number = 0;
    public visited: boolean = false
    constructor(i: number, j: number, pf: any) {
        this.x = i;
        this.y = j;
        this.html = document.createElement("div");
        // this.html.addEventListener("click", () => { pf() });
        this.pf = () => { pf() }
        this.html.addEventListener("click", this.onClick);
        this.html.className = "field";
        this.html.id = i + '-' + j;

    }

    spawnBall = (b: Ball) => {
        this.html.appendChild(b.html);
        this.ball = b;

    }

    onClick = () => {

        if (this.ball == null) {
            Board.lastField = this;
            //console.log(Board.lastField)
            this.pf()
        }
        if (this.ball != null) {
            switch (Board.firstField) {
                case null:
                    this.ball.select();
                    Board.firstField = this;
                    break;
                case this:
                    this.ball.unSelect();
                    Board.firstField = null;
                    break;
                default:
                    Board.firstField.ball.unSelect();
                    this.ball.select();
                    Board.firstField = this;
            }
        }
    }
}