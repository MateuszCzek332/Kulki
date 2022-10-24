export function chat(target: Object, name: string, descriptor: PropertyDescriptor) {
    const flametxt: string[] = ["cienko idzie", "hehe pudełko", "coś ty zribił? XD", "LAMA!!!", "NOOB"]
    /*    console.log(target, name, descriptor);
    
        descriptor.value = function () { //nadpisuję oryginał
            console.log("blah");
            return ("nadpisana metoda");
        }
    */

    let oryg = descriptor.value; // zapisuję oryginał metody
    descriptor.value = function (...args: any[]) { // tworzę nową metodę mając dostęp do this i argumentów oryginalnej
        console.log("args:", args);
        console.log("this:", this);

        // dekoruję
        console.log(this.chatDiv)
        this.chatDiv.innerText = flametxt[Math.floor(Math.random() * flametxt.length)]

        setTimeout(() => {
            this.chatDiv.innerText = ""
        }, 2000)

        let result = oryg.apply(this, args); // "wykonuję" starą
        return result;
    }
}