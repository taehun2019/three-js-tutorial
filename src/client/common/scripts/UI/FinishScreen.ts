import UIManager from "../Managers/UIManager";
import awesome from '../../images/awesome.png';
import failed from '../../images/FAILED.png';
import tryAgain from '../../images/TryAgain.png';
import { ScaleAnimation, ScaleAnimationInfo } from "./ScaleAnimation";

export default class FinishScreen {
    onClickTryAgainAction: Function = () => { };

    rootDiv: HTMLDivElement;
    awesomeImage: HTMLImageElement;
    failedImage: HTMLImageElement;
    tryAgainImage: HTMLImageElement;

    tryCount = 0;
    
    awesomeAnimInfo: ScaleAnimationInfo;
    
    constructor(parent?: HTMLElement) {
        this.rootDiv = UIManager.createDiv('100%', '100%', parent);
        this.rootDiv.style.top = '0%';

        const blind = UIManager.createDiv('100%', '100%', this.rootDiv);
        blind.style.backgroundColor = 'black';
        blind.style.opacity = '20%';

        this.awesomeImage = UIManager.createImg(awesome, '80%', '20%', this.rootDiv);
        this.awesomeImage.style.top = '10%';
        this.awesomeImage.style.left = '10%';

        this.failedImage = UIManager.createImg(failed, '80%', '20%', this.rootDiv);
        this.failedImage.style.top = '10%';
        this.failedImage.style.left = '10%';
        
        this.tryAgainImage = UIManager.createImg(tryAgain, '60%', '10%', this.rootDiv);
        this.tryAgainImage.style.left = '20%';
        this.tryAgainImage.style.top = '70%';
        this.tryAgainImage.addEventListener('click', () => this.onClickTryAgain());

        // window.addEventListener('resize', () => this.onWindowResize(), false);
        // this.onWindowResize();

        this.awesomeAnimInfo = {
            element: this.awesomeImage,
            curTime: 0, maxTime: 0.5,
            baseWidthPercent: 80, baseHeightPercent: 20,
            fromScale: 3, toScale: 1,
            topPercent: 20, leftPercent: 50,
        }
    }
    // onWindowResize() {
    //     // this.finishScreen.style.top = '0%';
    // }
    init() {
        this.rootDiv.style.visibility = 'hidden';
        this.awesomeImage.style.visibility = 'hidden';
        this.failedImage.style.visibility = 'hidden';
        this.tryAgainImage.style.visibility = 'hidden';
    }
    show(win: boolean) {
        this.rootDiv.style.visibility = 'visible';

        this.awesomeAnimInfo.curTime = 0;
        this.awesomeImage.style.visibility = (win === true) ? 'visible' : 'hidden';
        this.failedImage.style.visibility = (win === false) ? 'visible' : 'hidden';
        this.tryAgainImage.style.visibility = (win === false) ? 'visible' : 'hidden';
    }
    update(deltaTime: number) {
        if (this.awesomeImage.style.visibility === 'visible')
            ScaleAnimation.animate(this.awesomeAnimInfo, deltaTime);
    }
    onClickTryAgain() {
        this.onClickTryAgainAction(this.tryCount);
        if (this.tryCount === 0) {
            this.tryCount++;
        }
    }
}