import GUIManager from '../../common/GUIManager';
import * as THREE from 'three';
import SnowFace from './SnowFace';
// import { THREE } from 'enable3d';

export default class Snow extends THREE.Object3D {
    body: THREE.Mesh;
    bodyMaterial: THREE.MeshToonMaterial;
    eyes: SnowFace;
    constructor(scene: THREE.Scene) {
        super();

        const geometry: THREE.SphereGeometry = new THREE.SphereGeometry(1, 20, 20);
        // const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
        // const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, })
        this.bodyMaterial = new THREE.MeshToonMaterial({ color: 0x00ff00, })
        
        this.body = new THREE.Mesh(geometry, this.bodyMaterial);
        // this.body.castShadow = true;
        this.add(this.body);

        this.eyes = new SnowFace();
        this.body.add(this.eyes);
        this.eyes.position.set(0, 0.0, 1.0);

        this.position.y = 0.8; //1;

        // const gui = GUIManager.getInstance().gui;
        
        // const cubeFolder = gui.addFolder("Cube");
        // const cubePositionFolder = cubeFolder.addFolder("Position")
        // cubePositionFolder.add(this.sphere.position, "x", -10, 10)
        // cubePositionFolder.add(this.sphere.position, "y", -10, 10)
        // cubePositionFolder.add(this.sphere.position, "z", -10, 10)
        // cubeFolder.add(this.sphere, "visible", true)
        // cubeFolder.open()
    }

    init(color: THREE.Color) {
        this.bodyMaterial.color = color;
        // console.log(color);
        this.body.material = this.bodyMaterial;
    }
}