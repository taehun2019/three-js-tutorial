import GameScene from '../common/GameScene';
import * as THREE from 'three'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
// import { GUI } from 'dat.gui';

export default class MainScene extends GameScene {
    cube: THREE.Mesh;

    constructor(scene: THREE.Scene) {
        super(scene);

        this.camera.position.z = 10;
        this.camera.rotation.x = 70;
    
        const groundGeometry: THREE.CylinderGeometry = new THREE.CylinderGeometry(50, 50, 5, 20);
        // const groundMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
        const groundMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xddddff,})
        const ground: THREE.Mesh = new THREE.Mesh(groundGeometry, groundMaterial)
        scene.add(ground)

        const geometry: THREE.SphereGeometry = new THREE.SphereGeometry(5, 20, 20);
        const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
        
        this.cube = new THREE.Mesh(geometry, material)
        const cube = this.cube;
        scene.add(cube)


        const gui = new GUI();
        const cubeFolder = gui.addFolder("Cube");
        const cubeRotationFolder = cubeFolder.addFolder("Rotation")
        cubeFolder.add(cube.rotation, "x", 0, Math.PI * 2, 0.01)
        cubeFolder.add(cube.rotation, "y", 0, Math.PI * 2, 0.01)
        cubeFolder.add(cube.rotation, "z", 0, Math.PI * 2, 0.01)
        const cubePositionFolder = cubeFolder.addFolder("Position")
        cubePositionFolder.add(cube.position, "x", -10, 10)
        cubePositionFolder.add(cube.position, "y", -10, 10)
        cubePositionFolder.add(cube.position, "z", -10, 10)
        const cubeScaleFolder = cubeFolder.addFolder("Scale")
        cubeScaleFolder.add(cube.scale, "x", -5, 5, 0.1)
        cubeScaleFolder.add(cube.scale, "y", -5, 5, 0.1)
        cubeScaleFolder.add(cube.scale, "z", -5, 5, 0.1)
        cubeFolder.add(cube, "visible", true)
        cubeFolder.open()
        const cameraFolder = gui.addFolder("Camera")
        cameraFolder.add(this.camera.position, "z", 0, 100, 0.01)
        cameraFolder.open()

    }

    update() {

        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
    }
}
