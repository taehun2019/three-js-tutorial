import * as THREE from "three";
import UIManager from "../Managers/UIManager";
import playNow from '../../images/play_now.png';

const baseWidth = 60;
const baseHeght = 10;

export default class PlayNowButton {
    onClickAction: Function = () => { };
    image: HTMLImageElement;
    animElapsedTime = 0;

    constructor() {
        this.image = UIManager.getInstance().createImg(playNow, '80%', '20%');
        this.setSize(baseWidth, baseHeght);
        this.image.addEventListener('click', ()=>{
            this.onClickAction();
        })
    }
    init() {
        this.animElapsedTime = 0;
        this.image.style.visibility = 'hidden';
    }
    readyToStart() {
        this.image.style.visibility = 'visible';
    }
    setSize(width: number, height: number) {
        this.image.style.width = `${width}%`;
        this.image.style.height = `${height}%`;
        this.image.style.top = `${100 - (height + 10)}%`; //'80%';
        this.image.style.left = `${(100 - width) * 0.5}%`;//'10%';
    }
    animateScale(deltaTime: number) {
        this.animElapsedTime += deltaTime;

        const time = 0.5;
        const interpolation = Math.abs(Math.abs((this.animElapsedTime % (time * 2)) - time) - time);
        const scale = THREE.MathUtils.lerp(1, 1.05, interpolation);
        this.setSize(scale * baseWidth, scale * baseHeght);
    }
}