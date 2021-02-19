import * as THREE from "three";
import AssetManager from 'common/scripts/Managers/AssetManager'
import shadow from 'common/images/circle.png'

export default class Shadow extends THREE.Object3D {
    model: THREE.Mesh | null = null;
    target: THREE.Object3D | null = null;

    constructor() {
        super();
        
        AssetManager.getInstance().loadTexture(shadow, (texture: THREE.Texture) => {
            this.model = new THREE.Mesh(
                new THREE.PlaneGeometry(2.3, 2.3),
                new THREE.MeshBasicMaterial({
                    //https://discourse.threejs.org/t/threejs-and-the-transparent-problem/11553/4
                    map: texture, color: 0x92a2b5, transparent: true, opacity: 0.5, depthWrite: false, depthTest: true //side: THREE.FrontSide
                })
            );
            this.model.rotation.x = -Math.PI / 2;
            this.model.position.y = 0.3;
            // plane.receiveShadow = true;
            // plane.position.y = -1;
            this.add(this.model);
        });
    }

    updateScale(lengthToTarget: number) {
        const scale = THREE.MathUtils.clamp(THREE.MathUtils.lerp(1, 0.5, lengthToTarget / 2), 0.5, 1);
        // console.log(`scale:${scale}`);
        this.scale.setScalar(scale);
        // console.log(this.scale.x);
    }
}