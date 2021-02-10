import * as EventEmitter from 'events';
import * as THREE from 'three';

export default class AssetManager {
    private static instance: AssetManager;
    static getInstance() { 
        if (!AssetManager.instance) { 
            AssetManager.instance = new AssetManager(); 
        } 
        return AssetManager.instance; 
    }

    textures: Map<string, THREE.Texture>;
    //https://basarat.gitbook.io/typescript/main-1/typed-event
    // finishLoadAction: EventEmitter;

    textureLoader: THREE.TextureLoader;

    constructor() {
        this.textures = new Map<string, THREE.Texture>();
        // this.finishLoadAction = ()=>{};
        // this.finishLoadAction = new EventEmitter();

        this.textureLoader = new THREE.TextureLoader();
    }

    load(url: string, finishAction: Function) {
        if (this.textures.has(url) == true)
            finishAction(this.textures.get(url));
        else
            this.textureLoader.loadAsync(url, this.onProgress).then((value) => this.onFulfilled(value, url, finishAction), this.onRejected);
    }

    onProgress(event: ProgressEvent<EventTarget>) {
        // console.log(event.type);
    }
    onFulfilled(value: THREE.Texture, name: string, finishAction: Function) {
        console.log('onFulfilled');
        this.textures.set(name, value);

        // this.finishLoadAction();
        // this.finishLoadAction.emit('finish');
        finishAction(value);
    }
    onRejected(reason: any) {
        console.log(reason.toString());
    }
}