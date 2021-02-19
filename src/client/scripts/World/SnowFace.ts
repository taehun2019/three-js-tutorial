// import AssetManager from '../../common/AssetManager';
import AssetManager from 'common/scripts/Managers/AssetManager'; //scripts/AssetManager';
import * as THREE from 'three'
//https://webpack.js.org/guides/asset-modules/
//https://stackoverflow.com/questions/52286068/webpack-cannot-find-image-when-imported-module-not-found
//https://github.com/microsoft/TypeScript-React-Starter/issues/12
import face from './../../assets/images/face.png'

export default class SnowFace extends THREE.Object3D {
    face: THREE.Mesh;
    constructor() {
        super();

        this.face = new THREE.Mesh();

        AssetManager.getInstance().loadTexture(face, this.loadTexture.bind(this));
    }

    loadTexture(texture: THREE.Texture) {
        const geometry = new THREE.PlaneGeometry(1.2, 1.2);
        const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, transparent: true, depthWrite: false, depthTest: true });
        // const eyeMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
        this.face = new THREE.Mesh(geometry, material);
        this.add(this.face);
    }

}