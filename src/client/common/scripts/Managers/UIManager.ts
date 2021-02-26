import * as THREE from 'three';

export default class UIManager {
    private static instance: UIManager;
    static getInstance() { 
        if (!UIManager.instance) { 
            UIManager.instance = new UIManager(); 
        } 
        return UIManager.instance; 
    }

    constructor() {

    }

    static createDiv(width: string, height: string, parent?: HTMLElement) {
        const result = document.createElement('div') as HTMLDivElement;
        // result.style.position = 'fixed';
        // result.style.zIndex = '100000';
        result.style.width = width;
        result.style.height = height;
        //텍스트 가운데 정렬.
        //https://stackoverflow.com/questions/8865458/how-do-i-vertically-center-text-with-css
        //http://jsfiddle.net/danield770/4rrL4/594/
        result.style.display = 'flex';
        result.style.justifyContent = 'center';
        result.style.alignItems = 'center';
        if (parent === undefined) {
            result.style.position = 'fixed';
            result.style.zIndex = '100000';
        }
        
        // document.body.append(result);
        (parent === undefined) ? document.body.append(result) : parent?.append(result);

        return result;
    }

    static createImg(srcUrl: string, width: string, height: string, parent?: HTMLElement) {
        const result = document.createElement('img') as HTMLImageElement;
        result.src = srcUrl;

        result.style.top = '0%';
        result.style.width = width;
        result.style.height = height;
        result.style.objectFit = 'contain';
        result.style.position = 'absolute';
        // result.style.cursor = 'pointer';
        if (parent === undefined) {
            result.style.position = 'fixed';
            result.style.zIndex = '100000';
        }
        
        (parent === undefined) ? document.body.append(result) : parent?.append(result);

        return result;
    }

    static createText(content: string, width: string, height: string, parent?: HTMLElement) {
        const result = document.createElement('text') as HTMLTextAreaElement;
        result.textContent = content;
        result.style.top = '0%';
        result.style.width = width;
        result.style.height = height;
        result.style.position = 'absolute';
        result.style.zIndex = '100000';

        result.style.display = 'flex';
        result.style.justifyContent = 'center'; //horizontal
        result.style.alignItems = 'center'; //vertical
        // result.style.textAlign = 'center';

        if (parent === undefined) {
        }
        (parent === undefined) ? document.body.append(result) : parent?.append(result);
        
        return result;
    }

    static convertScreenToCanvas(screenPos: THREE.Vector3) {
        // screenPos.y *= -1;
        // const canvasPos = screenPos.clone().multiplyScalar(0.5).addScalar(0.5); //-1~1 => 0~1
        const result = screenPos.clone();
        result.y *= -1;
        return result.multiplyScalar(0.5).addScalar(0.5); //-1~1 => 0~1
    }

    // static getCenterPercent(lengthPercent: number, startPercentnumber: number) {
    //     return startPercentnumber + (lengthPercent * 0.5);
    // }
}