import * as THREE from "three";
import { Object3D, Vector3 } from "three";

export default class SnowTrail extends THREE.Object3D {

    // sphere: THREE.Mesh;
    // eye: THREE.Mesh;
    curIndex: number;
    elapsedTime: number;
    scene: THREE.Object3D;

    particleList: THREE.Object3D[];
    activeParticleList: Map<THREE.Object3D, number>;

    static particleCount = 200;

    constructor(scene: THREE.Object3D) {
        super();
        this.scene = scene;

        this.particleList = [];
        const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const material = new THREE.MeshToonMaterial( { color: 0xffffff } );
        for (let index = 0; index < SnowTrail.particleCount; index++) {
            const particle = new THREE.Mesh( geometry, material );
            // points.scale.setLength(0.1);
            // points.position.y = 2;
            this.add(particle);
            particle.visible = false;
            this.particleList[index] = particle;
        }

        this.activeParticleList = new Map<Object3D, number>();


        // this.position.y = 1;
        // this.position.z = -1;

        // const gui = GUIManager.getInstance().gui;
        
        // const cubeFolder = gui.addFolder("Cube");
        // const cubePositionFolder = cubeFolder.addFolder("Position")
        // cubePositionFolder.add(this.sphere.position, "x", -10, 10)
        // cubePositionFolder.add(this.sphere.position, "y", -10, 10)
        // cubePositionFolder.add(this.sphere.position, "z", -10, 10)
        // cubeFolder.add(this.sphere, "visible", true)
        // cubeFolder.open()

        this.curIndex = 0;
        this.elapsedTime = 0;
    }

    init() {
        this.curIndex = 0;
        this.elapsedTime = 0;
        // this.activePointsList = [];
        this.particleList.forEach(particle => {
            particle.visible = false;
        });
        this.activeParticleList.clear();
    }

    update(deltaTime: number, generate: boolean) {
        const worldScale = this.getWorldScale(new Vector3()).x;
        const maxParticleTime = THREE.MathUtils.clamp(worldScale, 0, 2);
        // this.pointsList[this.curIndex].scale.subScalar(1 * deltaTime);
        this.activeParticleList.forEach((value, key, map) => {
            const points = key;
            let elapsedTime = value;
            // points.scale.subScalar(0.1 * deltaTime);
            // points.scale.setLength(THREE.MathUtils.lerp(worldScale, 0, elapsedTime));
            points.scale.setLength(THREE.MathUtils.lerp(worldScale, 0, THREE.MathUtils.clamp(elapsedTime / maxParticleTime, 0, 1)));
            elapsedTime += deltaTime;
            map.set(key, elapsedTime);
            // if (elapsedTime > 1)
            if (elapsedTime > maxParticleTime)
            {
                points.visible = false;
                this.activeParticleList.delete(points);
            }
        });

        if (generate == false)
            return;

        this.elapsedTime += deltaTime;
        if (this.elapsedTime > 0.03)
        {
            this.elapsedTime = 0;
            // this.pointsList[this.curIndex]
            this.curIndex = (this.curIndex + 1) % SnowTrail.particleCount;
            const points = this.particleList[this.curIndex];
            points.parent = this.scene;
            this.scene.add(points);
            // this.remove(points);
            points.scale.setLength(this.getWorldScale(new Vector3()).x);
            points.rotation.set(THREE.MathUtils.randFloatSpread(5),THREE.MathUtils.randFloatSpread(5),THREE.MathUtils.randFloatSpread(5));
            points.position.copy(this.getWorldPosition(new Vector3()));
            points.visible = true;
            this.activeParticleList.set(points, 0);
            // setTimeout(()=>{
            //     points.visible = false;
            //     this.activePointsList.delete(points);
            // }, 10000);
        }
    }
}