import GUIManager from '../../common/GUIManager';
import * as THREE from 'three';
// import { THREE } from 'enable3d';
import Snow from './Snow';
// import { Vector2, Vector3 } from 'three';

const Vector2 = THREE.Vector2;
const Vector3 = THREE.Vector3;

export default class Player extends THREE.Object3D {
    static initMoveSpeed: number = 4; //10;
    static initRotateSpeed: number = 200;

    snow: Snow;
    keyboard: any;
    moveDirection: THREE.Vector2;

    curMoveSpeed: number;
    curRotateSpeed: number;

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

        this.curMoveSpeed = Player.initMoveSpeed;
        this.curRotateSpeed = Player.initRotateSpeed;
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

        this.moveDirection.x = THREE.MathUtils.randInt(-1, 1);
        this.moveDirection.y = THREE.MathUtils.randInt(-1, 1);
        this.moveDirection = this.moveDirection.normalize();
        // console.log("init");

        this.curMoveSpeed = Player.initMoveSpeed;
        this.curRotateSpeed = Player.initRotateSpeed;
    }

    update(deltaTime: number) {
        // this.snow.rotation.x += 90 * THREE.MathUtils.DEG2RAD * deltaTime;
        this.snow.rotation.x += this.curRotateSpeed * THREE.MathUtils.DEG2RAD * deltaTime;

        this.position.x += +this.moveDirection.x * this.curMoveSpeed * deltaTime;
        this.position.z += -this.moveDirection.y * this.curMoveSpeed * deltaTime;

        if (this.moveDirection.x == 0 && this.moveDirection.y == 0)
        {
            // console.log('!!!!!');/
        }

        this.rotate(deltaTime);
    }

    rotate(deltaTime: number) {
        const moveDirection = this.moveDirection;
        // console.log(`x:${moveDirection.x}/y:${moveDirection.y}`);
        
        // let desireAngleY = Math.atan2(moveDirection.y, moveDirection.x) + 90 * THREE.MathUtils.DEG2RAD;
        // let curAngleY = this.rotation.y;



        // let diff = desireAngleY - curAngleY;

        // this.elapsedTime += deltaTime;
        // if (this.elapsedTime > 2)
        // {
        //     this.elapsedTime = 0;
        //     // console.log(desireAngleY * THREE.MathUtils.RAD2DEG);
        //     // console.log(curAngleY * THREE.MathUtils.RAD2DEG);
        //     // console.log("diff:"+diff * THREE.MathUtils.RAD2DEG);
        // }
        
        // let degDiff = diff * THREE.MathUtils.RAD2DEG;
        // // if (degDiff > 270 || degDiff < -270)
        // // {
        // //     console.log("!!diff:"+diff * THREE.MathUtils.RAD2DEG);
        // // }
        // if (degDiff < -270)
        // {
        //     degDiff += 360;
        //     diff = degDiff * THREE.MathUtils.DEG2RAD;
        //     console.log("!!newDiff:"+diff * THREE.MathUtils.RAD2DEG);
        // }
        // if (degDiff > 270)
        // {
        //     degDiff -= 360;
        //     diff = degDiff * THREE.MathUtils.DEG2RAD;
        //     console.log("!!newDiff:"+diff * THREE.MathUtils.RAD2DEG);
        // }
        
        // let newAngleY = curAngleY + (diff * deltaTime * 4);
        // if (newAngleY > 270 * THREE.MathUtils.DEG2RAD)
        // {
        //     console.log("-------newAngleY:"+(newAngleY * THREE.MathUtils.RAD2DEG));
        //     newAngleY -= 360 * THREE.MathUtils.DEG2RAD;
        //     console.log("-------newnewAngleY:"+(newAngleY * THREE.MathUtils.RAD2DEG));
        // }
        // this.rotation.y = newAngleY;
        // this.rotation.y = desireAngleY;
        const newLook= new THREE.Vector3(this.position.x, this.position.y, this.position.z);
        newLook.x += moveDirection.x;
        newLook.z -= moveDirection.y;
        this.lookAt(newLook);

        //0~90 90~180 180~270 -90~0 0~90
        //0~90 90~180 180~270 270~360 0~90
    }

    changeSize(deltaSize: number) {
        let newSize = this.scale.x + deltaSize;
        this.scale.set(newSize, newSize, newSize);
        this.curRotateSpeed = THREE.MathUtils.lerp(Player.initRotateSpeed, Player.initRotateSpeed * 0.5, newSize / 10);
    }
}