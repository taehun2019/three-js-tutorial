// import GameScene from '../common/GameScene';
import VirtualJoystickManager from 'common/scripts/Managers/VirtualJoystickManager';
import * as THREE from 'three'
// import { Scene3D, THREE } from 'enable3d';
import World from './World';
import * as EventEmitter from 'events';
import MainUI from './MainUI';
import { CameraState } from 'common/scripts/World/MainCamera';

export default class MainScene extends THREE.Scene {
    world: World;
    ui: MainUI;
    pause: boolean;
    callbacks: EventEmitter;

    updateAction: Function = () => { };
    // constructor(scene: THREE.Scene) {
    constructor() {
        super();
        
        this.ui = new MainUI();
        this.world = new World(this);
        this.add(this.world);
        this.pause = false;

        this.world.localPlayer.killCountAction = (count: number) => {
            this.ui.setKillCount(count);
        }
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
        this.world.init();
        this.ui.init();
        this.callbacks.emit('init');

        this.updateAction = this.updateInTitle;
    }

    getCamera() {
        return this.world.mainCamera.camera;
    }

    start() {
        this.world.start();
        this.ui.start();
        this.callbacks.emit('start');

        // this.updateAction = this.updateInPlay;
        this.updateAction = this.updateInPrePlay;
        setTimeout(() => {
            this.updateAction = this.updateInPlay;
            this.ui.swipeTuto.hide();
        }, 2000);
    }

    update(deltaTime: number) {
        this.updateAction(deltaTime);
    }
    updateInTitle(deltaTime: number) {
        this.world.localPlayer.update(deltaTime);
        this.ui.swipeTuto.update(deltaTime);
        if (VirtualJoystickManager.getInstance().clicked == true)
            this.start();
    }
    updateInPrePlay(deltaTime: number) {
        this.ui.swipeTuto.update(deltaTime);
        this.world.update(deltaTime);
    }
    updateInPlay(deltaTime: number) {
        if (this.pause === true)
            return;
        this.world.update(deltaTime);
    }
    updateInFinish(deltaTime: number) {
        this.world.updateInFinish(deltaTime);
    }

    win() {
        // if (this.isPlaying == false)
        //     return;
        // this.isPlaying = false;
        console.log('win');
        // this.world.localPlayer.isAlive = false;

        this.world.processLocalPlayerWin();
        this.world.mainCamera.state = CameraState.End;
        this.updateAction = this.updateInFinish;
    }

    lose() {
        // if (this.isPlaying == false)
        //     return;
        // this.isPlaying = false;
        console.log('lose');
    }
}
