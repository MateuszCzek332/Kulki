export class Ball {
    static collors: string[] = ['red', 'orange', 'yellow', 'green', 'blue', 'black', 'white'];
    public html: HTMLDivElement;
    public color: number;
    constructor() {
        this.html = document.createElement("div")
        this.html.className = "ball"
        this.color = Math.floor(Math.random() * Ball.collors.length)
        this.html.style.backgroundColor = Ball.collors[this.color]
    }
}