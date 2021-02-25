import * as THREE from "three";

export interface ScaleAnimationInfo {
    element: HTMLElement;
    curTime: number;
    maxTime: number;

    baseWidth: number;
    baseHeight: number;
    fromScale: number;
    toScale: number;

    top: number;
    left: number;
}
export class ScaleAnimation {
    static animate(animInfo: ScaleAnimationInfo, deltaTime: number) {
        animInfo.curTime += deltaTime;
        if (animInfo.curTime > animInfo.maxTime) {
            // console.log(`animInfo.curTime:${animInfo.curTime}/animInfo.maxTime:${animInfo.maxTime}`);
            ScaleAnimation.setSize(animInfo, animInfo.baseWidth * animInfo.toScale, animInfo.baseHeight * animInfo.toScale);
            return;
        }

        // const interpolation = Math.abs(Math.abs((curTime % (time * 2)) - time) - time);
        const interpolation = animInfo.curTime / animInfo.maxTime;
        const scale = THREE.MathUtils.lerp(animInfo.fromScale, animInfo.toScale, interpolation);
        ScaleAnimation.setSize(animInfo, animInfo.baseWidth * scale, animInfo.baseHeight * scale);
    }
    static setSize(animInfo: ScaleAnimationInfo, width: number, height: number) {
        // console.log(`ScaleAnimation.setSize. width:${width}/height:${height}`);
        animInfo.element.style.width = `${width}%`;
        animInfo.element.style.height = `${height}%`;
        animInfo.element.style.top = `${animInfo.top}%`;//`${100 - (height + 10)}%`; //'80%';
        animInfo.element.style.left = `${animInfo.left}%`;//`${(100 - width) * 0.5}%`;//'10%';
        
        // if (animInfo.element instanceof HTMLTextAreaElement) {
        if (animInfo.element.tagName.toLowerCase() === 'text') {
            animInfo.element.style.fontSize = (window.innerWidth < window.innerHeight) ? `${width}vw` : `${height}vh`;
            // animInfo.element.style.fontSize = (window.innerWidth < window.innerHeight) ? `${width}px` : `${height}px`;
        }
    }
}