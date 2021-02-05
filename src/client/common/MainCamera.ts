import * as THREE from 'three';
import GUIManager from './GUIManager';

export default class MainCamera extends THREE.Object3D {
    private pivot: THREE.Object3D;
    private camera: THREE.PerspectiveCamera;
    target: THREE.Object3D;

    constructor(scene: THREE.Scene) {
        super();
        this.pivot = new THREE.Object3D();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        scene.add(this);
        scene.add(this.pivot);
        scene.add(this.camera);

        this.parent = scene;
        this.pivot.parent = this;
        this.camera.parent = this.pivot;

        const gui = GUIManager.getInstance().gui;
        const cameraFolder = gui.addFolder("Camera");
        cameraFolder.add(this.camera.position, "z", 0, 100, 0.01);
        const cameraRotationFolder = cameraFolder.addFolder("Rotation");
        cameraRotationFolder.add(this.pivot.rotation, "x", 0, Math.PI * 2, 0.01);
        cameraRotationFolder.add(this.pivot.rotation, "y", 0, Math.PI * 2, 0.01);
        cameraRotationFolder.add(this.pivot.rotation, "z", 0, Math.PI * 2, 0.01);
        cameraFolder.open();

        this.target = new THREE.Object3D();
    }

    init(target: THREE.Object3D) {
        this.target = target;
    }

    setLength(length: number) {
        this.camera.position.z = length;
    }
    setRotationX(x: number) {
        this.pivot.rotation.x = x;
    }

    getCamera(): THREE.PerspectiveCamera {
        return this.camera;
    }

    update() {
        // this.camera.position.z += 100;
        // console.log("cameraZ:"+this.camera.position.z);
        if (this.target != null) {
            this.followTarget(this.target.position);
        }
    }
    followTarget(targetPos: THREE.Vector3) {
        this.position.copy(targetPos);
    }
}