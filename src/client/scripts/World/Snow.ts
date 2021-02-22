import GUIManager from 'common/scripts/Managers/GUIManager';
import * as THREE from 'three';
import SnowFace from './SnowFace';
// import { THREE } from 'enable3d';

require('common/downloads/TrailRenderer/TrailRenderer');

export default class Snow extends THREE.Object3D {
    static groundOffset = 0.8;
    static bounceMinHeight = Snow.groundOffset * 0.6;
    static initBounceTime = 0.5;
    body: THREE.Mesh;
    bodyMaterial: THREE.MeshToonMaterial;
    eyes: SnowFace;
    constructor() {
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

        this.position.y = Snow.groundOffset; //1;

        // const gui = GUIManager.getInstance().gui;
        
        // const cubeFolder = gui.addFolder("Cube");
        // const cubePositionFolder = cubeFolder.addFolder("Position")
        // cubePositionFolder.add(this.sphere.position, "x", -10, 10)
        // cubePositionFolder.add(this.sphere.position, "y", -10, 10)
        // cubePositionFolder.add(this.sphere.position, "z", -10, 10)
        // cubeFolder.add(this.sphere, "visible", true)
        // cubeFolder.open()
    }

    curBounceTime = 0;
    maxBounceTime = 0.5;

    init(color: THREE.Color) {
        this.visible = true;
        this.bodyMaterial.color = color;
        // console.log(color);
        this.body.material = this.bodyMaterial;

        this.curBounceTime = 0;
    }


    update(deltaTime: number) {
        this.curBounceTime += deltaTime;
        
        if (this.curBounceTime < this.maxBounceTime * 0.5) {
            let interpolation = this.curBounceTime / (this.maxBounceTime * 0.5);
            interpolation = THREE.MathUtils.clamp(interpolation, 0, 1);
            // console.log(interpolation);
            this.position.y = THREE.MathUtils.lerp(Snow.groundOffset, Snow.bounceMinHeight, interpolation);
        }
        else if (this.curBounceTime < this.maxBounceTime){
            let interpolation = (this.curBounceTime - this.maxBounceTime * 0.5) / (this.maxBounceTime * 0.5);
            interpolation = THREE.MathUtils.clamp(interpolation, 0, 1);
            // console.log(interpolation);
            this.position.y = THREE.MathUtils.lerp(Snow.bounceMinHeight, Snow.groundOffset, interpolation);
        }
        else {
            this.curBounceTime = 0;
        }
    }
    updateMaxBounceTime(scale: number) {
        this.maxBounceTime = THREE.MathUtils.lerp(Snow.initBounceTime, Snow.initBounceTime * 2, THREE.MathUtils.clamp((scale - 1) / (4 - 1), 0, 1));
    }
}