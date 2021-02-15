import * as THREE from 'three'
// import * as AmmoPhysics from '../../../packages/enable3d/enable3d.ammoPhysics.0.21.0.min.js;
// import { THREE } from '@enable3d/three-graphics'
// import { AmmoPhysics } from '@enable3d/ammo-physics'
// import asd from 'enabl3d'
// import { THREE, Scene3D, PhysicsLoader, Project } from 'enable3d'
const Vector3 = THREE.Vector3;

import GUIManager from './../../common/GUIManager';
import Player from './../World/Player';
import LocalPlayer from './../World/LocalPlayer';
import MainCamera from '../../common/MainCamera';

// v = require('./../../common/ParticleSystem');
import ParticleSystem from './../../common/ParticleSystem'

const enemyNum = 7;

const colors = [
    new THREE.Color(0xdfeeff),
    new THREE.Color(0xff665d),
    new THREE.Color(0x00d629),
    new THREE.Color(0xd4d600),
    new THREE.Color(0x767676),
    new THREE.Color(0xb700db),
    new THREE.Color(0xee9500),
    new THREE.Color(0x00e5e7),
]

export default class World extends THREE.Scene {
    // cube: THREE.Mesh;
    mainCamera: MainCamera;
    localPlayer: LocalPlayer;
    light: THREE.DirectionalLight;
    ground: THREE.Mesh;
    // physics: AmmoPhysics;
    
    enemyPlayers: Player[];
    totalPlayers: Player[];

    vibrateCooldown: boolean;

