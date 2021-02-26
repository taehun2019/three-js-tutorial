import * as THREE from "three";

interface ScaleAnimationInfo {
    element?: HTMLElement;
    maxTime?: number;
    startDelay?: number;

    baseWidthPercent?: number;
    baseHeightPercent?: number;
    fromScale?: number;
    toScale?: number;

    topPercent?: number;
    leftPercent?: number;
}
export enum ScaleAnimLoopMode {
    None,
    Plain,
    PingPong,
}
export class ScaleAnimation {

    element: HTMLElement;
    maxTime: number;
    startDelay: number;

    baseWidthPercent: number;
    baseHeightPercent: number;
    initScale: number;
    destScale: number;

    topPercent: number;
    leftPercent: number;

    loopMode = ScaleAnimLoopMode.None;
    toInit = false;

    endAction = () => { };

    curTime = 0;
    startDelayEnd = false;

    playing = false;

    fromScale = 0;
    toScale = 0;

    constructor(info: ScaleAnimationInfo) {
        this.element     = (info.element !== undefined) ? info.element : new HTMLElement();
        this.maxTime     = (info.maxTime !== undefined) ? info.maxTime : 0;
        this.startDelay  = (info.startDelay !== undefined) ? info.startDelay : 0;

        this.baseWidthPercent  = (info.baseWidthPercent !== undefined) ? info.baseWidthPercent : 0;
        this.baseHeightPercent = (info.baseHeightPercent !== undefined) ? info.baseHeightPercent : 0;
        this.initScale   = (info.fromScale !== undefined) ? info.fromScale : 0;
        this.destScale     = (info.toScale !== undefined) ? info.toScale : 0;

        this.topPercent  = (info.topPercent !== undefined) ? info.topPercent : 0;
        this.leftPercent = (info.leftPercent !== undefined) ? info.leftPercent : 0;
    }
    init() {
        this.playing = false;
        this.curTime = 0;
        this.startDelayEnd = false;
        this.element.style.visibility = 'hidden';
    }
    play() {
        this.playing = true;
        this.toInit = false;
        if (this.startDelay !== 0)
            this.element.style.visibility = 'hidden';
        else
            this.element.style.visibility = 'visible';

        this.fromScale = this.initScale;
        this.toScale = this.destScale;
    }

    animate(deltaTime: number) {
        if (this.playing === false)
            return;

        if (this.startDelay !== 0 && this.startDelayEnd === false) {
            this.curTime += deltaTime;
            if (this.curTime > this.startDelay) {
                this.curTime = 0;
                this.startDelayEnd = true;
                this.element.style.visibility = 'visible';
            }
            return;
        }

        if (this.loopMode === ScaleAnimLoopMode.None) {
            this.curTime += deltaTime;
            if (this.curTime > this.maxTime) {
                this.setSize(this.baseWidthPercent * this.destScale, this.baseHeightPercent * this.destScale);
                this.playing = false;
                this.endAction();
                return;
            }
        }
        else if (this.loopMode === ScaleAnimLoopMode.PingPong) {
            this.curTime += deltaTime;
            if (this.curTime > this.maxTime) {
                this.curTime -= this.maxTime;
                this.toInit = !this.toInit;
                this.fromScale = (this.toInit === true) ? this.destScale : this.initScale;
                this.toScale = (this.toInit === true) ? this.initScale : this.destScale;
            }
        }

        const interpolation = this.curTime / this.maxTime;
        const scale = THREE.MathUtils.lerp(this.fromScale, this.toScale, interpolation);
        this.setSize(this.baseWidthPercent * scale, this.baseHeightPercent * scale);
    }
    setSize(widthPercent: number, heightPercent: number) {
        // console.log(`ScaleAnimation.setSize. width:${width}/height:${height}`);
        // const width = window.innerWidth * widthPercent * 0.01;
        // const height = window.innerHeight * heightPercent * 0.01;
        this.element.style.width = `${widthPercent}%`;
        this.element.style.height = `${heightPercent}%`;
        this.element.style.top = `${this.topPercent - (heightPercent * 0.5)}%`;
        this.element.style.left = `${this.leftPercent - (widthPercent * 0.5)}%`;
        // animInfo.element.style.width = `${width}px`;
        // animInfo.element.style.height = `${height}px`;
        // const top = window.innerHeight * (animInfo.topPercent - heightPercent * 0.5) * 0.01;
        // const left = window.innerWidth * (animInfo.leftPercent - widthPercent * 0.5) * 0.01;
        // animInfo.element.style.top = `${animInfo.topPercent - (heightPercent * 0.5)}%`;//`${100 - (height + 10)}%`; //'80%';
        // animInfo.element.style.left = `${animInfo.leftPercent - (widthPercent * 0.5)}%`;//`${(100 - width) * 0.5}%`;//'10%';
        // animInfo.element.style.top = `${top}px`;
        // animInfo.element.style.left = `${left}px`;
        
        if (this.element.tagName.toLowerCase() === 'text') {
            this.element.style.fontSize = (window.innerWidth < window.innerHeight) ? `${widthPercent}vw` : `${heightPercent}vh`;
        }
    }
}