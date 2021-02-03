//https://skarlsla.tistory.com/31
export default class Singleton { 
    private static instance: Singleton; 
    constructor() { 
        console.log("Singleton.constructor");
    }
    static getInstance() { 
        if (!Singleton.instance) { 
            Singleton.instance = new Singleton(); 
        } 
        return Singleton.instance; 
    }
}
