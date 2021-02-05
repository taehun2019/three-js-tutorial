import GUIManager from '../../common/GUIManager';
import * as THREE from 'three'
import Snow from './Snow';
import { Vector2, Vector3 } from 'three';

export default class Player extends THREE.Object3D {
    static moveSpeed: number = 20;

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
        const raycaster = new THREE.Raycaster(this.position, new Vector3(0, -1, 0), 0, 1);
        // raycaster.intersectObject()
        this.position.set(posX, 0, posZ);
        // console.log(`input : posX:${posX}/posY:${posZ}`);
        // console.log(`this.positin : posX:${this.position.x}/posY:${this.position.z}`);

        // this.scale.set(0.5, 0.5, 0.5);
        this.scale.set(1,1,1);
    }

    update(deltaTime: number) {
        // this.snow.rotation.x += 90 * THREE.MathUtils.DEG2RAD * deltaTime;

        this.position.x += +this.moveDirection.x * Player.moveSpeed * deltaTime;
        this.position.z += -this.moveDirection.y * Player.moveSpeed * deltaTime;

    }
}