import * as THREE from "three";

export default class SnowfallEffect extends THREE.Object3D {
    static particleCount = 1000;
    
    // particleList: THREE.Mesh[];
    particleOnGround: boolean[];
    particleList: SnowfallParticle[];
    constructor() {
        super();

        this.particleList = [];
        this.particleOnGround = [];
        const geometry = new THREE.SphereGeometry(THREE.MathUtils.randFloat(0.2, 0.4));
        const material = new THREE.MeshToonMaterial( { color: 0xffffff } );
        for (let index = 0; index < SnowfallEffect.particleCount; index++) {
            // const particle = new THREE.Mesh( geometry, material );
            // particle.position.x = THREE.MathUtils.randFloat(-100, 100);
            // particle.position.y = THREE.MathUtils.randFloat(0, 50);
            // particle.position.z = THREE.MathUtils.randFloat(-100, 100);
            // // particle.visible = true;
            // this.particleList[index] = particle;
            // this.particleOnGround[index] = false;
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
    // onGround: boolean;
    constructor(geometry: THREE.SphereGeometry, material: THREE.MeshToonMaterial) {
        super(geometry, material);

        this.position.x = THREE.MathUtils.randFloat(-100, 100);
        this.position.y = THREE.MathUtils.randFloat(0, 50);
        this.position.z = THREE.MathUtils.randFloat(-100, 100);

        // this.onGround = false;
    }
    update(deltaTime: number) {
        // if (this.onGround === true)
        //     return;

        // const particle = this.particleList[index];
        this.position.y += -10 * 1 * deltaTime;
        if (this.position.y < 0) {
            this.position.y = 50;
        }
        // if (this.onGround === false && this.position.y < 0) {
        //     this.position.y = 0;
        //     this.onGround = true;
        //     setTimeout(() => {
        //         this.position.y = 50;
        //         this.onGround = false;
        //     }, 3000)
        // }
    }
}