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

    confettiEffect: ConfettiEffect;

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

        this.confettiEffect = new ConfettiEffect();
        this.camera.add(this.confettiEffect);
        this.confettiEffect.position.setScalar(0);
        this.confettiEffect.position.z = -5;
    }

    init(target: THREE.Object3D) {
        this.target = target;
        if (this.target != null) {
            this.followTarget(this.target.getWorldPosition(new THREE.Vector3()));
        }
        this.setLength(5);

        this.confettiEffect.init();
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

        if (this.confettiEffect.visible === true)
            this.confettiEffect.update(deltaTime);
    }
    followTarget(targetPos: THREE.Vector3) {
        this.position.copy(targetPos);
    }

    getLengthByTargetScale() {
        return 8 + Math.pow(this.target.scale.x, 1.8);
    }
}