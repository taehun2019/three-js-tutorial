import * as THREE from 'three';
import { Vector3 } from 'three';

export default class GizmosManager {
    private static instance: GizmosManager;
    static scene: THREE.Scene;

    static getInstance(scene?: THREE.Scene) { 
        if (!GizmosManager.instance) {
            if (scene === undefined)
                return undefined;
            // GizmosManager.instance = new GizmosManager(scene as THREE.Scene); 
            GizmosManager.scene = scene;
            GizmosManager.instance = new GizmosManager(); 
        } 
        return GizmosManager.instance; 
    }


    // constructor(scene: THREE.Scene) {
    //     GizmosManager.scene = scene;

    //     // const line = this.createLine(new THREE.LineBasicMaterial({color:'red'}));
    //     // const linePoints = [];
    //     // linePoints.push(new THREE.Vector3());
    //     // linePoints.push(new THREE.Vector3(10, 0.1, 10));
    //     // line.geometry.setFromPoints(linePoints);
    // }

    static createLine(material: THREE.LineBasicMaterial) {
        if (GizmosManager.scene === undefined)
            return undefined;
        // let linePoints = [];
        // linePoints.push(new Vector3());
        // this.linePoints.push(new THREE.Vector3());
        // linePoints.push(new Vector3());
        // points.push(new THREE.Vector3(10, 0, 0));
        // const geometry = new THREE.BufferGeometry().setFromPoints(linePoints);
        const geometry = new THREE.BufferGeometry(); //.setFromPoints(linePoints);
        const line = new THREE.Line(geometry, material);
        GizmosManager.scene.add(line);
        return line;
    }
}

export class LineGizmo {
    line: THREE.Line | undefined;
    material = new THREE.LineBasicMaterial();
    points: THREE.Vector3[] = [
        new THREE.Vector3(),
        new THREE.Vector3()
    ];

    // enable = false;

    constructor() {
        this.line = GizmosManager.createLine(this.material);
        // if (this.line === undefined) {
        //     this.enable = false;
        //     return;
        // }
    }
    init(color?: THREE.Color) {
        if (this.line === undefined)
            return;

        // this.line.visible = true;
        if (color !== undefined) {
            color.r *= 0.8;
            color.g *= 0.8;
            color.b *= 0.8;
            this.material.color = color;
        }
    }
    setVisible(value: boolean) {
        if (this.line === undefined)
            return;
        this.line.visible = value;
    }
    setStartPoint(position: THREE.Vector3) {
        this.points[0] = position;
        this.line?.geometry.setFromPoints(this.points);
    }
    setEndPoint(position: THREE.Vector3) {
        this.points[1] = position;
        this.line?.geometry.setFromPoints(this.points);
    }
}