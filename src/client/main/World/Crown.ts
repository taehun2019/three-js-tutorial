import * as THREE from "three";
import AssetManager from "common/scripts/Managers/AssetManager";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import crown from './../../assets/models/crown.glb'
import Player from "./Player";

export default class Crown extends THREE.Object3D {
    static initScale = 0.03;
    model: THREE.Mesh;
    constructor() {
        super();

        this.model = new THREE.Mesh();
        AssetManager.getInstance().loadGltf(crown, (gltf: GLTF) => {
            this.model.copy(gltf.scene.children[0] as THREE.Mesh);
            const material = new THREE.MeshToonMaterial();
            material.color = new THREE.Color('yellow');
            this.model.material = material;
            this.model.position.y = 55;

            this.scale.setScalar(Crown.initScale);
            this.add(this.model);
        });
    }

    show(player: Player) {
        this.visible = true;
        this.position.copy(player.position);

        this.scale.setScalar(Crown.initScale * player.scale.x);
    }

    update(deltaTime: number) {
        this.rotation.y += Math.PI * deltaTime
    }
}