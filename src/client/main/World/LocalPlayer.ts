import * as THREE from 'three';
import VirtualJoystickManager from "../../common/VirtualJoystickManager";
import Player from "./Player";
import Arrow from "./Arrow";
import KillEffect from './KillEffect';

export default class LocalPlayer extends Player {
    elapsedTime: number = 0;
    arrow: Arrow;
    killEffect: KillEffect;

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

        this.arrow.visible = true;
        this.killEffect.visible = false;
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