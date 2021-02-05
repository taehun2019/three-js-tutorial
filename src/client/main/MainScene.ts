import GameScene from '../common/GameScene';
import * as THREE from 'three'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import GUIManager from '../common/GUIManager';
import Player from './World/Player';
import LocalPlayer from './World/LocalPlayer';
import { Vector3 } from 'three';
// import { GUI } from 'dat.gui';

const enemyNum = 1;

export default class MainScene extends GameScene {
    // cube: THREE.Mesh;
    localPlayer: LocalPlayer;
    light: THREE.DirectionalLight;
    ground: THREE.Mesh;
    
    enemyPlayers: Player[];
    totalPlayers: Player[];

    

    // private static instance: MainScene;
    // static getInstance() { 
    //     if (!MainScene.instance) { 
    //         MainScene.instance = new MainScene(); 
    //     } 
    //     return MainScene.instance; 
    // }

    constructor(scene: THREE.Scene) {
        super(scene);

        this.mainCamera.setLength(40);
        this.mainCamera.setRotationX(5.2);

        // const geome: THREE.SphereGeometry = new THREE.SphereGeometry(50, 20, 20);
        // const mat: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
        // const box = new THREE.Mesh(geome, mat);
        // scene.add(box);
    
        const groundGeometry: THREE.CylinderGeometry = new THREE.CylinderGeometry(40, 40, 5, 20);
        // const groundMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
        const groundMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xddddff,})
        this.ground = new THREE.Mesh(groundGeometry, groundMaterial)
        scene.add(this.ground)
        this.ground.position.y = -2;

        this.light = new THREE.DirectionalLight(0xffffff, 1.3);
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

        this.localPlayer = new LocalPlayer(scene);
        scene.add(this.localPlayer);


        this.enemyPlayers = [];
        for (let index = 0; index < enemyNum; index++) {
            this.enemyPlayers[index] = new Player(scene);
            scene.add(this.enemyPlayers[index]);
        }

        this.totalPlayers = [];
        this.totalPlayers[0] = this.localPlayer;
        for (let index = 0; index < enemyNum; index++) {
            this.totalPlayers[index + 1] = this.enemyPlayers[index];
        }

        this.init();
    }

    init() {
        this.localPlayer.init(0, 0);
        
        for (let index = 0; index < this.enemyPlayers.length; index++) {
            const posX = THREE.MathUtils.randInt(-30, 30);
            const posY = THREE.MathUtils.randInt(-30, 30);
            this.enemyPlayers[index].init(posX, posY);
        }

        this.mainCamera.init(this.localPlayer);
    }

    update(deltaTime: number) {
        this.localPlayer.update(deltaTime);
        this.mainCamera.update();
        // this.cube.rotation.x += 0.01;
        // this.cube.rotation.y += 0.01;
        for (let index = 0; index < this.enemyPlayers.length; index++) {
            this.enemyPlayers[index].update(deltaTime);
        }

        this.checkCollision();
    }

    checkCollision() {
        for (let aIndex = 0; aIndex < this.totalPlayers.length; aIndex++) {
            const playerA = this.totalPlayers[aIndex];
            const playerAPos = new Vector3();
            playerAPos.copy(playerA.position);

            for (let bIndex = 0; bIndex < this.totalPlayers.length; bIndex++) {
                const playerB = this.totalPlayers[bIndex];
                const playerBPos = new Vector3();
                playerBPos.copy(playerB.position);
                
                // playerB.position.add(playerA.position);
                // const distance = playerBPos.addScaledVector(playerAPos, -1).length();
                // console.log("distance:"+distance);
            }
        }
    }
}
