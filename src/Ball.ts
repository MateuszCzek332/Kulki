export class Ball {
    static collors: string[] = ['red', 'orange', 'yellow', 'green', 'blue', 'black', 'white'];
    public html: HTMLDivElement;
    public color: number;
    constructor() {
        this.html = document.createElement("div");
        this.html.className = "ball";
        this.color = Math.floor(Math.random() * Ball.collors.length);
        this.html.style.backgroundColor = Ball.collors[this.color];
    }

    select = () => {
        this.html.style.width = "38px";
        this.html.style.height = "38px";
        this.html.style.margin = "3px"
    }

    unSelect = () => {
        this.html.style.width = "30px";
        this.html.style.height = "30px";
        this.html.style.margin = "7px"
    }
}