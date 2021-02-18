import * as THREE from "three";
import ConfettiParticle from "./ConfettiParticle";

export default class ConfettiEffect extends THREE.Object3D {
    // static riseResistance = 10;
    leftFirePosition: THREE.Vector3;
    rightFirePosition: THREE.Vector3;

    particles: ConfettiParticle[];

    particleCount = 50;

    constructor() {
        super();
        this.leftFirePosition = new THREE.Vector3(-3, 0, 0);
        this.rightFirePosition = new THREE.Vector3(3, 0, 0);

        const geometry = new THREE.BoxGeometry(0.2,0.4,0.02);
        // const material = new THREE.MeshToonMaterial();

        const redMaterial = new THREE.MeshToonMaterial({color: 'red'});
        const yellowMaterial = new THREE.MeshToonMaterial({color: '#feff00'});
        const greenMaterial = new THREE.MeshToonMaterial({color: '#00ff0a'});
        const purpleMaterial = new THREE.MeshToonMaterial({color: '#ff00ee'});
        const blueMaterial = new THREE.MeshToonMaterial({color: '#003eff'});

        this.particles = [];
        for (let index = 0; index < this.particleCount; index++) {
            let material;
            if (index < this.particleCount * 0.2)
                material = redMaterial;
            else if (index < this.particleCount * 0.4)
                material = yellowMaterial;
            else if (index < this.particleCount * 0.6)
                material = greenMaterial;
            else if (index < this.particleCount * 0.8)
                material = purpleMaterial;
            else
                material = blueMaterial;
            this.particles[index] = new ConfettiParticle(geometry, material);
            this.add(this.particles[index]);
        }
    }
    init() {
        this.visible = false;
        for (let index = 0; index < this.particleCount; index++) {
            this.particles[index].init(THREE.MathUtils.randInt(0, 1) === 0 ? this.leftFirePosition : this.rightFirePosition);
        }
    }
    play() {
        this.visible = true;
        // for (let index = 0; index < this.particleCount; index++) {
        //     this.particles[index].play();
        // }
    }
    update(deltaTime: number) {
        if (this.visible === false)
            return;
        for (let index = 0; index < this.particleCount; index++) {
            this.particles[index].update(deltaTime);
        }
    }
}