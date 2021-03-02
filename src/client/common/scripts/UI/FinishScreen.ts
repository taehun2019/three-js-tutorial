import UIManager from "../Managers/UIManager";
import awesome from '../../images/awesome.png';
import failed from '../../images/FAILED.png';
import tryAgain from '../../images/TryAgain.png';
import { ScaleAnimation } from "./ScaleAnimation";
import DeviceManager from "../Managers/DeviceManager";

export default class FinishScreen {
    onClickTryAgainAction: Function = () => { };

    rootDiv: HTMLDivElement;
    awesomeImage: HTMLImageElement;
    failedImage: HTMLImageElement;
    tryAgainImage: HTMLImageElement;

    tryCount = 0;
    
    awesomeAnim: ScaleAnimation;
    failedAnim: ScaleAnimation;

    tryAgainAnim: ScaleAnimation;
    
    constructor(parent?: HTMLElement) {
        this.rootDiv = UIManager.createDiv('100%', '100%', parent);
        this.rootDiv.style.top = '0%';

        const blind = UIManager.createDiv('100%', '100%', this.rootDiv);
        blind.style.backgroundColor = 'black';
        blind.style.opacity = '20%';

        this.awesomeImage = UIManager.createImg(awesome, '80%', '20%', this.rootDiv);
        this.failedImage = UIManager.createImg(failed, '80%', '20%', this.rootDiv);
        this.tryAgainImage = UIManager.createImg(tryAgain, '60%', '15%', this.rootDiv);

        this.tryAgainImage.addEventListener(
            DeviceManager.getInstance().clickEventName, 
            () => this.onClickTryAgain()
        );

        this.awesomeAnim = new ScaleAnimation({
            element: this.awesomeImage,
            maxTime: 0.5,
            baseWidthPercent: 80, baseHeightPercent: 20,
            fromScale: 3, toScale: 1,
            topPercent: 20, leftPercent: 50,
        });

        this.failedAnim = new ScaleAnimation({
            element: this.failedImage,
            maxTime: 0.2,
            baseWidthPercent: 80, baseHeightPercent: 20,
            fromScale: 3, toScale: 1,
            leftPercent: 50, topPercent: 20,
        });

        this.tryAgainAnim = new ScaleAnimation({
            element: this.tryAgainImage,
            maxTime: 0.2,
            baseWidthPercent: 60, baseHeightPercent: 15,
            fromScale: 3, toScale: 1,
            leftPercent: 50, topPercent: 65,
            startDelay: 0.5,
        });
    }
    // onWindowResize() {
    //     // this.finishScreen.style.top = '0%';
    // }
    init() {
        this.rootDiv.style.visibility = 'hidden';
        // this.awesomeImage.style.visibility = 'hidden';
        // this.failedImage.style.visibility = 'hidden';
        // this.tryAgainImage.style.visibility = 'hidden';
    
        this.awesomeAnim.init();
        this.failedAnim.init();
        this.tryAgainAnim.init();
    }
    show(win: boolean) {
        this.rootDiv.style.visibility = 'visible';

        // this.awesomeAnimInfo.curTime = 0;
        // this.awesomeImage.style.visibility = (win === true) ? 'visible' : 'hidden';
        // this.failedImage.style.visibility = (win === false) ? 'visible' : 'hidden';
        // this.tryAgainImage.style.visibility = (win === false) ? 'visible' : 'hidden';

        if (win === true) {
            this.awesomeAnim.play();
        }
        else {
            this.failedAnim.play();
            this.tryAgainAnim.play();
        }
    }
    update(deltaTime: number) {
        if (this.awesomeAnim.playing === true)
            this.awesomeAnim.animate(deltaTime);
        if (this.failedAnim.playing === true)
            this.failedAnim.animate(deltaTime);
        if (this.tryAgainAnim.playing === true)
            this.tryAgainAnim.animate(deltaTime);
    }
    onClickTryAgain() {
        // console.log('onClickTryAgain. tryCount:' + this.tryCount);
        this.onClickTryAgainAction(this.tryCount);
        if (this.tryCount === 0) {
            this.tryCount++;
        }
    }
}