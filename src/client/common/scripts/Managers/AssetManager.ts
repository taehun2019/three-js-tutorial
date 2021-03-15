import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default class AssetManager {
    private static instance: AssetManager;
    static getInstance() { 
        if (!AssetManager.instance) { 
            AssetManager.instance = new AssetManager(); 
        } 
        return AssetManager.instance; 
    }

    textures: Map<string, THREE.Texture>;
    gltfs: Map<string, GLTF>;
    audios: Map<string, AudioBuffer>;
    //https://basarat.gitbook.io/typescript/main-1/typed-event
    // finishLoadAction: EventEmitter;

    textureLoader: THREE.TextureLoader;
    gltfLoader: GLTFLoader;
    audioLoader: THREE.AudioLoader;

    constructor() {
        this.textures = new Map<string, THREE.Texture>();
        this.gltfs = new Map<string, GLTF>();
        this.audios = new Map<string, AudioBuffer>();
        // this.finishLoadAction = ()=>{};
        // this.finishLoadAction = new EventEmitter();

        this.textureLoader = new THREE.TextureLoader();
        this.gltfLoader = new GLTFLoader();
        this.audioLoader = new THREE.AudioLoader();
    }

    loadTexture(url: string, finishAction: Function) {
        if (this.textures.has(url) === true)
            finishAction(this.textures.get(url));
        else
            this.textureLoader.loadAsync(url, this.onProgress).then((value) => this.onFulfilled(value, url, finishAction), this.onRejected);
    }

    onProgress(event: ProgressEvent<EventTarget>) {
        // console.log(event.type);
    }
    onFulfilled(value: THREE.Texture, name: string, finishAction: Function) {
        // console.log('onFulfilled');
        this.textures.set(name, value);

        // this.finishLoadAction();
        // this.finishLoadAction.emit('finish');
        finishAction(value);
    }
    onRejected(reason: any) {
        console.log(reason.toString());
    }

    // gltf.scene으로 사용.
    loadGltf(url: string, finishAction: Function) {
        if (this.gltfs.has(url) === true)
            finishAction(this.gltfs.get(url));
        else
            this.gltfLoader.loadAsync(url, this.onProgress).then((value) => {
                this.gltfs.set(url, value);
                finishAction(value);
            });
    }

    loadAudio(url: string, finishAction: Function) {
        if (this.audios.has(url) === true)
            finishAction(this.audios.get(url));
        else
            this.audioLoader.loadAsync(url, this.onProgress).then((value) => {
                this.audios.set(url, value);
                finishAction(value);
            });
    }
}