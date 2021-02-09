import * as THREE from 'three';
// import { THREE } from 'enable3d';
// import { Quaternion } from "three";
import VirtualJoystickManager from "../../common/VirtualJoystickManager";
import Player from "./Player";
import Arrow from "./Arrow";
import { Vector3 } from 'three';

export default class LocalPlayer extends Player {
    elapsedTime: number = 0;
    arrow: Arrow;

    constructor(scene: THREE.Scene) {
        super(scene);
        this.arrow = new Arrow(scene);
        this.add(this.arrow);
        this.arrow.scale.set(0.2, 0.2, 0.2);
    }

    init(posX: number, posZ: number) {
        super.init(posX, posZ);

        this.curMoveSpeed = 4;
    }

    update(deltaTime: number) {
        // console.log(`x:${this.moveDirection.x}/y:${this.moveDirection.y}`);
        // if (VirtualJoystickManager.offset.x != 0 || VirtualJoystickManager.offset.y != 0)
        this.processInput(deltaTime);
        super.update(deltaTime);

        // this.changeSize(+0.05);
    }
    updateSpeed() {
        this.curMoveSpeed = THREE.MathUtils.lerp(4, 4 * 2, this.scale.x / 10);
        this.curRotateSpeed = THREE.MathUtils.lerp(Player.initRotateSpeed, Player.initRotateSpeed * 0.2, this.scale.x / 10);
    }

    processInput(deltaTime: number) {
    // processInput() {
        if (VirtualJoystickManager.offset.length() == 0)
            return;
        const inputDirection = VirtualJoystickManager.offset.normalize();
        this.moveDirection.lerp(inputDirection, deltaTime * 4);

        // const newDirection = VirtualJoystickManager.offset.normalize();
        // if (newDirection.length() > 0.1)
        // {
        //     console.log(`length:${newDirection.length()}`);
        //     console.log(`x:${newDirection.x}/y:${newDirection.y}`);
        //     this.moveDirection = newDirection;
        // }
        // // console.log(`x:${this.moveDirection.x}/y:${this.moveDirection.y}`);
        // // if (VirtualJoystickManager.offset.x != 0 && VirtualJoystickManager.offset.y != 0)
        // //     this.moveDirection = VirtualJoystickManager.offset.normalize();
        // // // else
        // //     // console.log("no input");
        // return;




        // if (VirtualJoystickManager.clicked == false)
        //     return;
        // // console.log(`VirtualJoystickManager.clicked:${VirtualJoystickManager.clicked}`);
        // // const joystickOffset = VirtualJoystickManager.offset.normalize();
        // let joystickOffset = VirtualJoystickManager.offset;
        // if (joystickOffset.x == 0 && joystickOffset.y == 0)
        //     return;
        // joystickOffset = joystickOffset.normalize();
        // // console.log(`length:${joystickOffset.length()}`)
        // if (joystickOffset.length() < 0.5)
        //     return;

        // // this.moveDirection.x = joystickOffset.x;
        // // this.moveDirection.y = joystickOffset.y;
        // // this.moveDirection = joystickOffset.normalize();

        // this.moveDirection = joystickOffset;
        // console.log(`x:${this.moveDirection.x}/y:${this.moveDirection.y}`);
    }

    changeSizeByElapsingTime() {
        if (this.scaling == true)
            return;
        if (this.colliding == true)
            return;

        this.scaling = true;
        setTimeout(()=>{
            this.changeSizeImmediately(+0.012);
            // console.log('haha');
            this.scaling = false;
        }, 100);
    }
}