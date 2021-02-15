import AssetManager from '../../common/AssetManager';
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

        // AssetManager.getInstance().load('resources/face.png', this.loadTexture.bind(this));
        AssetManager.getInstance().load(face, this.loadTexture.bind(this));
    }

    loadTexture(texture: THREE.Texture) {
        const eyeGeometry = new THREE.PlaneGeometry(1.2, 1.2);
        const eyeMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, transparent: true, depthWrite: false, depthTest: true });
        // const eyeMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
        this.face = new THREE.Mesh(eyeGeometry, eyeMaterial);
        this.add(this.face);
    }

}