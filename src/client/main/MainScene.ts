// import GameScene from '../common/GameScene';
import * as THREE from 'three'
// import { Scene3D, THREE } from 'enable3d';
import World from './World/World';

export default class MainScene extends THREE.Scene {
    world: World
    constructor(scene: THREE.Scene) {
        super();
        
        this.world = new World(scene);
    }

    getCamera() {
        return this.world.mainCamera.camera;
    }

    update(deltaTime: number) {
        this.world.update(deltaTime);
    }
}
