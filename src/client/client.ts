import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import MainScene from './main/MainScene';

const scene: THREE.Scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const stats = Stats()
document.body.appendChild(stats.dom)

let gameScene = new MainScene(scene);
let camera = gameScene.getCamera();

window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

// const controls = new OrbitControls(camera, renderer.domElement);
//controls.addEventListener('change', render)

var animate = function () {
    requestAnimationFrame(animate)


    // controls.update();
    gameScene.update();

    // renderer.render(scene, camera);
    render();

    stats.update();
};
animate();

function render() {
    // stats.begin()
    renderer.render(scene, camera)
    // stats.end()
}
// render()
