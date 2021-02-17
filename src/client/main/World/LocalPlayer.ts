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
        this.arrow.position.y = 0.2;
        this.add(this.arrow);
        this.arrow.scale.set(0.2, 0.2, 0.2);

        this.timeGrowSize = 0.24; //0.012;
    }

    init(color: THREE.Color, posX: number, posZ: number) {
        super.init(color, posX, posZ);

        // this.curMoveSpeed = 10; //4;
        this.arrow.visible = true;
    }
    kill(player: Player) {
        super.kill(player);
        // console.log('show kill effect');
    }
    die(showEffect: boolean = false) {
        super.die(showEffect);
        this.arrow.visible = false;
    }

    update(deltaTime: number) {
        // console.log(`x:${this.moveDirection.x}/y:${this.moveDirection.y}`);
        // if (VirtualJoystickManager.offset.x != 0 || VirtualJoystickManager.offset.y != 0)
        this.processInput(deltaTime);
        super.update(deltaTime);

        // this.changeSizeImmediately(+0.1 * deltaTime);
    }
    // updateSpeed() {
    //     this.curMoveSpeed = THREE.MathUtils.lerp(4, 4 * 2, this.scale.x / 10);
    //     this.curRotateSpeed = THREE.MathUtils.lerp(Player.initRotateSpeed, Player.initRotateSpeed * 0.2, this.scale.x / 10);
    // }

    processInput(deltaTime: number) {
    // processInput() {
        const joystickOffset = VirtualJoystickManager.getInstance().offset;
        if (joystickOffset.length() == 0)
            return;
        const inputDirection = joystickOffset.normalize();
        // this.moveDirection.lerp(inputDirection, deltaTime * 4);
        this.moveDirection.lerp(inputDirection, deltaTime * 10).normalize();
    }

    // changeSizeByElapsingTime() {
    //     if (this.scaling == true)
    //         return;
    //     if (this.colliding == true)
    //         return;
    //     if (this.stopGrowing === true)
    //         return;

    //     this.scaling = true;
    //     setTimeout(()=>{
    //         this.changeSizeImmediately(+0.012);
    //         this.scaling = false;
    //     }, 100);
    // }
}