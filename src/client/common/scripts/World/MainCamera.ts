import * as THREE from 'three';
import ConfettiEffect from './ConfettiEffect';
// import { THREE } from 'enable3d';
import GUIManager from '../Managers/GUIManager';
import { Vector3 } from 'three';

export enum CameraState {
    Init,
    Start,
    End,
}

export default class MainCamera extends THREE.Object3D {
    pivot: THREE.Object3D;
    camera: THREE.PerspectiveCamera;
    target: THREE.Object3D;

    state: CameraState;

    confettiEffects: ConfettiEffect[] = [];
    showConfettiEffects = false;
    shotConfettiEffect = false;
    curShotConfettiEffectIndex = 0;

    constructor() {
        super();
        this.pivot = new THREE.Object3D();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        // scene.add(this);
        this.add(this.pivot);
        this.pivot.add(this.camera);

        // this.parent = scene;
        this.pivot.parent = this;
        this.camera.parent = this.pivot;

        // const gui = GUIManager.getInstance().gui;
        // const cameraFolder = gui.addFolder("Camera");
        // cameraFolder.add(this.camera.position, "z", 0, 100, 0.01);
        // const cameraRotationFolder = cameraFolder.addFolder("Rotation");
        // cameraRotationFolder.add(this.rotation, "x", 0, Math.PI * 2, 0.01);
        // cameraRotationFolder.add(this.rotation, "y", 0, Math.PI * 2, 0.01);
        // cameraRotationFolder.add(this.rotation, "z", 0, Math.PI * 2, 0.01);
        // cameraFolder.open();

        this.target = new THREE.Object3D();

        // this._length = 0;
        this.state = CameraState.Init;

        for (let index = 0; index < 2; index++) {
            const effect = new ConfettiEffect();
            this.confettiEffects[index] = effect;
            this.camera.add(effect);
            effect.position.setScalar(0);
            effect.position.z = -5;
        }
        // this.confettiEffect = new ConfettiEffect();
        // this.camera.add(this.confettiEffect);
        // this.confettiEffect.position.setScalar(0);
        // this.confettiEffect.position.z = -5;
    }

    init(target: THREE.Object3D) {
        this.target = target;
        if (this.target != null) {
            this.followTarget(this.target.getWorldPosition(new THREE.Vector3()));
        }
        this.setLength(5);
        // this.setLength(80);

        // this.confettiEffect.init();
        this.showConfettiEffects = false;
        for (let index = 0; index < this.confettiEffects.length; index++) {
            const effect = this.confettiEffects[index];
            effect.init();
        }    
    }
    start() {
        // this.setLength(40);
        this.state = CameraState.Start;
    }

    setLength(length: number) {
        this.camera.position.z = length;
    }
    getLength() {
        return this.camera.position.z;
    }
    setRotationX(x: number) {
        this.pivot.rotation.x = x;
    }

    // getCamera(): THREE.PerspectiveCamera {
    //     return this.camera;
    // }

    update(deltaTime: number) {
        // this.camera.position.z += 100;
        // console.log("cameraZ:"+this.camera.position.z);

        const length = this.getLength();
        switch (this.state) {
            case CameraState.Init: break;
            case CameraState.Start:
                if (length !== 40)
                    this.setLength(THREE.MathUtils.lerp(length, 40, 4 * deltaTime));
                if (this.target != null) {
                    this.followTarget(this.target.getWorldPosition(new Vector3()));
                }
                break;
            case CameraState.End:
                if (length != this.getLengthByTargetScale())
                    this.setLength(THREE.MathUtils.lerp(length, this.getLengthByTargetScale(), 4 * deltaTime));
                break;
        }

        // if (this.confettiEffect.visible === true)
        //     this.confettiEffect.update(deltaTime);
        if (this.showConfettiEffects === true) {
            for (let index = 0; index < this.confettiEffects.length; index++) {
                const effect = this.confettiEffects[index];
                effect.update(deltaTime);
            }

            //3초마다 쏴준다.
            if (this.shotConfettiEffect === false) {
                this.shotConfettiEffect = true;
                const curShotEffect = this.confettiEffects[this.curShotConfettiEffectIndex];
                curShotEffect.visible = true;
                curShotEffect.init();
                curShotEffect.play();
                this.curShotConfettiEffectIndex = (this.curShotConfettiEffectIndex + 1) % this.confettiEffects.length;

                setTimeout(()=>{
                    this.shotConfettiEffect = false;
                }, 5000)
            }
        }
    }
    followTarget(targetPos: THREE.Vector3) {
        this.position.copy(targetPos);
    }

    getLengthByTargetScale() {
        return 8 + Math.pow(this.target.scale.x, 1.8);
    }
    playConfettiEffects() {
        // for (let index = 0; index < this.confettiEffects.length; index++) {
        //     const effect = this.confettiEffects[index];
        //     effect.play();
        // }    
        this.showConfettiEffects = true;
        this.shotConfettiEffect = false;
        this.curShotConfettiEffectIndex = 0;
    }
}