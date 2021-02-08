import GUIManager from '../../common/GUIManager';
import * as THREE from 'three';
// import { THREE } from 'enable3d';

export default class Snow extends THREE.Object3D {
    sphere: THREE.Mesh;
    eye: THREE.Mesh;
    constructor(scene: THREE.Scene) {
        super();

        const geometry: THREE.SphereGeometry = new THREE.SphereGeometry(1, 20, 20);
        // const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
        // const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, })
        const material: THREE.MeshToonMaterial = new THREE.MeshToonMaterial({ color: 0x00ff00, })
        
        this.sphere = new THREE.Mesh(geometry, material)
        this.add(this.sphere);

        this.position.y = 1;

        // const gui = GUIManager.getInstance().gui;
        
        // const cubeFolder = gui.addFolder("Cube");
        // const cubePositionFolder = cubeFolder.addFolder("Position")
        // cubePositionFolder.add(this.sphere.position, "x", -10, 10)
        // cubePositionFolder.add(this.sphere.position, "y", -10, 10)
        // cubePositionFolder.add(this.sphere.position, "z", -10, 10)
        // cubeFolder.add(this.sphere, "visible", true)
        // cubeFolder.open()

        const eyeGeometry: THREE.BoxGeometry = new THREE.BoxGeometry(2, 1, 0.5);
        const eyeMaterial: THREE.MeshToonMaterial = new THREE.MeshToonMaterial({ color: 0x0000ff, });
        this.eye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        this.sphere.add(this.eye);

        this.eye.position.set(0, 0.2, 0.8);
    }

    init() {

    }
}