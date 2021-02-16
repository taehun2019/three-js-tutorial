import * as THREE from 'three'
// import { PhysicsLoader } from '@enable3d/ammo-physics'
// import { THREE } from 'enable3d';
import AmmoModule from "ammojs-typed";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import MainScene from './main/MainScene';
import VirtualJoystickManager from './common/VirtualJoystickManager';
import AssetManager from './common/AssetManager';
import title from './assets/images/snow_roll_title.png'
// import titleFont from './assets/fonts/FredokaOne-Regular.ttf'

// //https://threejsfundamentals.org/threejs/lessons/threejs-fundamentals.html
// const canvas = document.querySelector('#c') as HTMLCanvasElement;
// canvas.getBoundingClientRect();

let mraidLoaded = false;
let windowLoaded = false;

let mraidService: any;
// console.log('A');
try {
    //@ts-ignore
    mraidService = mraid;
    if (mraidService.getState() === 'loading')
        mraidService.addEventListener('ready', () => {
            mraidLoaded = true;
            LoadThree();
        });
    else {
        mraidLoaded = true;
        LoadThree();
    }
}
catch(error) {
    console.log(error);
    console.log("mraid is not exist")
}
// console.log('B');

// // appendChild에서 null일 때 : https://stackoverflow.com/questions/9916747/why-is-document-body-null-in-my-javascript
// window.onload = () => {
//     windowLoaded = true;
//     LoadThree();
// }

if (mraidService === undefined) {
    LoadThree();
    // setTimeout(()=>LoadThree(), 1000);
}

function printGraph(obj: THREE.Object3D) {
    // console.group(obj.name + ' <%o> ', obj);
    const groupName = obj.constructor.name + ((obj.name === '') ? '' : ` (${obj.name})`);
    console.groupCollapsed(groupName);
    obj.children.forEach(printGraph);
    console.groupEnd();
};

function LoadThree() {
    // if (windowLoaded === false)
    //     return;
    if (mraidService !== undefined && mraidLoaded === false)
        return;
    // console.log('C');

    const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.shadowMap.enabled = true;
    // document.body.appendChild(renderer.domElement);
    document.body.append(renderer.domElement);
    // document.body.prepend(renderer.domElement);

    // const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({canvas});
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setClearColor(0x459ce5);
    renderer.setClearColor(0x6783ee);
    const canvas = document.body.lastChild as HTMLCanvasElement;

    const titleImage = document.getElementById("title") as HTMLImageElement;
    titleImage.src = title;
    // titleImage.onclick = () => {
    //     console.log('hahaha');
    // }

    // const titleText = document.getElementById("title")?.style;
    // titleText?.fontFamily = titleFont;

    // console.log('D');
    
    const stats = Stats()
    document.body.appendChild(stats.dom)

    // console.log('E');
    
    // //@ts-ignore
    // document.getElementById("bottomBtn").addEventListener("click", function() {
    //     // console.log("HOHO");
    //     if (mraidService !== undefined)
    //         mraidService.open("https://apps.apple.com/us/app/snow-roll-io/id1545852074");
    // }, false);
    
    // const rootScene: THREE.Scene = new THREE.Scene();
    const gameScene = new MainScene();
    const axesHelper = new THREE.AxesHelper(5);
    gameScene.add(axesHelper);
    
    
    const LoadGame = () => {
        // console.log("physics loaded");
        // const virtualJoystickManager = new VirtualJoystickManager(canvas);
        const virtualJoystickManager = VirtualJoystickManager.getInstance(canvas);
        const assetManager = AssetManager.getInstance();
    
        // let gameScene = new MainScene(rootScene);
        // rootScene.add(gameScene);
        let camera = gameScene.getCamera();
        // console.log(gameScene);
        printGraph(gameScene);

        gameScene.callbacks.addListener('init', () => {
            titleImage.style.visibility = 'visible';
        });
        gameScene.callbacks.addListener('start', () => {
            titleImage.style.visibility = 'hidden';
        })
    
        function updateAspect() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        updateAspect();
        function onWindowResize() {
            updateAspect();
            render()
        }
        window.addEventListener('resize', onWindowResize, false);
    
        function onKeyDown(event: KeyboardEvent) {
            if (event.key == "q") {
                gameScene.world.localPlayer.changeSizeImmediately(+0.1);
                // console.log(gameScene.world.localPlayer.curRotateSpeed);
            }
            if (event.key == 'w') {
                gameScene.world.localPlayer.changeSizeImmediately(-0.1);
            }
            if (event.key == 'o') {
                gameScene.pause = !gameScene.pause;
            }
            if (event.key == 'i') {
                gameScene.init();
            }
            if (event.key == 'e') {
                gameScene.world.mainCamera.confettiEffect.play();
            }
        }
        function onKeyUp(event: KeyboardEvent) {
            // console.log("hoho!");
        }
        document.addEventListener("keydown", onKeyDown, false);
        document.addEventListener("keyup", onKeyUp, false);
    
        // const controls = new OrbitControls(camera, renderer.domElement);
        //controls.addEventListener('change', render)
    
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
            renderer.render(gameScene, camera)
        }
    
        animate(0);
    }
    LoadGame();
}

// PhysicsLoader('/ammo', () => LoadGame());


// function loadGame() {
//     console.log("physics loaded");

//     let gameScene = new MainScene(scene);
//     let camera = gameScene.getCamera();

//     animate(0);
// }










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