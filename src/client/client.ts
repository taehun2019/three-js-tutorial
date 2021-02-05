import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import MainScene from './main/MainScene';
import VirtualJoystickManager from './common/VirtualJoystickManager';

//https://threejsfundamentals.org/threejs/lessons/threejs-fundamentals.html
const canvas = document.querySelector('#c') as HTMLCanvasElement;
canvas.getBoundingClientRect();

// const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x459ce5);
// document.body.appendChild(renderer.domElement);

const stats = Stats()
document.body.appendChild(stats.dom)

const scene: THREE.Scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

let gameScene = new MainScene(scene);
let camera = gameScene.getCamera();

window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const virtualJoystickManager = new VirtualJoystickManager(canvas);

function onKeyDown(event: KeyboardEvent) {
    if (event.key == "ArrowDown")
    {

    }
}
function onKeyUp(event: KeyboardEvent) {
    console.log("hoho!");
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

    // console.log(deltaTime);
    requestAnimationFrame(animate)


    // controls.update();
    gameScene.update(deltaTime);

    // renderer.render(scene, camera);
    render();

    stats.update();

};
animate(0);

function render() {
    // stats.begin()
    renderer.render(scene, camera)
    // stats.end()
}
// render()
