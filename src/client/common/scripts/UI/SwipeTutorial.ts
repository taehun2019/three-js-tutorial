import * as THREE from 'three';
import UIManager from './../Managers/UIManager';
import swipe from './../../images/Swipe_Back.png';
import finger from './../../images/finger.png';
// import finger from 'assets/images/finger.png'

export default class SwipeTutorial {
    swipeDiv: HTMLDivElement;
    swipeFinger: HTMLImageElement;
    fingerPoints: THREE.Vector2[] = [
        new THREE.Vector2(30, 60), //center
        new THREE.Vector2(15, 45),
        new THREE.Vector2(10, 43),
        new THREE.Vector2( 5, 45),
        new THREE.Vector2( 2, 50),
        new THREE.Vector2(-2, 60), //left
        new THREE.Vector2( 2, 70),
        new THREE.Vector2( 5, 72),
        new THREE.Vector2(10, 75),
        new THREE.Vector2(15, 72),
        new THREE.Vector2(30, 60), //center
        new THREE.Vector2(55, 45),
        new THREE.Vector2(60, 45),
        new THREE.Vector2(65, 50),
        new THREE.Vector2(70, 60), //right
        new THREE.Vector2(65, 70),
        new THREE.Vector2(60, 75),
        new THREE.Vector2(50, 75),
    ]
    fingerSpeed = 150;
    fingerVelocity = new THREE.Vector2(0, 0);

    nextFingerPoint = new THREE.Vector2(0, 0);
    curFingerPoint = new THREE.Vector2(0, 0);

    initToDestVector = new THREE.Vector2(0, 0);
    
    curPointIndex = 0;

    constructor() {
        // this.swipeDiv = UIManager.getInstance().createDiv('200px', '200px');
        this.swipeDiv = UIManager.getInstance().createDiv('40%', '40%');
        const swipeImage = UIManager.getInstance().createImg(swipe, '100%', '100%', this.swipeDiv);
        this.swipeFinger = UIManager.getInstance().createImg(finger, '40%', '40%', this.swipeDiv);
        // console.log(this.fingerPoints[0]);
        this.swipeFinger.style.left = `${this.fingerPoints[0].x}%`;
        this.swipeFinger.style.top = `${this.fingerPoints[0].y}%`;
    }

    updateAspect() {
        // this.swipeDiv.style.bottom = '10%';
        // this.swipeDiv.style.left = `${window.innerWidth * 0.5 - 100}px`;
        // this.swipeDiv.style.bottom = '10%';
        // this.swipeDiv.style.left = '30%';
        const length = (window.innerWidth < window.innerHeight) ? window.innerWidth * 0.4 : window.innerHeight * 0.4;
        this.swipeDiv.style.width = `${length}px`;
        this.swipeDiv.style.height = `${length}px`;
        this.swipeDiv.style.bottom = '15%';
        this.swipeDiv.style.left = `${(window.innerWidth - length) * 0.5}px`;
    }
    init() {
        this.swipeDiv.style.visibility = 'visible';

        this.curPointIndex = 0;

        this.nextFingerPoint.copy(this.fingerPoints[1]);
        this.curFingerPoint.copy(this.fingerPoints[0]);
        this.initToDestVector.copy(this.nextFingerPoint).sub(this.curFingerPoint);

        this.fingerVelocity.copy(this.nextFingerPoint).sub(this.curFingerPoint).normalize().multiplyScalar(this.fingerSpeed);
        // console.log(this.nextFingerPoint);
        // console.log(this.curFingerPoint);
        // console.log(this.fingerSpeed);
        // console.log(this.fingerVelocity);
    }
    hide() {
        this.swipeDiv.style.visibility = 'hidden';
    }
    update(deltaTime: number) {
        this.curFingerPoint.x += this.fingerVelocity.x * deltaTime;
        this.curFingerPoint.y += this.fingerVelocity.y * deltaTime;
        this.swipeFinger.style.left = `${this.curFingerPoint.x}%`;
        this.swipeFinger.style.top = `${this.curFingerPoint.y}%`;

        const curToDestVector = new THREE.Vector2().copy(this.nextFingerPoint).sub(this.curFingerPoint);
        if (curToDestVector.dot(this.initToDestVector) < 0) {
            this.setFingerToNextPoint();
        }
    }
    setFingerToNextPoint() {
        this.curPointIndex = (this.curPointIndex + 1) % this.fingerPoints.length;
        const nextPointIndex = (this.curPointIndex + 1) % this.fingerPoints.length;

        this.curFingerPoint.copy(this.fingerPoints[this.curPointIndex]);
        this.nextFingerPoint.copy(this.fingerPoints[nextPointIndex]);
        this.initToDestVector.copy(this.nextFingerPoint).sub(this.curFingerPoint);

        this.fingerVelocity.copy(this.initToDestVector).normalize().multiplyScalar(this.fingerSpeed);
    }
    testNextFingerPoint() {
        this.setFingerToNextPoint();
        this.swipeFinger.style.left = `${this.curFingerPoint.x}%`;
        this.swipeFinger.style.top = `${this.curFingerPoint.y}%`;
    }
}