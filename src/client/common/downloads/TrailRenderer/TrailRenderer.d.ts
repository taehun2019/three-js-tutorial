import * as THREE from "three";

export class TrailRenderer extends THREE.Object3D {
    constructor(scene: THREE.Scene, orientToMovement: boolean);
    // createMaterial(): THREE.ShaderMaterial;
    static createBaseMaterial(): THREE.ShaderMaterial;
}
