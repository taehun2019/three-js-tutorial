import GameScene from '../common/GameScene';
import * as THREE from 'three'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import GUIManager from '../common/GUIManager';
import Player from './World/Player';
// import { GUI } from 'dat.gui';

export default class MainScene extends GameScene {
    // cube: THREE.Mesh;
    localPlayer: Player;
    light: THREE.DirectionalLight;
    ground: THREE.Mesh;
    


    // private static instance: MainScene;
    // static getInstance() { 
    //     if (!MainScene.instance) { 
    //         MainScene.instance = new MainScene(); 
    //     } 
    //     return MainScene.instance; 
    // }

    

    constructor(scene: THREE.Scene) {
        super(scene);

        this.mainCamera.setLength(50);
        this.mainCamera.setRotationX(5.2);
    
        const groundGeometry: THREE.CylinderGeometry = new THREE.CylinderGeometry(50, 50, 5, 20);
        // const groundMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
        const groundMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xddddff,})
        this.ground = new THREE.Mesh(groundGeometry, groundMaterial)
        scene.add(this.ground)
        this.ground.position.y = -2;

        this.light = new THREE.DirectionalLight('0xffffff', 1.3, );
        this.light.position.set(0, 100, 0);
        scene.add(this.light);

        const gui = GUIManager.getInstance().gui;
        const folder = gui.addFolder("Light");
        let subFolder;
        subFolder = folder.addFolder("Position")
        subFolder.add(this.light.position, "x", -100, 100, 0.1)
        subFolder.add(this.light.position, "y", -100, 100, 0.1)
        subFolder.add(this.light.position, "z", -100, 100, 0.1)
        subFolder = folder.addFolder("Rotation")
        subFolder.add(this.light.rotation, "x", -5, 5, 0.1)
        subFolder.add(this.light.rotation, "y", -5, 5, 0.1)
        subFolder.add(this.light.rotation, "z", -5, 5, 0.1)
        folder.open();

        this.localPlayer = new Player(scene);
        scene.add(this.localPlayer);


        this.init();
    }

    init() {
        this.localPlayer.init();
    }

    update(deltaTime: number) {
        this.localPlayer.update(deltaTime);
        this.mainCamera.update();
        // this.cube.rotation.x += 0.01;
        // this.cube.rotation.y += 0.01;
    }
}
