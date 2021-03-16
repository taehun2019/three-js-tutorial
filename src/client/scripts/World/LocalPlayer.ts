import * as THREE from 'three';
import VirtualJoystickManager from "common/scripts/Managers/VirtualJoystickManager";
import Player from "./Player";
import Arrow from "./Arrow";
import SnowKillEffect from './SnowKillEffect';
import Snow from './Snow';
import { LineGizmo } from 'common/scripts/Managers/GizmosManager';
import SoundManager from 'common/scripts/Managers/SoundManager';

export default class LocalPlayer extends Player {
    elapsedTime: number = 0;
    arrow: Arrow;
    killEffect: SnowKillEffect;

    titleAnimMaxTime = 3;
    titleAnimCurTime = 0;
    
    lineGizmo: LineGizmo | undefined;

    constructor(world: THREE.Object3D) {
        super(world);
        this.timeGrowSize = 0.2; //0.012;

        this.arrow = new Arrow();
        this.arrow.position.y = 0.2;
        this.add(this.arrow);
        this.arrow.scale.set(0.2, 0.2, 0.2);


        this.killEffect = new SnowKillEffect();
        this.add(this.killEffect);

        this.lineGizmo = new LineGizmo();
    }

    init(color: THREE.Color, startPoint: THREE.Vector2, faceNum: number) {
        super.init(color, startPoint, faceNum);

        this.moveDirection.set(0, 1);
        this.rotate();
        this.snow.position.y = Snow.groundOffset;
        this.snow.rotation.x = (-50 / 180) * Math.PI;
        this.shadow.scale.setScalar(1);

        this.arrow.visible = false;
        this.killEffect.visible = false;

        this.updateAction = this.updateInTitle;
        this.rotation.y = 0;
        this.titleAnimCurTime = 0;

        this.lineGizmo?.init(new THREE.Color('black'));
        this.lineGizmo?.setVisible(true);
    }
    start() {
        super.start();
        this.moveDirection.x = this.position.x;
        this.moveDirection.y = this.position.z;
        this.moveDirection.multiplyScalar(-1).normalize();
        VirtualJoystickManager.getInstance().offset.copy(this.moveDirection);
        // console.log(`moveDirection:${this.moveDirection.x}/${this.moveDirection.y}`);
        // console.log(`VirtualJoystickManager.getInstance().offset:${VirtualJoystickManager.getInstance().offset.x}/${VirtualJoystickManager.getInstance().offset.y}`);
        this.arrow.visible = true;

        SoundManager.play('snowRoll', true, 2);
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
        super.update(deltaTime);
        if (this.killEffect.visible === true)
            this.killEffect.update(deltaTime);
        if (this.onGround === false && SoundManager.checkPlaying('snowRoll')) {
            SoundManager.stop('snowRoll');
        }
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

    processInput(deltaTime: number) {
        const joystickOffset = VirtualJoystickManager.getInstance().offset;
        if (joystickOffset.length() == 0)
            return;
        const inputDirection = new THREE.Vector2().copy(joystickOffset.normalize());
        // inputDirection.y *= -1;
        this.moveDirection.lerp(inputDirection, deltaTime * 10).normalize();
        // console.log(this.moveDirection);

        // console.log(`moveDirection:${this.moveDirection.x}/${this.moveDirection.y}`);
        // console.log(`inputDirection:${inputDirection.x}/${inputDirection.y}`);

        if (this.lineGizmo !== undefined) {
            const startPos = this.getWorldPosition(new THREE.Vector3());
            startPos.y = 0.2;
            this.lineGizmo?.setStartPoint(startPos);

            const endPos = startPos.clone();
            endPos.x += this.moveDirection.x * 10;
            endPos.z += this.moveDirection.y * 10;
            this.lineGizmo?.setEndPoint(endPos);
        }
    }

    fromDirectionInFinish = new THREE.Vector2(0, 0);
    toDirectionInFinsh = new THREE.Vector2(0, 1);
    curRotateTimeInFinish = 0;
    maxRotateTimeInFinish = 1;
    win() {
        this.stopGrowing = true;
        this.curMoveSpeed = 0;
        this.curRotateSpeed = 0;

        this.arrow.visible = false;

        this.fromDirectionInFinish.copy(this.moveDirection);
        this.curRotateTimeInFinish = 0;

        // this.rotation.y = 0;
        // this.snow.rotation.x = (-35 / 180) * Math.PI;
        this.updateAction = this.updateInFinish;
    }
    finishJumpVelocityY = 0;
    finishJumpPower = 0;
    updateInFinish(deltaTime: number) {
        // this.rotation.y += (20 / 180) * Math.PI * deltaTime;
        // this.rotation.y = THREE.MathUtils.lerp(this.rotation.y, 0, deltaTime * 3);
        // console.log(this.rotation.y);

        this.curRotateTimeInFinish += deltaTime;
        const newDirection = new THREE.Vector2().copy(this.fromDirectionInFinish).lerp(this.toDirectionInFinsh, this.curRotateTimeInFinish / this.maxRotateTimeInFinish);
        this.moveDirection.copy(newDirection);
        this.rotate();

        this.snow.rotation.x = (-35 / 180) * Math.PI;

        if (this.curRotateTimeInFinish >= this.maxRotateTimeInFinish) {
            this.finishJumpPower = this.scale.x;
            this.finishJumpVelocityY = this.finishJumpPower;
            this.updateAction = this.updateInFinishJump;
        }

        this.snowTrailLeft.update(deltaTime,  false);
        this.snowTrailRight.update(deltaTime, false);
    }
    updateInFinishJump(deltaTime: number) {
        this.finishJumpVelocityY -= this.finishJumpPower * 2 * deltaTime;
        this.snow.position.y += this.finishJumpVelocityY * deltaTime;
        // console.log(deltaPos.y, this.position.y);
        if (this.snow.position.y < Snow.groundOffset) {
            this.snow.position.y = Snow.groundOffset;
            this.finishJumpVelocityY = this.finishJumpPower;
        }

        this.snowTrailLeft.update(deltaTime,  false);
        this.snowTrailRight.update(deltaTime, false);

        this.shadow.updateScale(this.snow.position.y - Snow.groundOffset);
    }
}