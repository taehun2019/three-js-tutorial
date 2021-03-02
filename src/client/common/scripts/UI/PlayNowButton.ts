import * as THREE from "three";
import UIManager from "../Managers/UIManager";
import playNow from '../../images/play_now.png';
import DeviceManager from "../Managers/DeviceManager";
import { ScaleAnimation, ScaleAnimLoopMode } from "./ScaleAnimation";

// const baseWidth = 60;
// const baseHeght = 15;

export default class PlayNowButton {
    onClickAction: Function = () => { };
    image: HTMLImageElement;
    animElapsedTime = 0;
    
    scaleAnim: ScaleAnimation;

    constructor() {
        this.image = UIManager.createImg(playNow, '60%', '15%');
        UIManager.setElementProportion(this.image, 60, 15, 50, 80);
        // this.setSize(baseWidth, baseHeght);
        this.image.addEventListener(
            DeviceManager.getInstance().clickEventName, 
            ()=>this.onClickAction()
        );

        this.scaleAnim = new ScaleAnimation({
            element: this.image,
            maxTime: 0.2,
            baseWidthPercent: 60, baseHeightPercent: 15,
            fromScale: 3, toScale: 1,
            leftPercent: 50, topPercent: 80,
            startDelay: 0.3,
        });
    }
    init() {
        this.scaleAnim.init();

        this.animElapsedTime = 0;
        this.image.style.visibility = 'hidden';

        this.scaleAnim.init();
    }
    readyToStart() {
        this.image.style.visibility = 'visible';
    }
    // setSize(width: number, height: number) {
    //     this.image.style.width = `${width}%`;
    //     this.image.style.height = `${height}%`;
    //     this.image.style.top = `${100 - (height + 10)}%`; //'80%';
    //     this.image.style.left = `${(100 - width) * 0.5}%`;//'10%';
    // }
    // animateScale(deltaTime: number) {
    //     this.animElapsedTime += deltaTime;

    //     const time = 0.5;
    //     const interpolation = Math.abs(Math.abs((this.animElapsedTime % (time * 2)) - time) - time);
    //     const scale = THREE.MathUtils.lerp(1, 1.05, interpolation);
    //     // this.setSize(scale * baseWidth, scale * baseHeght);
    // }
    show(win: boolean) {
        this.scaleAnim.loopMode = ScaleAnimLoopMode.None;
        this.scaleAnim.initScale = 3;
        this.scaleAnim.destScale = 1;
        this.scaleAnim.maxTime = 0.2;
        if (win === true) {
            this.scaleAnim.startDelay = 0.6;
            this.scaleAnim.endAction = () => {
                this.scaleAnim.loopMode = ScaleAnimLoopMode.PingPong;
                this.scaleAnim.initScale = 1;
                this.scaleAnim.destScale = 1.2;
                this.scaleAnim.maxTime = 0.7;
                this.scaleAnim.startDelay = 0;
                this.scaleAnim.play();
            }
        }
        else {
            this.scaleAnim.startDelay = 1;
            this.scaleAnim.endAction = () => {}
        }
        this.scaleAnim.play();
    }
    update(deltaTime: number) {
        this.scaleAnim.animate(deltaTime);
    }
}