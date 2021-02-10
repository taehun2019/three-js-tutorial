// import GameScene from '../common/GameScene';
import VirtualJoystickManager from './../common/VirtualJoystickManager';
import * as THREE from 'three'
// import { Scene3D, THREE } from 'enable3d';
import World from './World/World';

export default class MainScene extends THREE.Scene {
    world: World;
    isPlaying: boolean;
    constructor(scene: THREE.Scene) {
        super();
        
        this.world = new World(scene);
        this.isPlaying = false;

        this.init();
        this.world.localPlayer.dieAction = () => {
            this.lose();
        };
        this.world.enemyPlayers.forEach(enemyPlayer => {
            enemyPlayer.dieAction = () => {
                if (this.world.getAliveEnemyNum() <= 0)
                    this.win();
            };
        });
    }

    init() {
        this.world.init();
    }

    getCamera() {
        return this.world.mainCamera.camera;
    }

    update(deltaTime: number) {
        if (this.isPlaying == false)
        {
            if (VirtualJoystickManager.clicked == true)
                this.isPlaying = true;
            return;
        }
        this.world.update(deltaTime);
    }

    win() {
        // if (this.isPlaying == false)
        //     return;
        // this.isPlaying = false;
        console.log('win');
    }

    lose() {
        // if (this.isPlaying == false)
        //     return;
        // this.isPlaying = false;
        console.log('lose');
    }
}
