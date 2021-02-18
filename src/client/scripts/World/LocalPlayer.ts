import * as THREE from 'three';
import VirtualJoystickManager from "common/scripts/Managers/VirtualJoystickManager";
import Player from "./Player";
import Arrow from "./Arrow";
import KillEffect from './KillEffect';

export default class LocalPlayer extends Player {
    elapsedTime: number = 0;
    arrow: Arrow;
    killEffect: KillEffect;

    updateAction: Function = () => { };

    titleAnimMaxTime = 3;
    titleAnimCurTime = 0;

    constructor(scene: THREE.Scene) {
        super(scene);
        this.timeGrowSize = 0.24; //0.012;

        this.arrow = new Arrow(scene);
        this.arrow.position.y = 0.2;
        this.add(this.arrow);
        this.arrow.scale.set(0.2, 0.2, 0.2);


        this.killEffect = new KillEffect();
        this.add(this.killEffect);

    }

    init(color: THREE.Color, posX: number, posZ: number) {
        super.init(color, posX, posZ);
        this.moveDirection.set(0, -1);
        this.rotate();
        this.snow.rotation.x = (-50 / 180) * Math.PI;

        this.arrow.visible = false;
        this.killEffect.visible = false;

        this.updateAction = this.updateInTitle;
        this.rotation.y = 0;
        this.titleAnimCurTime = 0;
    }
    start() {
        this.arrow.visible = true;
        this.updateAction = this.updateInPlay;
    }
    kill(player: Player) {
        super.kill(player);
        this.killEffect.play();
    }
    die(showEffect: boolean = false) {
        super.die(showEffect);
        this.arrow.visible = false;
    }

    update(deltaTime: number) {
        this.updateAction(deltaTime);
    }
    toLeftTime = (1/3) * this.titleAnimMaxTime;
    toRightTime = (2/3) * this.titleAnimMaxTime;
    toCenterTime = (3/3) * this.titleAnimMaxTime;
    titleMoveCooldown = false;
    updateInTitle(deltaTime: number) {
        if (this.titleMoveCooldown === true)
            return;

        if (this.titleAnimCurTime < this.toLeftTime) {
            this.rotateInTitleAnim(deltaTime, 45, this.toLeftTime, 45, 0.2);
            return;
        }
        if (this.titleAnimCurTime < this.toRightTime) {
            this.rotateInTitleAnim(deltaTime, -90, this.toRightTime, -45, 0.3);
            return;
        }
        if (this.titleAnimCurTime < this.toCenterTime) {
            this.rotateInTitleAnim(deltaTime, 45, this.toCenterTime, 0, 2);
            if (this.titleAnimCurTime >= this.toCenterTime) {
                this.titleAnimCurTime = 0;
            }
            return;
        }
    }
    rotateInTitleAnim(deltaTime: number, speed: number, maxTime: number, destAngleY: number, cooldownTime: number) {
        this.rotation.y += (speed / 180) * Math.PI * deltaTime;
        this.titleAnimCurTime += deltaTime;
        if (this.titleAnimCurTime >= maxTime) {
            this.rotation.y = (destAngleY / 180) * Math.PI;
            this.titleAnimCurTime = maxTime;
            this.titleMoveCooldown = true;
            setTimeout(() => {
                this.titleMoveCooldown = false;
            }, cooldownTime * 1000)
        }
    }

    updateInPlay(deltaTime: number) {
        super.update(deltaTime);

        if (this.killEffect.visible === true)
            this.killEffect.update(deltaTime);
    }
    processInput(deltaTime: number) {
        const joystickOffset = VirtualJoystickManager.getInstance().offset;
        if (joystickOffset.length() == 0)
            return;
        const inputDirection = joystickOffset.normalize();
        // this.moveDirection.lerp(inputDirection, deltaTime * 4);
        this.moveDirection.lerp(inputDirection, deltaTime * 10).normalize();
    }
}