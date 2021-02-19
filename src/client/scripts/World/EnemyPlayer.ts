import GizmosManager from 'common/scripts/Managers/GizmosManager';
import * as THREE from 'three'
import { LineBasicMaterial } from 'three';
import Player from "./Player";

enum EnemyState {
    Move,
    Chase,
    RunAway,
}

const gizmosManager = GizmosManager.getInstance();

export default class EnemyPlayer extends Player {

    state = EnemyState.Move;
    maxMoveTime = 0;
    curMoveTime = 0;

    inputDirection = new THREE.Vector2(0, 0);

    waypoints: THREE.Vector2[] = [];
    destination = new THREE.Vector2();
    curWaypointIndex = 0;

    
    line: THREE.Line | undefined = undefined;
    lineMaterial = new THREE.LineBasicMaterial();
    linePoints: THREE.Vector3[] = [];

    // constructor(scene: THREE.Scene) {
    //     super(scene);
    // }

    initWithWaypoints(color: THREE.Color, startPoint: THREE.Vector2, waypoints: THREE.Vector2[]) {
        super.init(color, startPoint);
        this.waypoints = waypoints;
        this.curWaypointIndex = -1;

        this.state = EnemyState.Move;
        this.maxMoveTime = 0;
        this.curMoveTime = 0;

        if (GizmosManager.getInstance() !== undefined && this.line === undefined) {
            this.lineMaterial.color = color;
            this.line = GizmosManager.getInstance()?.createLine(this.lineMaterial);
            this.linePoints = [];
            this.linePoints.push(new THREE.Vector3());
            this.linePoints.push(new THREE.Vector3());
        }
    }
    die(showEffect: boolean = false) {
        super.die(showEffect);
        if (this.line !== undefined)
            this.line.visible = false;
    }

    processInput(deltaTime: number) {
        switch (this.state) {
            case EnemyState.Move:
                this.processRandomInput(deltaTime);
                break;
        
            default:
                break;
        }
    }
    processRandomInput(deltaTime: number) {
        // const curWorldPos = this.getWorldPosition(new THREE.Vector3());
        // const curWorldPosInXZ = new THREE.Vector2(curWorldPos.x, curWorldPos.z);
        const curPosInXZ = new THREE.Vector2(this.position.x, this.position.z);
        if (this.curMoveTime >= this.maxMoveTime) {
            
            this.maxMoveTime = 10; //Math.random() * 2 + 1;
            this.curMoveTime = 0;

            // this.inputDirection.x = Math.random() * 2 - 1;
            // this.inputDirection.y = Math.random() * 2 - 1;
            // this.inputDirection.normalize();
            const preIndex = this.curWaypointIndex;
            do {
                this.curWaypointIndex = THREE.MathUtils.randInt(0, this.waypoints.length - 1);
            } while (preIndex !== -1 && preIndex === this.curWaypointIndex)

            this.destination = this.waypoints[this.curWaypointIndex];
            this.inputDirection.copy(this.destination).sub(curPosInXZ).normalize();
            // console.log('================================================');
            // console.log(this.inputDirection);
            // console.log('================================================');
        }
        this.moveDirection.lerp(this.inputDirection, deltaTime * 10).normalize();
        this.curMoveTime += deltaTime;

        const toDestVector = new THREE.Vector2().copy(this.destination).sub(curPosInXZ).normalize();
        // console.log(this.destination);
        // console.log(curPosInXZ);
        // console.log(toDestVector);
        // console.log(this.inputDirection);
        if (toDestVector.dot(this.inputDirection) < 0) {
            this.maxMoveTime = 0;
        }

        this.linePoints[0] = this.getWorldPosition(new THREE.Vector3());
        this.linePoints[0].y = 0.1;
        this.linePoints[1] = new THREE.Vector3(this.destination.x, 0.1, this.destination.y);
        this.line?.geometry.setFromPoints(this.linePoints);
    }
}