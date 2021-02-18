import * as THREE from 'three'
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

    init(color: THREE.Color, posX: number, posZ: number) {
        super.init(color, posX, posZ);

        this.state = EnemyState.Move;
        this.maxMoveTime = 0;
        this.curMoveTime = 0;
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
        if (this.curMoveTime >= this.maxMoveTime) {
            this.maxMoveTime = Math.random() * 2 + 1;
            this.curMoveTime = 0;
            this.inputDirection.x = Math.random() * 2 - 1;
            this.inputDirection.y = Math.random() * 2 - 1;
            this.inputDirection.normalize();
        }
        this.moveDirection.lerp(this.inputDirection, deltaTime * 10).normalize();
        this.curMoveTime += deltaTime;
    }
}