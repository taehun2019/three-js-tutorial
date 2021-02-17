import * as THREE from 'three'

export default class ConfettiParticle extends THREE.Object3D {
    static terminalFallVelocity = -2;
    static fallResistance = 5;

    moveVelocity: THREE.Vector3;
    rotateVelocity: THREE.Vector3;

    mesh: THREE.Mesh;

    constructor(geometry: THREE.BoxGeometry, material: THREE.MeshToonMaterial) {
        super();
        this.moveVelocity = new THREE.Vector3();
        this.rotateVelocity = new THREE.Vector3();

        this.mesh = new THREE.Mesh(geometry, material);
        this.add(this.mesh);
    }
    init(position: THREE.Vector3) {
        this.position.copy(position);
        this.moveVelocity.y = THREE.MathUtils.randFloat(3, 10);
        this.moveVelocity.x = THREE.MathUtils.randFloat(0.1, 2) * (position.x < 0 ? 1 : -1);

        this.rotateVelocity.x = THREE.MathUtils.randFloat(-Math.PI * 0.5, Math.PI * 0.5);
        this.rotateVelocity.y = THREE.MathUtils.randFloat(-Math.PI * 0.5, Math.PI * 0.5);
    }
    // play() {
    //     this.moveVelocity.y = THREE.MathUtils.randFloat(3, 10);
    //     this.moveVelocity.x = THREE.MathUtils.randFloat(-1, 1);

    //     this.rotateVelocity.x = THREE.MathUtils.randFloat(-0.1, 0.1);
    //     this.rotateVelocity.x = THREE.MathUtils.randFloat(-0.1, 0.1);
    // }
    update(deltaTime: number) {
        this.mesh.rotation.y += this.rotateVelocity.y * deltaTime;
        this.mesh.rotation.x += this.rotateVelocity.x * deltaTime;
        
        let newVelocityY = this.moveVelocity.y;
        newVelocityY -= (10 - ConfettiParticle.fallResistance) * deltaTime;
        if (newVelocityY < ConfettiParticle.terminalFallVelocity)
            newVelocityY = ConfettiParticle.terminalFallVelocity;

        this.moveVelocity.y = newVelocityY;
        const deltaPos = new THREE.Vector3().copy(this.moveVelocity).multiplyScalar(deltaTime);
        this.position.add(deltaPos);
    }
}