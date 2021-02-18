import * as THREE from "three";
import AssetManager from "common/scripts/Managers/AssetManager";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import crown from './../../assets/models/crown.glb'
import Player from "./Player";

export default class Crown extends THREE.Object3D {
    static initScale = 0.035;
    model: THREE.Mesh;
    //https://stackoverflow.com/questions/59715119/type-null-is-not-assignable-to-type-t
    target: THREE.Object3D | null = null;
    constructor() {
        super();

        this.model = new THREE.Mesh();
        AssetManager.getInstance().loadGltf(crown, (gltf: GLTF) => {
            this.model.copy(gltf.scene.children[0] as THREE.Mesh);
            const material = new THREE.MeshToonMaterial();
            material.color = new THREE.Color('yellow');
            this.model.material = material;
            // this.model.position.y = 50; //플레이어 따라갈 때.
            this.model.position.y = 25; //모델 따라갈 때.

            this.scale.setScalar(Crown.initScale);
            this.add(this.model);
        });
    }

    show(target: THREE.Object3D) {
        this.target = target;
        this.visible = true;
        this.position.copy(target.getWorldPosition(new THREE.Vector3()));

        this.scale.setScalar(Crown.initScale * target.getWorldScale(new THREE.Vector3()).x);
    }

    update(deltaTime: number) {
        this.rotation.y += Math.PI * deltaTime
        if (this.target !== null)
            this.position.copy(this.target.getWorldPosition(new THREE.Vector3()));
    }
}