    constructor(scene: THREE.Scene) {
        super();

        // this.physics = new AmmoPhysics(scene as any);
        // this.physics.debug?.enable();

        this.mainCamera = new MainCamera(scene);
        this.mainCamera.setLength(40);
        this.mainCamera.setRotationX(5.2);

        // const geome: THREE.SphereGeometry = new THREE.SphereGeometry(50, 20, 20);
        // const mat: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
        // const box = new THREE.Mesh(geome, mat);
        // scene.add(box);
    
        const groundGeometry: THREE.CylinderGeometry = new THREE.CylinderGeometry(40, 40, 5, 20);
        // const groundMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
        // const groundMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xddddff,})
        // const groundMaterial = new THREE.MeshToonMaterial({ color: 0xcee4ff,})
        const groundMaterial = new THREE.MeshToonMaterial({ color: 0xaabbff,})
        this.ground = new THREE.Mesh(groundGeometry, groundMaterial);
        // this.ground.receiveShadow = true;
        scene.add(this.ground)
        this.ground.position.y = -2.52;


        const waterGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(1000, 1000);
        const waterMaterial = new THREE.MeshToonMaterial({ color: 0x6783ee, opacity: 0.8, transparent: true})
        const water = new THREE.Mesh(waterGeometry, waterMaterial)
        water.rotation.x = -90 * THREE.MathUtils.DEG2RAD;
        water.position.y = -5;
        scene.add(water)
        // water.position.y = -2;

        // this.physics.add.existing(this.ground);
        // PhysicsLoader('/lib', () => { });
        // PhysicsLoader('', () => { });

        // this.physics.add.existing(this.ground as any);
        // (this.ground as any).body.setCollisionFlags(2) // make it kinematic


        this.light = new THREE.DirectionalLight(0xffffff, 1.3);
        this.light.position.set(0, 100, 0);
        // this.light.castShadow = true;
        scene.add(this.light);

        // const cameraHelper = new THREE.CameraHelper(this.light.shadow.camera);
        // scene.add(cameraHelper);
        // this.light.shadow.camera.left   = -40;
        // this.light.shadow.camera.right  = +40;
        // this.light.shadow.camera.top    = -40;
        // this.light.shadow.camera.bottom = +40;
        // // this.light.shadow.camera.near   = 0.5;
        // // this.light.shadow.camera.far    = 20;
        // // this.light.shadow.camera.zoom = 10;
        // this.light.shadow.mapSize.set(1024, 1024); //= new THREE.Vector2()


        // const gui = GUIManager.getInstance().gui;
        // const folder = gui.addFolder("Light");
        // let subFolder;
        // subFolder = folder.addFolder("Position")
        // subFolder.add(this.light.position, "x", -100, 100, 0.1)
        // subFolder.add(this.light.position, "y", -100, 100, 0.1)
        // subFolder.add(this.light.position, "z", -100, 100, 0.1)
        // subFolder = folder.addFolder("Rotation")
        // subFolder.add(this.light.rotation, "x", -5, 5, 0.1)
        // subFolder.add(this.light.rotation, "y", -5, 5, 0.1)
        // subFolder.add(this.light.rotation, "z", -5, 5, 0.1)
        // folder.open();

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

        // this.init();


        // this.physics.add.box({ x: 0.05, y: 10 }, { lambert: { color: 0x2194ce } })

        // // green sphere
        // const geometry = new THREE.BoxBufferGeometry()
        // const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 })
        // const cube = new THREE.Mesh(geometry, material)
        // cube.position.set(0, 5, 0)
        // scene.add(cube)
        // this.physics.add.existing(cube as any)
        // // @ts-expect-error
        // cube.body.setCollisionFlags(2) // make it kinematic

        
        // //@ts-ignore
        // PhysicsLoader('/lib', () => new Project({ scenes: [MainScene], antialias: true }))

        // let curve;
        // let curveObject;
        // {
        // const controlPoints = [
        //     [1.118281, 5.115846, -3.681386],
        //     [3.948875, 5.115846, -3.641834],
        //     [3.960072, 5.115846, -0.240352],
        //     [3.985447, 5.115846, 4.585005],
        //     [-3.793631, 5.115846, 4.585006],
        //     [-3.826839, 5.115846, -14.736200],
        //     [-14.542292, 5.115846, -14.765865],
        //     [-14.520929, 5.115846, -3.627002],
        //     [-5.452815, 5.115846, -3.634418],
        //     [-5.467251, 5.115846, 4.549161],
        //     [-13.266233, 5.115846, 4.567083],
        //     [-13.250067, 5.115846, -13.499271],
        //     [4.081842, 5.115846, -13.435463],
        //     [4.125436, 5.115846, -5.334928],
        //     [-14.521364, 5.115846, -5.239871],
        //     [-14.510466, 5.115846, 5.486727],
        //     [5.745666, 5.115846, 5.510492],
        //     [5.787942, 5.115846, -14.728308],
        //     [-5.423720, 5.115846, -14.761919],
        //     [-5.373599, 5.115846, -3.704133],
        //     [1.004861, 5.115846, -3.641834],
        // ];
        // const p0 = new THREE.Vector3();
        // const p1 = new THREE.Vector3();
        // curve = new THREE.CatmullRomCurve3(
        //     controlPoints.map((p, ndx) => {
        //     // p0.set(...p);
        //     p0.set(p[0], p[1], p[2]);
        //     // p1.set(...controlPoints[(ndx + 1) % controlPoints.length]);
        //     p1.set(controlPoints[(ndx + 1) % controlPoints.length][0],
        //         controlPoints[(ndx + 1) % controlPoints.length][1],
        //         controlPoints[(ndx + 1) % controlPoints.length][2],
        //     );
        //     return [
        //         (new THREE.Vector3()).copy(p0),
        //         (new THREE.Vector3()).lerpVectors(p0, p1, 0.1),
        //         (new THREE.Vector3()).lerpVectors(p0, p1, 0.9),
        //     ];
        //     }).flat(),
        //     true,
        // );
        // {
        //     const points = curve.getPoints(250);
        //     const geometry = new THREE.BufferGeometry().setFromPoints(points);
        //     const material = new THREE.LineBasicMaterial({color: 0xff0000});
        //     curveObject = new THREE.Line(geometry, material);
        //     scene.add(curveObject);
        // }
        // }


        // let asdf = new ParticleSystem();
        // let asdf = new ParticleSystem({
        //     parent: scene,
        //     camera: this.mainCamera.camera,
        // });

        this.vibrateCooldown = false;
    }

