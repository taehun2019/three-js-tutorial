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
        animInfo.element.style.width = `${widthPercent}%`;
        animInfo.element.style.height = `${heightPercent}%`;
        animInfo.element.style.top = `${animInfo.topPercent - (heightPercent * 0.5)}%`;
        animInfo.element.style.left = `${animInfo.leftPercent - (widthPercent * 0.5)}%`;
        
        if (animInfo.element.tagName.toLowerCase() === 'text') {
            animInfo.element.style.fontSize = (window.innerWidth < window.innerHeight) ? `${widthPercent}vw` : `${heightPercent}vh`;
        }
    }
}