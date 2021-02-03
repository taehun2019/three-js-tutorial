import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import MainScene from './main/MainScene';

//https://threejsfundamentals.org/threejs/lessons/threejs-fundamentals.html
const canvas = document.querySelector('#c') as HTMLCanvasElement;
canvas.getBoundingClientRect();

// const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
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

const pickPosition = {x: 0, y: 0};

function getCanvasRelativePosition(event: any) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: (event.clientX - rect.left) * canvas.width / rect.width,
        y: (event.clientY - rect.top) * canvas.height / rect.height,
    };
}

function setPickPosition(event: any) {
    const pos = getCanvasRelativePosition(event);
    pickPosition.x = (pos.x / canvas.width) * 2 - 1;
    pickPosition.y = (pos.y / canvas.height) * -2 + 1;  // Y를 뒤집습니다.
    // console.log(pickPosition);
}

function clearPickPosition() {
    // 항상 위치가있는 마우스와 달리
    // 사용자가 원하는 화면 터치를 중지하는 경우
    // 선택을 중지합니다. 지금은 값을 선택합니다.
    // 무언가를 선택하지 않을 것

    pickPosition.x = -100000;
    pickPosition.y = -100000;
}

function printPosition() {
    console.log(pickPosition);
}

// window.addEventListener('mousemove', setPickPosition);
// window.addEventListener('mouseout', clearPickPosition);
// window.addEventListener('mouseleave', clearPickPosition);
// window.addEventListener('mousedown', printPosition);


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

const controls = new OrbitControls(camera, renderer.domElement);
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
