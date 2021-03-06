// import GameScene from '../common/GameScene';
import VirtualJoystickManager from 'common/scripts/Managers/VirtualJoystickManager';
import * as THREE from 'three'
// import { Scene3D, THREE } from 'enable3d';
import World from './World';
import * as EventEmitter from 'events';
import MainUI from './MainUI';
import { CameraState } from 'common/scripts/World/MainCamera';
import { TrailRenderer } from 'common/downloads/TrailRenderer/TrailRenderer'
import SoundManager from 'common/scripts/Managers/SoundManager';

import bgm from './../assets/sounds/Background_loop.mp3';
import winSound from './../assets/sounds/Victory.mp3';
import loseSound from './../assets/sounds/Failed.mp3';
import snowFallSound from './../assets/sounds/SnowFall.mp3';
import snowRollSound from './../assets/sounds/SnowRoll.mp3';
import snowBrokenSound from './../assets/sounds/SnowBroken.mp3';
import buttonClickSound from './../assets/sounds/Button.mp3';

export default class MainScene extends THREE.Scene {
    world: World;
    ui: MainUI;
    pause: boolean;
    callbacks: EventEmitter;

    updateAction: Function = () => { };

    touch: boolean = false;

    // constructor(scene: THREE.Scene) {
    constructor(initManagersAction?: Function) {
        super();

        if (initManagersAction !== undefined)
            initManagersAction(this);
        
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

        const trailRenderer = new TrailRenderer(this, false);
        const trailMaterial = TrailRenderer.createBaseMaterial();

        SoundManager.register('bgm', bgm);
        SoundManager.register('win', winSound);
        SoundManager.register('lose', loseSound);
        SoundManager.register('snowBroken', snowBrokenSound);
        SoundManager.register('snowFall', snowFallSound);
        SoundManager.register('snowRoll', snowRollSound);
        SoundManager.register('buttonClick', buttonClickSound);
    }
    onWindowResize() {
        for (let index = 0; index < this.world.totalPlayers.length; index++) {
            this.world.totalPlayers[index].updateProfile();
        }
    }

    init() {
        //@ts-ignore
        window.gameReady && window.gameReady();

        this.world.init();
        this.ui.init();
        this.callbacks.emit('init');

        this.updateAction = this.updateInTitle;

        // this.touch = false;
        // setTimeout(() => {
        //     if (this.touch === false) {
        //         this.readyToStart();
        //         this.touch = true;
        //     }
        // }, 3000)

        // SoundManager.resume();
        // SoundManager.stop();
        // SoundManager.play('bgm', true);
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
        //@ts-ignore
        window.gameStart && window.gameStart();

        this.world.start();
        this.ui.start();
        this.callbacks.emit('start');
        this.updateAction = this.updateInPlay;
        SoundManager.play('bgm', true);
    }

    update(deltaTime: number) {
        this.updateAction(deltaTime);
    }
    updateInTitle(deltaTime: number) {
        this.world.localPlayer.update(deltaTime);
        this.world.snowfallEffect.update(deltaTime);
        this.ui.swipeTuto.update(deltaTime);
        if (VirtualJoystickManager.getInstance().clicked == true) {
            this.readyToStart();
            this.touch = true;
        }


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
        // SoundManager.stop();
        SoundManager.play('win');
        //@ts-ignore
        window.gameEnd && window.gameEnd();

        // if (this.isPlaying == false)
        //     return;
        // this.isPlaying = false;
        console.log('win');
        // this.world.localPlayer.isAlive = false;

        this.world.processLocalPlayerWin();
        this.world.stopGrowPlayers();
        this.world.mainCamera.state = CameraState.End;
        this.ui.showWinScreen();

        this.updateAction = this.updateInFinish;
    }

    lose() {
        // SoundManager.stop();
        SoundManager.play('lose');
        //@ts-ignore
        window.gameEnd && window.gameEnd();

        // if (this.isPlaying == false)
        //     return;
        // this.isPlaying = false;
        console.log('lose');
        this.world.stopGrowPlayers();
        this.ui.showLoseScreen();
    }

    processTryAction(tryCount: number) {
        if (tryCount === 0) {
            //@ts-ignore
            window.gameRetry && window.gameRetry();
            this.init();
        }
        else {
            this.ui.playNowButton.onClickAction();
        }
    }
}
