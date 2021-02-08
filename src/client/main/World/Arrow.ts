import * as THREE from "three";
import { Object3D } from "three";

export default class Arrow extends Object3D {
    constructor(scene: THREE.Scene) {
        super();

        const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(5, 2, 2);
        const material: THREE.MeshToonMaterial = new THREE.MeshToonMaterial({ color: 0xff0000, })
        
        const box1 = new THREE.Mesh(geometry, material)
        this.add(box1);
        box1.position.set(1, 1, 8);
        box1.rotation.y = 45 * THREE.MathUtils.DEG2RAD;

        const box2 = new THREE.Mesh(geometry, material)
        this.add(box2);
        box2.position.set(-1, 1, 8);
        box2.rotation.y = -45 * THREE.MathUtils.DEG2RAD;
    }
}