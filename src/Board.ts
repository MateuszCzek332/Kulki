import { Field } from "./Field";
import { Ball } from "./Ball";
import { hasHtml } from "./hasHtml";
import { chat } from "./chat";

export class Board implements hasHtml {
    static move: boolean = true;
    static firstField: Field = null;
    static lastField: Field = null;
    private readonly width: number;
    private readonly height: number;
    private fields: Field[][] = [];
    private queue: Field[] = [];
    private path: Field[] = [];
    private qBalls: Ball[] = [];
    public html: HTMLDivElement;
    private ballsDiv: HTMLDivElement;
    private chatDiv: HTMLDivElement;
    /**
     * inicjowanie wartoci wysokosci i szerokosci, wywolanie funki init - tworzenie elementow na stronie
     */
    constructor() {
        this.width = 9;
        this.height = 9;
        this.init();
    }
    /**
     * wywowanie metod tworzacych na starcie
     */
    init = () => {
        this.createBoard();
        this.createBallsQ();
        this.createChat();
    }
    /**
     * Tworzenie tablicy 9x9, dodawanie jej do tablicy i html'a
     */
    createBoard = () => {
        this.html = document.createElement("div");
        this.html.className = "board";
        for (let i: number = 0; i < this.height; i++) {
            this.fields[i] = [];
            for (let j = 0; j < this.width; j++) {
                let f: Field = new Field(i, j, () => { this.findPath() }, () => { this.unselectPath() }, () => { this.moveball() }, (x: number, y: number): Boolean => { return this.checkBall(x, y) });
                this.fields[i][j] = f;
                this.html.appendChild(f.html);
            }
        }
        document.body.appendChild(this.html);
    }

    /**
     * Tworzenie kolejki nastepnych kulek, pierwszy sppanw kulek na planszy
     */
    createBallsQ = () => {
        this.ballsDiv = document.createElement("div");
        document.body.appendChild(this.ballsDiv);
        this.ballsToQ();
        this.spawnBalls();
    }

    /**
     * tworzenie czatu
     */
    createChat = () => {
        this.chatDiv = document.createElement("div");
        this.chatDiv.className = "chat"
        document.body.appendChild(this.chatDiv);
    }

    /**
     * Dodawanie kulek do kolejki
     */
    ballsToQ = () => {

        for (let i: number = 0; i < 3; i++) {
            let b = new Ball();
            this.qBalls[i] = b;
            this.ballsDiv.appendChild(b.html);
        }
    }

    /**
     * Spawn kulekk z kkolejki w losowym miejscu na planszy, dobranie kolejnych kulek do kolejki
     */
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

    /**
     * Funkcja sprawdza czy mozna wykonac ruch kulka na polu o podanych wspolrzednych
     * @param x wspolrzedna x sprawdzanego pola 
     * @param y wspolrzedna y sprawdzanego pola
     * @returns czy mozna zaznaczyc kulke(true/false) - mozna tylko wtedy gdy jakies pole obok jest wolne - czytaj mozna wykonac jakikolwiek ruch
     */
    checkBall = (x: number, y: number): Boolean => {
        switch (true) {
            case x + 1 < this.width && this.fields[x + 1][y].ball == null:
                return true;
            case x - 1 >= 0 && this.fields[x - 1][y].ball == null:
                return true;
            case y + 1 < this.height && this.fields[x][y + 1].ball == null:
                return true;
            case y - 1 >= 0 && this.fields[x][y - 1].ball == null:
                return true;
            default:
                return false;
        }
    }
    /**
     * główna fynkja path findingu, nadaje polom value - ilosc skokow od pierwszego pola, zatrzymuje sie gdy trafi na stanie pole
     * Po czym wywoluje funkcje goBack
     */
    findPath = () => {
        if (Board.firstField != null) {
            this.queue = [Board.firstField,]
            this.queue[0].val = 1
            while (this.queue.length > 0) {
                if (Board.lastField == this.queue[0]) {
                    this.queue[0].html.style.backgroundColor = "blue"
                    this.goBack()
                    break;
                }
                this.queue[0].visited = true
                this.addNeighbors(this.queue[0].val + 1)
                this.queue.shift()
            }
        }
    }
    /**
     * poprzez znajdywanie najmniejszej wartosci wyznacza sciezke od pola koncowego do poczatkowego
     */
    goBack = () => {
        this.path = []
        let min = Board.lastField
        min.val = 40;
        do {
            let newmin = new Field(0, 0)
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

            if (newmin.val == 0 || newmin.val == 1)
                break

            min = newmin;
        }
        while (true)
        this.selectPath()
    }
    /**
     * nadaje wartosci sasiada sprawdzanego pola(o ile istnieja) oraz dodaje ich do kolejki sprawdzanych pol
     * @param i wartosc jaka zosranie przypisana sasiadom
     */
    addNeighbors = (i: number) => {
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
    /**
     * rusza kulka z pola poczatkowego do koncowegpo(o ile sciezka zostala znaleziona - dlugosc sciezki wieksza od 0) 
     */
    @chat
    moveball() {
        Board.move = false;
        if (this.path.length > 0) {

            Board.lastField.spawnBall(Board.firstField.ball)
            Board.lastField.ball.unSelect()
            Board.firstField.ball = null
            Board.firstField = null
            setTimeout(() => {
                Board.move = true
                this.unselectPath()
                this.spawnBalls()
            }, 1000)
        }
    }
    /**
     * zanaczenie znalezionej sciezki
     */
    selectPath = () => {
        this.path.forEach((el) => {
            el.html.style.backgroundColor = 'green'
        })
    }
    /**
     * odznaczenie sciezki - wyzerowanie wartosci - przugotowanie do ponownego wyznaczania sciezki
     */
    unselectPath = () => {
        if (Board.move) {
            this.path.push(Board.lastField)
            this.path.forEach((el) => {
                el.html.style.backgroundColor = 'white'
            })
            Board.lastField = null;
            for (let i = 0; i < this.width; i++)
                for (let j = 0; j < this.height; j++) {
                    this.fields[i][j].val = 0;
                    this.fields[i][j].visited = false;
                }
            Board.move = true;
        }
    }
}

