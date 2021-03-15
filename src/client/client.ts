import * as THREE from 'three'
// import { PhysicsLoader } from '@enable3d/ammo-physics'
// import { THREE } from 'enable3d';
// import AmmoModule from "ammojs-typed";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import MainScene from './scripts/MainScene';
import VirtualJoystickManager from 'common/scripts/Managers/VirtualJoystickManager';
import AssetManager from 'common/scripts/Managers/AssetManager';
import GizmosManager from 'common/scripts/Managers/GizmosManager';
import DeviceManager from 'common/scripts/Managers/DeviceManager';
import PublishManager, { AdNetwork } from 'common/scripts/Managers/PublishManager';
import SoundManager from 'common/scripts/Managers/SoundManager';

// import bgm from './../assets/sounds/BackgroundMisic.mp3';
import bgm from './assets/sounds/BackgroundMisic.mp3';

// mintegral: https://www.mindworks-creative.com/review/doc/
// ironsource:
// https://docs.google.com/document/d/1OjEPQE-Uw12ioQWl_3FyPpHN5wXJo9srE6Xz95iuniU/edit
// https://demos.ironsrc.com/test-tool/?adUnitLoader=dapi&mode=testing

PublishManager.adNetwork = AdNetwork.AppLovin;

window.onload = () => {
    SoundManager.register('bgm', bgm, () => {
        PublishManager.load(loadThree);
    });
}

function loadThree() {

    //https://threejsfundamentals.org/threejs/lessons/threejs-fundamentals.html
    const canvas = document.querySelector('#c') as HTMLCanvasElement;
    canvas.getBoundingClientRect();

    const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({canvas});
    //참고: https://threejsfundamentals.org/threejs/lessons/threejs-responsive.html
    renderer.setSize(window.innerWidth * 2, window.innerHeight * 2, false);
    // renderer.setRenderTarget(null, undefined, 0);
    // renderer.setClearColor(0x459ce5);
    // renderer.shadowMap.enabled = true;
    renderer.setClearColor(0x6783ee);

    // 프레임 수 보기.
    // const stats = Stats()
    // document.body.appendChild(stats.dom)
    
    const gameScene = new MainScene((scene: THREE.Scene) => {
        VirtualJoystickManager.getInstance(canvas);
        // GizmosManager.getInstance(scene);
        AssetManager.getInstance();

        // const axesHelper = new THREE.AxesHelper(5);
        // scene.add(axesHelper);
    
        // const controls = new OrbitControls(camera, renderer.domElement);
        // //controls.addEventListener('change', render)
        // controls.enabled = false;
    });

    gameScene.ui.playNowButton.onClickAction = () => PublishManager.onClickDownloadButton();

    const LoadGame = () => {
        // console.log("physics loaded");
    
        let camera = gameScene.getCamera();

        function updateAspect() {
            gameScene.world.mainCamera.updateAspect();
            renderer.setSize(window.innerWidth * 2, window.innerHeight * 2, false);
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
                // gameScene.world.mainCamera.confettiEffect.play();
                // gameScene.world.localPlayer.killEffect.play();
                // gameScene.ui.swipeTuto.testNextFingerPoint();
                // gameScene.world.crown.visible = true;
                // gameScene.world.mainCamera.setLength(gameScene.world.mainCamera.getLengthByTargetScale());
                // gameScene.world.localPlayer.hitEffect.visible = !gameScene.world.localPlayer.hitEffect.visible;
                // gameScene.world.localPlayer.hitEffect.show();
                // gameScene.ui.playScreen.showCenterKillCount();
            }
        }
        document.addEventListener("keydown", onKeyDown, false);
        // function onKeyUp(event: KeyboardEvent) {
        //     // console.log("hoho!");
        // }
        // document.addEventListener("keyup", onKeyUp, false);

        gameScene.init();
    
        let preElapsedTime: number = 0;
        let curElapsedTime: number = 0;
        let deltaTime: number = 0;
        var animate = function (time: number) {
            
            preElapsedTime = curElapsedTime;
            curElapsedTime = time;
            deltaTime = curElapsedTime - preElapsedTime;
            deltaTime *= 0.001;

            // console.log(deltaTime);
            // console.log(document.hasFocus());
            // if (deltaTime < 1 && document.hasFocus() === true)
                // (document.hasFocus() || (window.parent !== undefined && window.parent.document.hasFocus())))
            // if (document.hasFocus() === true)
            if (deltaTime < 1)
                gameScene.update(deltaTime);
    
            render();
    
            // stats.update();
    
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



// // appendChild에서 null일 때 : https://stackoverflow.com/questions/9916747/why-is-document-body-null-in-my-javascript
// // body로 inject해서 괜찮아짐.
// window.onload = () => {
//     windowLoaded = true;
//     LoadThree();
// }

function printGraph(obj: THREE.Object3D) {
    // console.group(obj.name + ' <%o> ', obj);
    const groupName = obj.constructor.name + ((obj.name === '') ? '' : ` (${obj.name})`);
    console.groupCollapsed(groupName);
    obj.children.forEach(printGraph);
    console.groupEnd();
};

// const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
// document.body.append(renderer.domElement);
// const canvas = document.body.lastChild as HTMLCanvasElement;