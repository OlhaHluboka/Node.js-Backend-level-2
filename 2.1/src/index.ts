// 1. 

function getFirstWord(a: string) {
    return a.split(/ +/)[0].length;
}

// 2. 

function getUserNamings(a: { name: string; surname: string }) {
    return {
        fullname: a.name + " " + a.surname,
        initials: a.name[0] + "." + a.surname[0]
    };
}

// 3. 

// <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining>
function getAllProductNames(a: { products: Array<{ name: string }>; }) {
    return a?.products?.map(prod => prod?.name) || [];
}

// 4.1

// easy way is using 'as' keyword
// hard way is ?...
function hey(a: { name(): string, [index: string]: any; }) {

    return "hey! i'm " + a.name();
}
hey({ name: () => "roma", cuteness: 100 })
hey({ name: () => "vasya", coolness: 100 })

// 4.2

abstract class Pet {
    protected nickName:string;
    protected addInfo:any;

    constructor(nickName:string, addInfo:any) {
        this.nickName = nickName;
        this.addInfo = addInfo;
    }

    abstract name(): any;
}

class Cat extends Pet {
    protected addInfo: boolean;
   
    constructor(nickName:string, addInfo:boolean) {
        super(nickName, addInfo);
        this.addInfo = addInfo;
    }

    name() {
        return Cat;
    }

}

class Dog extends Pet {
    protected addInfo: number;
   
    constructor(nickName:string, addInfo:number) {
        super(nickName, addInfo);
        this.addInfo = addInfo;
    }

    name() {
        return Dog;
    }

}

function hey1(abstractPet: any) {
    return "hey! i'm " + abstractPet.name();
}
let a = new Cat("myavchik", true)
let b = new Dog("gavchik", 333)
hey1(a)
hey1(b)

// 4.3

type Pets = {
    name(): string;
    type:string;
    cuteness?:number;
    coolness?:number;
}

function hey2(a:Pets) {
    return "hey! i'm " + a.name()
        + (a.type === "cat" ? ("cuteness: " + a.cuteness) : ("coolness: " + a.coolness))
}
hey({ name: () => "roma", type: "cat", cuteness: 100 })
hey({ name: () => "vasya", type: "dog", coolness: 100 })

// 5.

// google for Record type
function stringEntries(a:Record<number,[]>) {
    return Array.isArray(a) ? a : Object.keys(a)
}

// 6.

// you don't know Promises and async/await yet. Or do you? 
// ....can be hard, don't worry and SKIP if you do not know how to do it

async function world(a:number) {
    return "*".repeat(a)
}
const hello = async () => {
    return await world(10)
}
hello().then(r => console.log(r)).catch(e => console.log("fail"))

// npm run build && npm run start