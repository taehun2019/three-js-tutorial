import GUIManager from '../../common/GUIManager';
import * as THREE from 'three'
import Snow from './Snow';
import { Vector2, Vector3 } from 'three';

export default class Player extends THREE.Object3D {
    snow: Snow;
    keyboard: any;
    moveDirection: THREE.Vector2;

    constructor(scene: THREE.Scene) {
        super();
        this.snow = new Snow(scene);
        this.add(this.snow);

        // const gui = GUIManager.getInstance().gui;
        // const folder = gui.addFolder("Player");
        // let subFolder;
        // subFolder = folder.addFolder("Position")
        // subFolder.add(this.position, "x", -100, 100, 0.1)
        // subFolder.add(this.position, "y", -100, 100, 0.1)
        // subFolder.add(this.position, "z", -100, 100, 0.1)
        // subFolder = folder.addFolder("Scale")
        // subFolder.add(this.scale, "x", -5, 5, 0.1)
        // subFolder.add(this.scale, "y", -5, 5, 0.1)
        // subFolder.add(this.scale, "z", -5, 5, 0.1)
        // folder.open();

        this.moveDirection = new Vector2(0, 0);
        // subFolder = folder.addFolder("MoveDirection");
        // subFolder.add(this.moveDirection, "x", -5, 5, 0.1);
        // subFolder.add(this.moveDirection, "y", -5, 5, 0.1);
    }

    init(posX: number, posZ: number) {
        this.snow.init();
        this.scale.set(0.5, 0.5, 0.5);
        const raycaster = new THREE.Raycaster(this.position, new Vector3(0, -1, 0), 0, 1);
        // raycaster.intersectObject()
        this.position.set(posX, 0, posZ);
    }

    update(deltaTime: number) {
        this.snow.rotation.x += 90 * THREE.MathUtils.DEG2RAD * deltaTime;

        this.position.x += +this.moveDirection.x * 10 * deltaTime;
        this.position.z += -this.moveDirection.y * 10 * deltaTime;

    }
}