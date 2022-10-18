import { Ball } from "./Ball";

export class Field {
    public html: HTMLDivElement;
    constructor(i: number, j: number) {
        this.html = document.createElement("div")
        this.html.className = "field"
        this.html.id = i + '-' + j
    }
}