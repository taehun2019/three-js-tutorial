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
    static loopAudios: THREE.Audio[] = [];
    static oneShotAudios: THREE.Audio[] = [];

    static sounds = new Map<string, AudioBuffer>();
    
    static register(name: string, url: string, finishAction: Function | undefined = undefined) {
        if (SoundManager.sounds.has(name) === true) {
            finishAction && finishAction();
            return;
        }
        AssetManager.getInstance().loadAudio(url, (value: AudioBuffer) => {
            this.sounds.set(name, value);
            finishAction && finishAction();
        });
    }

    static pause() {
        SoundManager.loopAudios.forEach(loopAudio => {
            loopAudio.pause();
        });
    }
    static resume() {
        SoundManager.loopAudios.forEach(loopAudio => {
            loopAudio.play();
        });
    }

    static stop(name: string) {
        // console.log(`try to stop sound ${name}`);
        const soundBuffer = SoundManager.sounds.get(name) as AudioBuffer;
        SoundManager.loopAudios.forEach(loopAudio => {
            if (loopAudio.buffer === soundBuffer) {
                loopAudio.stop();
                loopAudio.buffer = null;
                // console.log(`stop sound ${name}`);
                return;
            }
        });
    }

    static checkPlaying(name: string) {
        let result = false;
        const soundBuffer = SoundManager.sounds.get(name) as AudioBuffer;
        SoundManager.loopAudios.forEach(loopAudio => {
            if (loopAudio.buffer === soundBuffer && loopAudio.context.state === 'running') {
                // console.log(`${name} is being played`);
                result = true;
            }
        });
        return result;
    }

    static play(name: string, loop = false, volume = 1) {
        // console.log(`SoundManager.play ${name}`);
        if (SoundManager.sounds.has(name) === false) {
            // console.log(`no sound named ${name}`);
            return;
        }
        const soundBuffer = SoundManager.sounds.get(name) as AudioBuffer;
        let selectedAudio: THREE.Audio | undefined = undefined;
        if (loop === true) {
            if (SoundManager.checkPlaying(name) === true)
                return;

            SoundManager.loopAudios.some((loopAudio) => {
                if (loopAudio.context.state !== 'running') {
                    selectedAudio = loopAudio;
                    return true;
                }
                return false;
            });
            if (selectedAudio === undefined) {
                selectedAudio = new THREE.Audio(SoundManager.audioListener);
                SoundManager.loopAudios.push(selectedAudio);
            }
            selectedAudio.setBuffer(soundBuffer);
            selectedAudio.play();
            selectedAudio.setVolume(volume);
            selectedAudio.setLoop(true);
        }
        else {
            SoundManager.oneShotAudios.some((oneShotAudio) => {
                if (oneShotAudio.context.state !== 'running') {
                    selectedAudio = oneShotAudio;
                    return true;
                }
                return false;
            });
            if (selectedAudio === undefined) {
                selectedAudio = new THREE.Audio(SoundManager.audioListener);
                SoundManager.oneShotAudios.push(selectedAudio);
            }
            selectedAudio.setBuffer(SoundManager.sounds.get(name) as AudioBuffer);
            selectedAudio.play();
        }
    }
}