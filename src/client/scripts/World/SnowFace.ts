// import AssetManager from '../../common/AssetManager';
import AssetManager from 'common/scripts/Managers/AssetManager'; //scripts/AssetManager';
import * as THREE from 'three'
//https://webpack.js.org/guides/asset-modules/
//https://stackoverflow.com/questions/52286068/webpack-cannot-find-image-when-imported-module-not-found
//https://github.com/microsoft/TypeScript-React-Starter/issues/12
// import face from './../../assets/images/face.png'
import face1 from './../../assets/images/faces/Face01.png'
import face2 from './../../assets/images/faces/Face02.png'
import face3 from './../../assets/images/faces/Face03.png'
import face4 from './../../assets/images/faces/Face04.png'
import face5 from './../../assets/images/faces/Face05.png'
import face6 from './../../assets/images/faces/Face06.png'
import face7 from './../../assets/images/faces/Face07.png'
import face8 from './../../assets/images/faces/Face08.png'

const faces = [
    face1, face2, face3, face4, face5, face6, face7, face8
]

export default class SnowFace extends THREE.Object3D {
    plane: THREE.Mesh;
    material: THREE.MeshBasicMaterial;
    constructor() {
        super();

        // this.plane = new THREE.Mesh();
        const geometry = new THREE.PlaneGeometry(1.2, 1.2);
        this.material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, transparent: true, depthWrite: false, depthTest: true });
        this.plane = new THREE.Mesh(geometry, this.material);
        this.add(this.plane);

        // AssetManager.getInstance().loadTexture(face1, this.loadTexture.bind(this));
        if (AssetManager.getInstance().textures.has(face1) === false)
        {
            faces.forEach(face => {
                AssetManager.getInstance().loadTexture(face, () => { });
            });
        }

    }
    loadTexture(texture: THREE.Texture) {
        this.material.map = texture;
        this.material.needsUpdate = true;
    }
    init(num: number) {
        AssetManager.getInstance().loadTexture(faces[num - 1], this.loadTexture.bind(this));
    }
}