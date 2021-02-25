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
        this.world = new World();
        this.add(this.world);
        this.pause = false;

        this.world.localPlayer.killCountAction = (count: number) => {
            this.ui.playScreen.setKillCount(count);
            const screenPos = this.world.mainCamera.convertWorldToScreen(this.world.localPlayer.getHeadPos());
            this.ui.playScreen.showCenterKillCount(count, screenPos);
            // this.updateProfileAction(this.getScreenPosAction(this.position));
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
        for (let index = 0; index < this.world.totalPlayers.length; index++) {
            if(index === 0)
                continue;
            const player = this.world.totalPlayers[index];
            const profile = this.ui.playScreen.playerProfiles[index - 1];
            player.updateProfileAction = profile.updatePosition.bind(profile);
            player.hideProfileAction = profile.hide.bind(profile);

            player.getScreenPosAction = this.world.mainCamera.convertWorldToScreen.bind(this.world.mainCamera);
        }

        this.callbacks = new EventEmitter();
        
        // this.init();

        // console.log(this);

        this.ui.finishScreen.onClickTryAgainAction = this.processTryAction.bind(this);

        window.addEventListener('resize', () => this.onWindowResize(), false);
        this.onWindowResize();
    }
    onWindowResize() {
        for (let index = 0; index < this.world.totalPlayers.length; index++) {
            this.world.totalPlayers[index].updateProfile();
        }
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

    readyToStart() {
        this.world.readyToStart();
        const readyTime = 1.5;
        this.ui.readyToStart(readyTime);
        this.updateAction = this.updateInReady;
        setTimeout(() => {
            this.start();
        }, readyTime * 1000);
    }

    start() {
        this.world.start();
        this.ui.start();
        this.callbacks.emit('start');
        this.updateAction = this.updateInPlay;
    }

    update(deltaTime: number) {
        this.updateAction(deltaTime);
    }
    updateInTitle(deltaTime: number) {
        this.world.localPlayer.update(deltaTime);
        this.world.snowfallEffect.update(deltaTime);
        this.ui.swipeTuto.update(deltaTime);
        if (VirtualJoystickManager.getInstance().clicked == true)
            this.readyToStart();


        this.world.localPlayer.hitEffect.update(deltaTime);
    }
    updateInReady(deltaTime: number) {
        this.ui.update(deltaTime);
        this.world.update(deltaTime);
    }
    updateInPlay(deltaTime: number) {
        if (this.pause === true)
            return;
        this.world.update(deltaTime);
        this.ui.update(deltaTime);
    }
    updateInFinish(deltaTime: number) {
        this.world.updateInFinish(deltaTime);
        this.ui.update(deltaTime);
    }

    win() {
        // if (this.isPlaying == false)
        //     return;
        // this.isPlaying = false;
        console.log('win');
        // this.world.localPlayer.isAlive = false;

        this.world.processLocalPlayerWin();
        this.world.mainCamera.state = CameraState.End;
        this.ui.showWinScreen();

        this.updateAction = this.updateInFinish;
    }

    lose() {
        // if (this.isPlaying == false)
        //     return;
        // this.isPlaying = false;
        console.log('lose');
        this.ui.showLoseScreen();
    }

    processTryAction(tryCount: number) {
        if (tryCount === 0)
            this.init();
        else
            this.ui.playNowButton.onClickAction();
    }
}
