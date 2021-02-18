import AssetManager from 'common/scripts/Managers/AssetManager'
import * as THREE from 'three';
// import face from './../../assets/models/broken.gltf'
import face from './../../assets/models/broken.glb'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

export default class DieEffect extends THREE.Object3D {
    static fragmentsCount = 10;
    fragments: THREE.Mesh[];
    fragmentsVelocities: THREE.Vector3[];
    material: THREE.MeshToonMaterial;

    isPlaying: boolean;

    constructor() {
        super();

        this.fragments = [];
        this.fragmentsVelocities = [];
        this.material = new THREE.MeshToonMaterial();

        this.isPlaying = false;

        AssetManager.getInstance().loadGltf(face, (gltf: GLTF) => {
            const mesh = gltf.scene.children[0] as THREE.Mesh;
            for (let index = 0; index < DieEffect.fragmentsCount; index++) {
                this.fragments[index] = new THREE.Mesh();
                this.fragments[index].copy(mesh);
                this.fragments[index].material = this.material;
                this.add(this.fragments[index]);

                this.fragmentsVelocities[index] = new THREE.Vector3();
            }
            this.init(this.material.color);
        });


        // const geometry: THREE.Geometry = new THREE.SphereGeometry(1, 20, 20);
        // const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, })

        // this.fragments = [];
        // for (let index = 0; index < 10; index++) {
        //     const element = new ;

        // }
    }

    init(color: THREE.Color) {
        this.material.color = color;
        this.isPlaying = false;
        if (this.fragments.length === 0)
            return;
        for (let index = 0; index < DieEffect.fragmentsCount; index++) {
            // const element = this.fragments[index];
            // element.material.
            this.fragments[index].position.set(0, 0, 0);
            this.fragments[index].rotation.set(
                THREE.MathUtils.randFloat(0, 2 * Math.PI),
                THREE.MathUtils.randFloat(0, 2 * Math.PI),
                THREE.MathUtils.randFloat(0, 2 * Math.PI),
            );
            // this.fragments[index].position.x = THREE.MathUtils.randFloat(-0.1, 0.1);
            // this.fragments[index].position.y = THREE.MathUtils.randFloat(-0.1, 0.1);
            // this.fragments[index].position.z = THREE.MathUtils.randFloat(-0.1, 0.1);

            this.fragmentsVelocities[index].x = THREE.MathUtils.randFloat(-5, 5);
            this.fragmentsVelocities[index].y = THREE.MathUtils.randFloat(-5, 5);
            this.fragmentsVelocities[index].z = THREE.MathUtils.randFloat(-5, 5);
            
        }
    }

    play() {
        this.isPlaying = true;
    }

    update(deltaTime: number) {
        if (this.isPlaying === false)
            return;

        // console.log("hoho");
        
        for (let index = 0; index < DieEffect.fragmentsCount; index++) {
            this.fragmentsVelocities[index].y -= 10 * deltaTime;
            const deltaPos = new THREE.Vector3().copy(this.fragmentsVelocities[index]).multiplyScalar(deltaTime);
            this.fragments[index].position.add(deltaPos);
            // this.fragments[index].position.x += +this.moveDirection.x * this.curMoveSpeed * deltaTime;
            // this.fragments[index].position.z += -this.moveDirection.y * this.curMoveSpeed * deltaTime;
        }

    }
}