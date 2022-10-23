import { Ball } from "./Ball";
import { Board } from "./Board";
import { hasHtml } from "./hasHtml";

export class Field implements hasHtml {
    public readonly x: number;
    public readonly y: number;
    public html: HTMLDivElement;
    public ball: Ball = null;
    private pf
    private clear
    private move
    private check
    public val: number = 0;
    public visited: boolean = false
    /**
     * 
     * @param i wspolrzedna x w tablicy rodzica 
     * @param j wspolrzedna y w talblicy rodzica
     * @param pf funkcja odpowiadajaca za znalezienie sciezki 
     * @param clear funkcja czyszczaca tablice rodzica
     * @param move ruch kulki 
     * @param check sprawdzenie czy kulka ma dostepne ruchy
     */
    constructor(i: number, j: number, pf?: any, clear?: any, move?: any, check?: any) {
        this.x = i;
        this.y = j;
        this.html = document.createElement("div");

        this.pf = () => { pf() }
        this.clear = () => { clear() }
        this.move = () => { move() }
        this.check = (): boolean => { return check(this.x, this.y) }
        this.html.addEventListener("mouseenter", this.mouseIn);
        this.html.addEventListener("mouseleave", this.mouseOut);
        this.html.addEventListener("click", this.onClick);
        this.html.className = "field";
        this.html.id = i + '-' + j;

    }
    /**
     * evet przy najechaniu na pole znalezienie sciezki do pola od wybranej kulki (o ile istnieje)
     */
    private mouseIn = () => {
        Board.lastField = this;
        this.pf()
    }

    /**
     * odznaczenie zaznaczonej sciezki po opuszeczeniu danego pola
     */
    private mouseOut = () => {
        if (Board.move)
            Board.lastField = this;

        this.clear()
    }

    /**
     * funkcja ktora na podanym polu generuje podana w argumencie kulke 
     * @param b kulka ktora ma zostac wygenerowana na tym polu 
     */
    public spawnBall = (b: Ball) => {
        this.html.appendChild(b.html);
        this.ball = b;
    }

    /**
     * funkcja obslugujaca klikniecie na pole
     * Jezeli nie ma na polu kulki to wykonaj ruch kulki z pola poczatkowego(jezeli mozliwy)
     * jezli to pole to pole poczatkowe to zaznacz/odnacz kulke
     * jezeli na tym polu jest kulka to odznacz kulke na poprzednim poczatkowym(o ile takie istnialo) i ustaw to jako poczatkowe 
     */
    private onClick = () => {

        if (this.ball == null && Board.move) {
            this.move()
        }
        else if (this.ball != null) {
            switch (Board.firstField) {
                case null:
                    if (Board.move && this.check()) {
                        this.ball.select();
                        Board.firstField = this;
                    }
                    break;
                case this:
                    this.ball.unSelect();
                    Board.firstField = null;
                    break;
                default:
                    if (this.check()) {
                        Board.firstField.ball.unSelect();
                        this.ball.select();
                        Board.firstField = this;
                    }
            }
        }
    }
}