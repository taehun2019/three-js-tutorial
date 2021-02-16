// import GameScene from '../common/GameScene';
import VirtualJoystickManager from './../common/VirtualJoystickManager';
import * as THREE from 'three'
// import { Scene3D, THREE } from 'enable3d';
import World from './World/World';
import * as EventEmitter from 'events';

export default class MainScene extends THREE.Scene {
    world: World;
    isPlaying: boolean;
    pause: boolean;
    callbacks: EventEmitter;
    // constructor(scene: THREE.Scene) {
    constructor() {
        super();
        
        this.world = new World(this);
        this.add(this.world);
        this.isPlaying = false;
        this.pause = false;

        this.world.localPlayer.dieAction = () => {
            this.lose();
        };
        this.world.enemyPlayers.forEach(enemyPlayer => {
            enemyPlayer.dieAction = () => {
                if (this.world.getAliveEnemyNum() <= 0)
                    this.win();
            };
        });
        this.callbacks = new EventEmitter();
        
        this.init();

        console.log(this);
    }

    init() {
        this.isPlaying = false;

        this.world.init();
        this.callbacks.emit('init');
    }

    getCamera() {
        return this.world.mainCamera.camera;
    }

    start() {
        this.isPlaying = true;
        this.world.start();
        this.callbacks.emit('start');
    }

    update(deltaTime: number) {
        if (this.pause == true)
            return;
        if (this.isPlaying == false)
        {
            if (VirtualJoystickManager.clicked == true)
                this.start();
            return;
        }
        this.world.update(deltaTime);
    }

    win() {
        // if (this.isPlaying == false)
        //     return;
        // this.isPlaying = false;
        console.log('win');
        // this.world.localPlayer.isAlive = false;

        this.world.processLocalPlayerWin();
    }

    lose() {
        // if (this.isPlaying == false)
        //     return;
        // this.isPlaying = false;
        console.log('lose');
    }
}
