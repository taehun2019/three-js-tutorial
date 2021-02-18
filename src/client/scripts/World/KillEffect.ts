import * as THREE from "three";
import AssetManager from "common/scripts/Managers/AssetManager";
import image from './../../assets/images/level.png';

export default class KillEffect extends THREE.Object3D {
    fromSize = 0.8;
    toSize = 1.5;
    material: THREE.MeshBasicMaterial;
    initColor: THREE.Color;

    curTime = 0;
    maxTime = 0.3;

    constructor() {
        super();
        this.material = new THREE.MeshBasicMaterial({
            transparent: true, opacity: 1, depthWrite: false, depthTest: true
        });
        this.initColor = new THREE.Color(0x00afff);
        AssetManager.getInstance().loadTexture(image, (texture: THREE.Texture) => {
            this.material.map = texture;
            const model = new THREE.Mesh(
                new THREE.PlaneGeometry(5, 5),
                this.material
            );
            model.rotation.x = -Math.PI / 2;
            model.position.y = 0.35;
            // plane.receiveShadow = true;
            // plane.position.y = -1;
            this.add(model);

            this.material.color = this.initColor;
        });
    }
    play() {
        this.visible = true;
        this.curTime = 0;
    }
    update(deltaTime: number) {
        this.curTime += deltaTime;
        const interpolation = this.curTime / this.maxTime;
        const curAlpha = THREE.MathUtils.lerp(1, 0, interpolation);
        this.material.opacity = curAlpha;

        const curSize = THREE.MathUtils.lerp(this.fromSize, this.toSize, interpolation);
        this.scale.setScalar(curSize);


        if (interpolation > 1) {
            this.visible = false;
        }
    }
}