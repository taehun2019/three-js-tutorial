import { POINT_CONVERSION_HYBRID } from "constants";
import * as THREE from "three";
import { Object3D, Vector3 } from "three";

export default class SnowTrail extends THREE.Object3D {

    // sphere: THREE.Mesh;
    // eye: THREE.Mesh;
    curIndex: number;
    elapsedTime: number;
    scene: THREE.Scene;

    particleList: THREE.Object3D[];
    activeParticleList: Map<THREE.Object3D, number>;

    static particleCount = 100;

    constructor(scene: THREE.Scene) {
        super();
        this.scene = scene;

        // const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(.5, .5, .5);
        // // const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: false })
        // // const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, })
        // const material: THREE.MeshToonMaterial = new THREE.MeshToonMaterial({ color: 0x7777ff, })
        
        // this.sphere = new THREE.Mesh(geometry, material)
        // this.add(this.sphere);


        // const vertices = [];
        // for ( let i = 0; i < 10000; i ++ ) {

        //     // const x = THREE.MathUtils.randFloatSpread( 2000 );
        //     // const y = THREE.MathUtils.randFloatSpread( 2000 );
        //     // const z = THREE.MathUtils.randFloatSpread( 2000 );
        //     const x = THREE.MathUtils.randFloatSpread( 100 );
        //     const y = THREE.MathUtils.randFloatSpread( 100 );
        //     const z = THREE.MathUtils.randFloatSpread( 100 );

        //     vertices.push( x, y, z );
        // }

        // const geometry = new THREE.BufferGeometry();
        // geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
        // // const material = new THREE.PointsMaterial( { color: 0x888888 } );
        // const material = new THREE.PointsMaterial( { color: 0xffffff } );
        // const points = new THREE.Points( geometry, material );
        // points.scale.setLength(0.1);
        // // points.position.y = 2;
        // this.add(points);






        this.particleList = [];
        for (let index = 0; index < SnowTrail.particleCount; index++) {
            const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
            // const material = new THREE.PointsMaterial( { size:1, color: 0xffffff } );
            // const points = new THREE.Points( geometry, material );
            // const material = new THREE.MeshPhongMaterial( { color: 0xffffff } );
            const material = new THREE.MeshToonMaterial( { color: 0xffffff } );
            const points = new THREE.Mesh( geometry, material );
            // points.scale.setLength(0.1);
            // points.position.y = 2;
            this.add(points);
            points.visible = false;
            this.particleList[index] = points;
        }

        this.activeParticleList = new Map<Object3D, number>();


        // this.position.y = 1;
        // this.position.z = -1;

        // const gui = GUIManager.getInstance().gui;
        
        // const cubeFolder = gui.addFolder("Cube");
        // const cubePositionFolder = cubeFolder.addFolder("Position")
        // cubePositionFolder.add(this.sphere.position, "x", -10, 10)
        // cubePositionFolder.add(this.sphere.position, "y", -10, 10)
        // cubePositionFolder.add(this.sphere.position, "z", -10, 10)
        // cubeFolder.add(this.sphere, "visible", true)
        // cubeFolder.open()

        this.curIndex = 0;
        this.elapsedTime = 0;
    }

    init() {
        this.curIndex = 0;
        this.elapsedTime = 0;
        // this.activePointsList = [];
        this.particleList.forEach(particle => {
            particle.visible = false;
        });
        this.activeParticleList.clear();
    }

    update(deltaTime: number, generate: boolean) {
        const worldScale = this.getWorldScale(new Vector3()).x;
        const maxParticleTime = THREE.MathUtils.clamp(worldScale, 0, 2);
        // this.pointsList[this.curIndex].scale.subScalar(1 * deltaTime);
        this.activeParticleList.forEach((value, key, map) => {
            const points = key;
            let elapsedTime = value;
            // points.scale.subScalar(0.1 * deltaTime);
            // points.scale.setLength(THREE.MathUtils.lerp(worldScale, 0, elapsedTime));
            points.scale.setLength(THREE.MathUtils.lerp(worldScale, 0, THREE.MathUtils.clamp(elapsedTime / maxParticleTime, 0, 1)));
            elapsedTime += deltaTime;
            map.set(key, elapsedTime);
            // if (elapsedTime > 1)
            if (elapsedTime > maxParticleTime)
            {
                points.visible = false;
                this.activeParticleList.delete(points);
            }
        });

        if (generate == false)
            return;

        this.elapsedTime += deltaTime;
        if (this.elapsedTime > 0.03)
        {
            this.elapsedTime = 0;
            // this.pointsList[this.curIndex]
            this.curIndex = (this.curIndex + 1) % SnowTrail.particleCount;
            const points = this.particleList[this.curIndex];
            points.parent = this.scene;
            this.scene.add(points);
            // this.remove(points);
            points.scale.setLength(this.getWorldScale(new Vector3()).x);
            points.rotation.set(THREE.MathUtils.randFloatSpread(5),THREE.MathUtils.randFloatSpread(5),THREE.MathUtils.randFloatSpread(5));
            points.position.copy(this.getWorldPosition(new Vector3()));
            points.visible = true;
            this.activeParticleList.set(points, 0);
            // setTimeout(()=>{
            //     points.visible = false;
            //     this.activePointsList.delete(points);
            // }, 10000);
        }
    }
}