import * as THREE from 'three'
// import { PhysicsLoader } from '@enable3d/ammo-physics'
// import { THREE } from 'enable3d';
import AmmoModule from "ammojs-typed";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import MainScene from './main/MainScene';
import VirtualJoystickManager from './common/VirtualJoystickManager';

// //https://threejsfundamentals.org/threejs/lessons/threejs-fundamentals.html
// const canvas = document.querySelector('#c') as HTMLCanvasElement;
// canvas.getBoundingClientRect();

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({canvas});
// renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x459ce5);
const canvas = document.body.lastChild as HTMLCanvasElement;

const stats = Stats()
document.body.appendChild(stats.dom)

const scene: THREE.Scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// let gameScene: MainScene; // = new MainScene(scene);
// let camera: THREE.PerspectiveCamera; // = gameScene.getCamera();

const virtualJoystickManager = new VirtualJoystickManager(canvas);

const LoadGame = () => {
    console.log("physics loaded");

    let gameScene = new MainScene(scene);
    let camera = gameScene.getCamera();

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        render()
    }
    window.addEventListener('resize', onWindowResize, false);

    function onKeyDown(event: KeyboardEvent) {
        if (event.key == "q") {
            gameScene.world.localPlayer.changeSize(+0.1);
        }
        if (event.key == 'w') {
            gameScene.world.localPlayer.changeSize(-0.1);
        }
    }
    function onKeyUp(event: KeyboardEvent) {
        console.log("hoho!");
    }
    document.addEventListener("keydown", onKeyDown, false);
    document.addEventListener("keyup", onKeyUp, false);


    let preElapsedTime: number = 0;
    let curElapsedTime: number = 0;
    let deltaTime: number = 0;
    var animate = function (time: number) {
        
        preElapsedTime = curElapsedTime;
        curElapsedTime = time;
        deltaTime = curElapsedTime - preElapsedTime;
        deltaTime *= 0.001;


        gameScene.update(deltaTime);

        render();

        stats.update();

        requestAnimationFrame(animate)
    };

    function render() {
        renderer.render(scene, camera)
    }

    animate(0);
}

// PhysicsLoader('/ammo', () => LoadGame());


// function loadGame() {
//     console.log("physics loaded");

//     let gameScene = new MainScene(scene);
//     let camera = gameScene.getCamera();

//     animate(0);
// }




// const controls = new OrbitControls(camera, renderer.domElement);
//controls.addEventListener('change', render)






// ammo사용.
// const PhysicsLoader = (path:string, callback:Function) => {
//     if (typeof window !== 'undefined')
//         window.__loadPhysics = true;
//     loadAmmoModule(path, () => {
//         Ammo().then(() => {
//             callback();
//         });
//     });
// };
// const loadAmmoModule = (path:string, doneCallback:Function) => {
//     // console.log(wasmSupported ? 'WebAssembly is supported' : 'WebAssembly is not supported')
//     // if (wasmSupported)
//         loadScriptAsync(`${path}/ammo.wasm.js`, () => doneCallback());
//     // else
//         // loadScriptAsync(`${path}/ammo.js`, () => doneCallback());
// };
// const loadScriptAsync = (url:string, doneCallback:Function) => {
//     var tag = document.createElement('script');
//     tag.onload = () => {
//         doneCallback();
//     };
//     tag.onerror = () => {
//         throw new Error('failed to load ' + url);
//     };
//     tag.async = true;
//     tag.src = url;
//     document.head.appendChild(tag);
// };

// PhysicsLoader('.', () => LoadGame());
LoadGame();