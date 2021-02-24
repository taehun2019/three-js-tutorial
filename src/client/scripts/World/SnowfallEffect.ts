import * as THREE from "three";

export default class SnowfallEffect extends THREE.Object3D {
    static particleCount = 2000;
    
    // particleList: THREE.Mesh[];
    particleOnGround: boolean[];
    particleList: SnowfallParticle[];
    constructor() {
        super();

        this.particleList = [];
        this.particleOnGround = [];
        const geometry = new THREE.SphereGeometry(THREE.MathUtils.randFloat(0.1, 0.15));
        const material = new THREE.MeshToonMaterial( { color: 0xffffff } );
        for (let index = 0; index < SnowfallEffect.particleCount; index++) {
            const particle = new SnowfallParticle(geometry, material);
            this.add(particle);
            this.particleList[index] = particle;
        }
    }

    update(deltaTime: number) {
        for (let index = 0; index < this.particleList.length; index++) {
            this.particleList[index].update(deltaTime);
        }
    }
}

class SnowfallParticle extends THREE.Mesh {
    constructor(geometry: THREE.SphereGeometry, material: THREE.MeshToonMaterial) {
        super(geometry, material);

        this.position.x = THREE.MathUtils.randFloat(-100, 100);
        this.position.y = THREE.MathUtils.randFloat(0, 50);
        this.position.z = THREE.MathUtils.randFloat(-100, 100);
    }
    update(deltaTime: number) {
        this.position.y += -10 * 1 * deltaTime;
        if (this.position.y < 0) {
            this.position.y += 50;
        }
    }
}