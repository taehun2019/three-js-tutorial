import * as THREE from "three";

const particleCount = 1000;
const fireInterval = 0.02;
export default class SnowHitEffect extends THREE.Object3D {
    elapsedTime = 0;
    particles: SnowHitParticle[] = [];
    curIndex = 0;
    world: THREE.Object3D;
    remainShowTime = 0;
    fireCooldownTime = 0;
    constructor(world: THREE.Object3D) {
        super();
        this.world = world;
        const geometry = new THREE.SphereGeometry(0.1);
        const material = new THREE.MeshToonMaterial( { color: 0xffffff } );
        for (let index = 0; index < particleCount; index++) {
            const particle = new SnowHitParticle(geometry, material);
            world.add(particle);
            this.particles[index] = particle;
        }
    }
    init() {
        for (let index = 0; index < particleCount; index++) {
            this.particles[index].init();
        }
        this.visible = false;
    }
    show() {
        this.elapsedTime = 0;
        this.visible = true;
        this.remainShowTime = 0.2;
    }
    update(deltaTime: number) {
        for (let index = 0; index < particleCount; index++) {
            if (this.particles[index].visible === false)
                continue;

            this.particles[index].update(deltaTime);
        }
        if (this.visible === false)
            return;
        // console.log("ShowHitEffect.update");

        this.elapsedTime += deltaTime;
        this.fireCooldownTime += deltaTime;

        if (this.fireCooldownTime > fireInterval) {
            // console.log("ShowHitEffect.fire");
            this.fireCooldownTime -= fireInterval;
            const snowScale = (this.parent as THREE.Object3D).scale.x;
            const snowPosition = this.getWorldPosition(new THREE.Vector3());
            this.particles[this.curIndex].show(snowPosition, snowScale);
            // console.log("haha");

            this.curIndex = (this.curIndex + 1) % particleCount;
        }
        if (this.elapsedTime > this.remainShowTime) {
            this.visible = false;
        }
    }
}

class SnowHitParticle extends THREE.Mesh {
    // onGround: boolean;
    velocity = new THREE.Vector3;
    onGround = false;
    constructor(geometry: THREE.SphereGeometry, material: THREE.MeshToonMaterial) {
        super(geometry, material);

        // const randAngle = THREE.MathUtils.randFloat(0, 2 * Math.PI);
        // this.position.x = THREE.MathUtils.randFloat(-100, 100);
        // this.position.y = THREE.MathUtils.randFloat(0, 50);
        // this.position.z = THREE.MathUtils.randFloat(-100, 100);

        // this.onGround = false;
    }
    init() {
        this.visible = false;
        this.onGround = false;
    }
    show(worldPosition: THREE.Vector3, worldScale: number) {
        this.visible = true;
        this.onGround = false;

        // this.parent = null;
        this.position.copy(worldPosition);

        this.scale.setScalar(worldScale);

        const randAngle = THREE.MathUtils.randFloat(0, 2 * Math.PI);
        const power = Math.random() * 2 * Math.sqrt(worldScale);
        this.velocity.x = Math.sin(randAngle) * power;
        this.velocity.y = 0;
        this.velocity.z = Math.cos(randAngle) * power;

        this.position.add(this.velocity);
    }
    update(deltaTime: number) {
        if (this.onGround === true)
            return;

        // this.position.x += -1 * 1 * deltaTime;

        this.velocity.y += -10 * deltaTime;
        this.position.add(new THREE.Vector3().copy(this.velocity).multiplyScalar(deltaTime));


        if (this.onGround === false && this.position.y < 0) {
            this.onGround = true;
            this.position.y = 0;
            this.velocity.setScalar(0);
            setTimeout(() => {
                this.visible = false;
            }, 1000);
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