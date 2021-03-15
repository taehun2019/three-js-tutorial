import * as THREE from "three";
import AssetManager from "./AssetManager";

export default class SoundManager {
    private static instance: SoundManager;
    static getInstance() { 
        if (!SoundManager.instance) { 
            SoundManager.instance = new SoundManager(); 
        } 
        return SoundManager.instance; 
    }

    static audioListener = new THREE.AudioListener();
    static audio = new THREE.Audio(SoundManager.audioListener);

    static sounds = new Map<string, AudioBuffer>();

    constructor() {
        // this.audio = 
    }

    static register(name: string, url: string, finishAction: Function | undefined = undefined) {
        AssetManager.getInstance().loadAudio(url, (value: AudioBuffer) => {
            this.sounds.set(name, value);
            if (finishAction !== undefined) 
                finishAction();
        });
    }

    static play(name: string) {
        if (SoundManager.sounds.has(name) === false)
            return;
        SoundManager.audio.setBuffer(SoundManager.sounds.get(name) as AudioBuffer);
        SoundManager.audio.play();

        // AssetManager.getInstance().loadAudio(this.sounds.get(name) as string, (value: AudioBuffer) => {
        //     this.audio.setBuffer(value);
        //     this.audio.play();
        // });
    }
}