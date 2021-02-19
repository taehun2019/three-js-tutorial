import * as THREE from 'three';
import { Vector3 } from 'three';

export default class GizmosManager {
    private static instance: GizmosManager;
    static getInstance(scene?: THREE.Scene) { 
        if (!GizmosManager.instance) {
            if (scene === undefined)
                return undefined;
            GizmosManager.instance = new GizmosManager(scene as THREE.Scene); 
        } 
        return GizmosManager.instance; 
    }

    scene: THREE.Scene;

    constructor(scene: THREE.Scene) {
        this.scene = scene;
        // const line = this.createLine(new THREE.LineBasicMaterial({color:'red'}));
        // const linePoints = [];
        // linePoints.push(new THREE.Vector3());
        // linePoints.push(new THREE.Vector3(10, 0.1, 10));
        // line.geometry.setFromPoints(linePoints);
    }

    createLine(material: THREE.LineBasicMaterial) {
        // let linePoints = [];
        // linePoints.push(new Vector3());
        // this.linePoints.push(new THREE.Vector3());
        // linePoints.push(new Vector3());
        // points.push(new THREE.Vector3(10, 0, 0));
        // const geometry = new THREE.BufferGeometry().setFromPoints(linePoints);
        const geometry = new THREE.BufferGeometry(); //.setFromPoints(linePoints);
        const line = new THREE.Line(geometry, material);
        this.scene.add(line);
        return line;
    }
}