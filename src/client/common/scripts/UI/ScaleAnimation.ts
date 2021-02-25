import * as THREE from "three";

export interface ScaleAnimationInfo {
    element: HTMLElement;
    curTime: number;
    maxTime: number;

    baseWidthPercent: number;
    baseHeightPercent: number;
    fromScale: number;
    toScale: number;

    topPercent: number;
    leftPercent: number;
}
export class ScaleAnimation {
    static animate(animInfo: ScaleAnimationInfo, deltaTime: number) {
        animInfo.curTime += deltaTime;
        if (animInfo.curTime > animInfo.maxTime) {
            ScaleAnimation.setSize(animInfo, animInfo.baseWidthPercent * animInfo.toScale, animInfo.baseHeightPercent * animInfo.toScale);
            return;
        }

        const interpolation = animInfo.curTime / animInfo.maxTime;
        const scale = THREE.MathUtils.lerp(animInfo.fromScale, animInfo.toScale, interpolation);
        ScaleAnimation.setSize(animInfo, animInfo.baseWidthPercent * scale, animInfo.baseHeightPercent * scale);
    }
    static setSize(animInfo: ScaleAnimationInfo, widthPercent: number, heightPercent: number) {
        // console.log(`ScaleAnimation.setSize. width:${width}/height:${height}`);
        // const width = window.innerWidth * widthPercent * 0.01;
        // const height = window.innerHeight * heightPercent * 0.01;
        animInfo.element.style.width = `${widthPercent}%`;
        animInfo.element.style.height = `${heightPercent}%`;
        animInfo.element.style.top = `${animInfo.topPercent - (heightPercent * 0.5)}%`;
        animInfo.element.style.left = `${animInfo.leftPercent - (widthPercent * 0.5)}%`;
        // animInfo.element.style.width = `${width}px`;
        // animInfo.element.style.height = `${height}px`;
        // const top = window.innerHeight * (animInfo.topPercent - heightPercent * 0.5) * 0.01;
        // const left = window.innerWidth * (animInfo.leftPercent - widthPercent * 0.5) * 0.01;
        // animInfo.element.style.top = `${animInfo.topPercent - (heightPercent * 0.5)}%`;//`${100 - (height + 10)}%`; //'80%';
        // animInfo.element.style.left = `${animInfo.leftPercent - (widthPercent * 0.5)}%`;//`${(100 - width) * 0.5}%`;//'10%';
        // animInfo.element.style.top = `${top}px`;
        // animInfo.element.style.left = `${left}px`;
        
        if (animInfo.element.tagName.toLowerCase() === 'text') {
            animInfo.element.style.fontSize = (window.innerWidth < window.innerHeight) ? `${widthPercent}vw` : `${heightPercent}vh`;
        }
    }
}