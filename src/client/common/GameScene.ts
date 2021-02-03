import * as THREE from 'three'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import MainCamera from './MainCamera';
// import { GUI } from 'dat.gui';

export default class GameScene {
    protected scene: THREE.Scene;
    protected mainCamera: MainCamera;

    constructor(scene: THREE.Scene) {
        this.scene = scene;
        // this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.mainCamera = new MainCamera(scene);
    }

    getCamera(): THREE.PerspectiveCamera {
        return this.mainCamera.getCamera();
    }
}