    init() {
        this.localPlayer.init(colors[0], 0, 0);
        
        for (let index = 0; index < this.enemyPlayers.length; index++) {
            const posX = THREE.MathUtils.randInt(-30, 30);
            const posZ = THREE.MathUtils.randInt(-30, 30);
            this.enemyPlayers[index].init(colors[index + 1],posX, posZ);
        }

        this.mainCamera.init(this.localPlayer);
        this.vibrateCooldown = false;

        // this.checkCollision();
    }

    update(deltaTime: number) {

        // this.physics.update(deltaTime * 1000);
        // this.physics.updateDebugger();

        this.localPlayer.update(deltaTime);
        if (this.localPlayer.onGround == true)
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
            if (playerA.visible == false)
                continue;
            // const playerAPos = new Vector3();
            // playerAPos.copy(playerA.position);

            //충돌 체크.
            for (let bIndex = aIndex + 1; bIndex < this.totalPlayers.length; bIndex++) {
                const playerB = this.totalPlayers[bIndex];
                if (playerB.visible == false)
                    continue;
                // const playerBPos = new Vector3();
                // playerBPos.copy(playerB.position);
                
                // playerB.position.add(playerA.position);
                // const distance = playerBPos.addScaledVector(playerAPos, -1).length();
                // console.log("distance:"+distance);
                this.checkIntersection(playerA, playerB);
            }

            //땅 체크.
            let center = new Vector3;
            playerA.snow.getWorldPosition(center);
            const raycast = new THREE.Raycaster(center, new Vector3(0, -1, 0), 0, 20);
            let onGround = false;
            // raycast.set(playerAPos, new Vector3(0, -1, 0));
            const intersect = raycast.intersectObject(this.ground, true);
            for (let index = 0; index < intersect.length; index++) {
                playerA.position.y = intersect[index].point.y - (playerA.scale.x * 0.2);
                playerA.velocityY = 0;
                // console.log("on ground");
                onGround = true;
            }
            playerA.onGround = onGround;
        }
    }

    checkIntersection(playerA: Player, playerB: Player) {
        const minDistance = playerA.scale.x + playerB.scale.x;
        const curDistance = Math.sqrt(
            (playerB.position.x - playerA.position.x) * (playerB.position.x - playerA.position.x) + 
            (playerB.position.z - playerA.position.z) * (playerB.position.z - playerA.position.z)
        );
        if (curDistance < minDistance)
        {
            // console.log('intersection!');
            const biggerPlayer = (playerA.scale.x > playerB.scale.x) ? playerA : playerB;
            const smallerPlayer = (playerA.scale.x > playerB.scale.x) ? playerB : playerA;

            biggerPlayer.changeSizeByCollision(+0.005);
            smallerPlayer.changeSizeByCollision(-0.01);

            // const smallerPosition = smallerPlayer.position;
            // let pushVector = smallerPosition.sub(biggerPlayer.position).setLength(minDistance - curDistance);
            let fromBiggerToSmaller = new Vector3().copy(smallerPlayer.position).sub(biggerPlayer.position);
            let pushSmallerVector = new Vector3().copy(fromBiggerToSmaller).setLength((minDistance - curDistance) * 0.8);
            let pushBiggerVector = new Vector3().copy(fromBiggerToSmaller).setLength((minDistance - curDistance) * -0.2);

            smallerPlayer.position.add(pushSmallerVector);
            // smallerPlayer.position.add(new Vector3(0.1,0.1,0.1));
            biggerPlayer.position.add(pushBiggerVector);

            if (biggerPlayer === this.localPlayer)
            {
                if (smallerPlayer.visible === false)
                    this.vibrate(50, true);
                else
                    this.vibrate(10);
            }
        }
    }
    getAliveEnemyNum() {
        let aliveNum = 0;
        this.enemyPlayers.forEach(enemyPlayer => {
            if (enemyPlayer.visible == true)
                aliveNum++;
        });
        return aliveNum;
    }

    vibrate(millisecond: number, immediately: boolean = false) {
        if (immediately === false && this.vibrateCooldown === true)
            return;

        if (immediately === true)
            window.navigator.vibrate(0);

        window.navigator.vibrate(millisecond);
        // console.log(`vibrate ${millisecond}`);

        this.vibrateCooldown = true;
        setTimeout(() => {
            this.vibrateCooldown = false;
        }, millisecond);
    }
}