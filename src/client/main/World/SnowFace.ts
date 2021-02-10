import AssetManager from '../../common/AssetManager';
import * as THREE from 'three'

export default class SnowFace extends THREE.Object3D {
    face: THREE.Mesh;
    constructor() {
        super();


        // const loader = new THREE.TextureLoader();
        // loader.load()
        this.face = new THREE.Mesh();

        // AssetManager.getInstance().finishLoadAction = () => this.loadTexture();
        // AssetManager.getInstance().finishLoadAction.addListener('finish', () => this.loadTexture());
        AssetManager.getInstance().load('resources/face.png', this.loadTexture.bind(this));
        
    }

    loadTexture(texture: THREE.Texture) {
        const eyeGeometry = new THREE.PlaneGeometry(1.2, 1.2);
        const eyeMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, transparent: true });
        // const eyeMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
        this.face = new THREE.Mesh(eyeGeometry, eyeMaterial);
        this.add(this.face);
    }

}