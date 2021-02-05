import * as THREE from "three";
import { Quaternion } from "three";
import VirtualJoystickManager from "../../common/VirtualJoystickManager";
import Player from "./Player";

export default class LocalPlayer extends Player {
    elapsedTime: number = 0;

    constructor(scene: THREE.Scene) {
        super(scene);

        const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(5, 2, 2);
        const material: THREE.MeshToonMaterial = new THREE.MeshToonMaterial({ color: 0xff0000, })
        
        const box1 = new THREE.Mesh(geometry, material)
        this.add(box1);
        box1.position.set(1, 1, 8);
        box1.rotation.y = 45 * THREE.MathUtils.DEG2RAD;

        const box2 = new THREE.Mesh(geometry, material)
        this.add(box2);
        box2.position.set(-1, 1, 8);
        box2.rotation.y = -45 * THREE.MathUtils.DEG2RAD;
    }

    update(deltaTime: number) {

        const joystickOffset = VirtualJoystickManager.offset.normalize();

        if (joystickOffset.x != 0 || joystickOffset.y || 0)
        {
            this.processInput(deltaTime, joystickOffset);
        }

        super.update(deltaTime);
    }

    processInput(deltaTime: number, joystickOffset: THREE.Vector2) {
        // this.moveDirection.x = joystickOffset.x;
        // this.moveDirection.y = joystickOffset.y;
        // this.moveDirection = joystickOffset.normalize();
        this.moveDirection = joystickOffset;
        

        let desireAngleY = Math.atan2(joystickOffset.y, joystickOffset.x) + 90 * THREE.MathUtils.DEG2RAD;
        let curAngleY = this.rotation.y;

        // let diff = desireAngleY - curAngleY;

        this.elapsedTime += deltaTime;
        if (this.elapsedTime > 2)
        {
            this.elapsedTime = 0;
            // console.log(desireAngleY * THREE.MathUtils.RAD2DEG);
            // console.log(curAngleY * THREE.MathUtils.RAD2DEG);
            // console.log("diff:"+diff * THREE.MathUtils.RAD2DEG);
        }
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
        newLook.x += joystickOffset.x;
        newLook.z -= joystickOffset.y;
        this.lookAt(newLook);

        //0~90 90~180 180~270 -90~0 0~90
        //0~90 90~180 180~270 270~360 0~90
    }
}