import GUIManager from '../../common/GUIManager';
import * as THREE from 'three';
// import { THREE } from 'enable3d';
import Snow from './Snow';
import SnowTrail from './SnowTrail';
// import { Vector2, Vector3 } from 'three';

import AssetManager from 'common/scripts/Managers/AssetManager'
import shadow from './../../assets/images/common/circle.png'
import DieEffect from './DieEffect';

const Vector2 = THREE.Vector2;
const Vector3 = THREE.Vector3;

export default class Player extends THREE.Object3D {
    static initMoveSpeed: number = 7; //4; //10;
    static initRotateSpeed: number = 800; //200;

    dieAction: Function = () => { };
    killCountAction: Function = () => { };

    snow: Snow;
    shadow: THREE.Mesh;
    color: THREE.Color;
    dieEffect: DieEffect;
    // keyboard: any;

    moveDirection: THREE.Vector2;
    timeGrowSize: number;

    curMoveSpeed: number;
    curRotateSpeed: number;

    velocityY: number;

    isAlive: boolean;
    onGround: boolean;
    scaling: boolean;
    colliding: boolean;
    stopGrowing: boolean;

    snowTrailLeft: SnowTrail;
    snowTrailRight: SnowTrail;

    killCount = 0;

    constructor(scene: THREE.Scene) {
        super();
        this.snow = new Snow();
        this.color = new THREE.Color('white');
        this.add(this.snow);

        this.shadow = new THREE.Mesh();

        AssetManager.getInstance().loadTexture(shadow, (texture: THREE.Texture) => {
            this.shadow = new THREE.Mesh(
                new THREE.PlaneGeometry(2.3, 2.3),
                new THREE.MeshBasicMaterial({
                    //https://discourse.threejs.org/t/threejs-and-the-transparent-problem/11553/4
                    map: texture, color: 0x92a2b5, transparent: true, opacity: 0.5, depthWrite: false, depthTest: true //side: THREE.FrontSide
                })
            );
            this.shadow.rotation.x = -Math.PI / 2;
            this.shadow.position.y = 0.3;
            // plane.receiveShadow = true;
            // plane.position.y = -1;
            this.add(this.shadow);
        });


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

        this.velocityY = 0;
        this.onGround = true;
        this.scaling = false;
        this.colliding = false;
        this.isAlive = true;
        this.stopGrowing = false;

        this.snowTrailLeft = new SnowTrail(scene);
        this.snowTrailLeft.position.set(0.7, 0.5, -0.7); // = -1;
        this.add(this.snowTrailLeft);

        this.snowTrailRight = new SnowTrail(scene);
        this.snowTrailRight.position.set(-0.7, 0.5, -0.7); // = -1;
        this.add(this.snowTrailRight);

        this.dieEffect = new DieEffect();
        this.dieEffect.position.y = 3;
        this.add(this.dieEffect);

        this.timeGrowSize = 0.2; //0.01;
    }

    init(color: THREE.Color, posX: number, posZ: number) {
        this.visible = true;

        this.color = color;
        this.snow.init(color);

        this.shadow.visible = true;

        this.position.set(posX, 0, posZ);
        this.scale.set(1,1,1);

        this.moveDirection.x = THREE.MathUtils.randFloat(-1, 1);
        this.moveDirection.y = THREE.MathUtils.randFloat(-1, 1);
        this.moveDirection = this.moveDirection.normalize();
        this.rotate();

        this.curMoveSpeed = Player.initMoveSpeed;
        this.curRotateSpeed = Player.initRotateSpeed;

        this.velocityY = 0;
        this.isAlive = true;
        this.onGround = true;
        this.scaling = false;
        this.colliding = false;
        this.stopGrowing = false;

        this.snowTrailLeft.init();
        this.snowTrailRight.init();

        this.dieEffect.init(color);
        this.dieEffect.visible = false;

        this.killCount = 0;
    }
    start() {

    }

    update(deltaTime: number) {
        this.processInput(deltaTime);

        this.snowTrailLeft.update(deltaTime,  (this.onGround && this.isAlive));
        this.snowTrailRight.update(deltaTime, (this.onGround && this.isAlive));
        this.dieEffect.update(deltaTime);

        if (this.isAlive == false)
            return;
            
        // this.snow.rotation.x += 90 * THREE.MathUtils.DEG2RAD * deltaTime;
        this.snow.rotation.x += this.curRotateSpeed * THREE.MathUtils.DEG2RAD * deltaTime;

        this.position.x += +this.moveDirection.x * this.curMoveSpeed * deltaTime;
        this.position.z += -this.moveDirection.y * this.curMoveSpeed * deltaTime;

        if (this.onGround == false)
        {
            // this.velocityY -= 50 * deltaTime;
            this.velocityY = -40;
            // this.velocityY -= 0 * deltaTime;
            // console.log(`velocityY:${this.velocityY}`);
            this.position.y += this.velocityY * deltaTime;
            if (this.position.y < -50)
            {
                this.die();
            }
        }

        this.changeSizeByElapsingTime(deltaTime);

        this.rotate();
    }
    processInput(deltaTime: number) {
        
    }

    rotate() {
        const moveDirection = this.moveDirection;

        const newLook = new Vector3().copy(this.position);
        newLook.x += moveDirection.x;
        newLook.z -= moveDirection.y;
        
        this.lookAt(newLook);

        //0~90 90~180 180~270 -90~0 0~90
        //0~90 90~180 180~270 270~360 0~90
    }

    changeSizeImmediately(deltaSize: number) {
        let newSize = this.scale.x + deltaSize;
        // this.scale.set(newSize, newSize, newSize);
        this.scale.setScalar(newSize);
        this.updateSpeed();

        if (newSize < 1)
        {
            this.die(true);
        }
    }
    kill(player: Player) {
        if (this.stopGrowing === true)
            return;
        this.changeSizeImmediately(+0.5);

        this.killCount++;
        this.killCountAction?.(this.killCount);
    }
    die(showEffect: boolean = false) {
        this.isAlive = false;
        // this.visible = false;
        this.snow.visible = false;
        this.shadow.visible = false;
        this.dieAction();

        if (showEffect === true) {
            this.dieEffect.visible = true;
            this.dieEffect.play();
            setTimeout(() => {
                this.dieEffect.visible = false;
            }, 3000);
        }
    }
    updateSpeed() {
        this.curMoveSpeed = THREE.MathUtils.lerp(Player.initMoveSpeed, Player.initMoveSpeed * 3.0, THREE.MathUtils.clamp((this.scale.x - 1) / (5 - 1), 0, 1));
        this.curRotateSpeed = THREE.MathUtils.lerp(Player.initRotateSpeed, Player.initRotateSpeed * 0.1, THREE.MathUtils.clamp((this.scale.x - 1) / (4 - 1), 0, 1));
    }

    changeSizeByElapsingTime(deltaTime: number) {
        if (this.colliding === true)
            return;
        if (this.stopGrowing === true)
            return;

        this.changeSizeImmediately(this.timeGrowSize * deltaTime);
    }
    changeSizeByCollision(deltaSize: number) {
        this.colliding = true;
        this.changeSizeImmediately(deltaSize);
    }
}