import GUIManager from '../../common/GUIManager';
import * as THREE from 'three';
// import { THREE } from 'enable3d';
import Snow from './Snow';
import SnowTrail from './SnowTrail';
// import { Vector2, Vector3 } from 'three';

const Vector2 = THREE.Vector2;
const Vector3 = THREE.Vector3;

export default class Player extends THREE.Object3D {
    static initMoveSpeed: number = 7; //4; //10;
    static initRotateSpeed: number = 800; //200;

    dieAction: Function = () => { };

    snow: Snow;
    keyboard: any;
    moveDirection: THREE.Vector2;

    curMoveSpeed: number;
    curRotateSpeed: number;

    velocityY: number;

    onGround: boolean;
    scaling: boolean;
    colliding: boolean;

    snowTrailLeft: SnowTrail;
    snowTrailRight: SnowTrail;

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

        this.velocityY = 0;
        this.onGround = true;
        this.scaling = false;
        this.colliding = false;

        this.snowTrailLeft = new SnowTrail(scene);
        this.snowTrailLeft.position.set(0.7, 0.5, -0.7); // = -1;
        this.add(this.snowTrailLeft);

        this.snowTrailRight = new SnowTrail(scene);
        this.snowTrailRight.position.set(-0.7, 0.5, -0.7); // = -1;
        this.add(this.snowTrailRight);

    }

    init(color: THREE.Color, posX: number, posZ: number) {
        this.visible = true;

        this.snow.init(color);
        const raycaster = new THREE.Raycaster(this.position, new Vector3(0, -1, 0), 0, 1);
        // raycaster.intersectObject()
        this.position.set(posX, 0, posZ);
        // console.log(`input : posX:${posX}/posY:${posZ}`);
        // console.log(`this.positin : posX:${this.position.x}/posY:${this.position.z}`);

        // this.scale.set(0.5, 0.5, 0.5);
        this.scale.set(1,1,1);
        // this.scale.setLength(1);

        this.moveDirection.x = THREE.MathUtils.randFloat(-1, 1);
        this.moveDirection.y = THREE.MathUtils.randFloat(-1, 1);
        this.moveDirection = this.moveDirection.normalize();
        // console.log(this.moveDirection);
        this.rotate(0);

        this.curMoveSpeed = Player.initMoveSpeed;
        this.curRotateSpeed = Player.initRotateSpeed;

        this.velocityY = 0;
        this.onGround = true;
        this.scaling = false;
        this.colliding = false;

        this.snowTrailLeft.init();
        this.snowTrailRight.init();
    }

    update(deltaTime: number) {
        this.snowTrailLeft.update(deltaTime, this.onGround);
        this.snowTrailRight.update(deltaTime, this.onGround);

        if (this.visible == false)
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

        this.changeSizeByElapsingTime();

        this.rotate(deltaTime);
    }

    rotate(deltaTime: number) {
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
        this.scale.set(newSize, newSize, newSize);
        this.updateSpeed();

        if (newSize < 1)
        {
            this.die();
        }
    }
    die() {
        this.visible = false;
        this.dieAction();
    }
    updateSpeed() {
        this.curMoveSpeed = THREE.MathUtils.lerp(Player.initMoveSpeed, Player.initMoveSpeed * 2.5, THREE.MathUtils.clamp((this.scale.x - 1) / (5 - 1), 0, 1));
        this.curRotateSpeed = THREE.MathUtils.lerp(Player.initRotateSpeed, Player.initRotateSpeed * 0.2, THREE.MathUtils.clamp((this.scale.x - 1) / (5 - 1), 0, 1));
    }

    changeSizeByElapsingTime() {
        if (this.scaling == true)
            return;
        if (this.colliding == true)
            return;

        this.scaling = true;
        setTimeout(()=>{
            this.changeSizeImmediately(+0.01);
            // console.log('haha');
            this.scaling = false;
        }, 100);
    }
    changeSizeByCollision(deltaSize: number) {
        if (this.colliding == true)
            return;
        
        // console.log('intersection!');
        this.colliding = true;
        setTimeout(() => {
            this.changeSizeImmediately(deltaSize);
            this.colliding = false;
        }, 10);
    }
}