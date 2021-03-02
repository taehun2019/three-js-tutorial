import GizmosManager, { LineGizmo } from 'common/scripts/Managers/GizmosManager';
import * as THREE from 'three'
import { LineBasicMaterial } from 'three';
import Player from "./Player";

enum EnemyState {
    Move,
    Chase,
    RunAway,
}

export default class EnemyPlayer extends Player {

    state = EnemyState.Move;
    maxMoveTime = 0;
    curMoveTime = 0;

    inputDirection = new THREE.Vector2(0, 0);

    waypoints: THREE.Vector2[] = [];
    destination = new THREE.Vector2();
    curWaypointIndex = 0;

    
    lineGizmo: LineGizmo | undefined;

    constructor(world: THREE.Object3D) {
        super(world);

        this.lineGizmo = new LineGizmo();
    }

    initWithWaypoints(color: THREE.Color, startPointIndex: number, waypoints: THREE.Vector2[], faceNum: number) {
        
        super.init(color, waypoints[startPointIndex], faceNum);
        this.waypoints = waypoints;
        this.curWaypointIndex = startPointIndex;

        this.state = EnemyState.Move;
        this.maxMoveTime = 0;
        this.curMoveTime = 0;

        this.lineGizmo?.init(color);
        this.lineGizmo?.setVisible(true);
    }
    die(showEffect: boolean = false) {
        super.die(showEffect);
        this.lineGizmo?.setVisible(false);
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
        const curPosInXZ = new THREE.Vector2(this.position.x, this.position.z);
        if (this.curMoveTime >= this.maxMoveTime) {
            
            this.maxMoveTime = 10;
            this.curMoveTime = 0;

            const preIndex = this.curWaypointIndex;
            do {
                this.curWaypointIndex = THREE.MathUtils.randInt(0, this.waypoints.length - 1);
            } while (preIndex === this.curWaypointIndex)

            this.destination = this.waypoints[this.curWaypointIndex];
            this.inputDirection.copy(this.destination).sub(curPosInXZ).normalize();

            this.lineGizmo?.setEndPoint(new THREE.Vector3(this.destination.x, 0.2, this.destination.y));
        }
        this.moveDirection.lerp(this.inputDirection, deltaTime * 10).normalize();
        this.curMoveTime += deltaTime;

        const toDestVector = new THREE.Vector2().copy(this.destination).sub(curPosInXZ).normalize();
        if (toDestVector.dot(this.inputDirection) < 0) {
            this.maxMoveTime = 0;
        }

        if (this.lineGizmo !== undefined) {
            const curWorldPos = this.getWorldPosition(new THREE.Vector3());
            curWorldPos.y = 0.2;
            this.lineGizmo?.setStartPoint(curWorldPos);
        }
    }
}