import UIManager from "../Managers/UIManager";
import awesome from '../../images/awesome.png';
import failed from '../../images/FAILED.png';
import tryAgain from '../../images/TryAgain.png';

export default class FinishScreen {
    onClickTryAgainAction: Function = () => { };

    rootDiv: HTMLDivElement;
    awesomeImage: HTMLImageElement;
    failedImage: HTMLImageElement;
    tryAgainImage: HTMLImageElement;

    tryCount = 0;
    
    constructor(parent?: HTMLElement) {
        this.rootDiv = UIManager.getInstance().createDiv('100%', '100%', parent);
        this.rootDiv.style.top = '0%';

        const blind = UIManager.getInstance().createDiv('100%', '100%', this.rootDiv);
        blind.style.backgroundColor = 'black';
        blind.style.opacity = '20%';

        this.awesomeImage = UIManager.getInstance().createImg(awesome, '80%', '20%', this.rootDiv);
        this.awesomeImage.style.top = '10%';
        this.awesomeImage.style.left = '10%';

        this.failedImage = UIManager.getInstance().createImg(failed, '80%', '20%', this.rootDiv);
        this.failedImage.style.top = '10%';
        this.failedImage.style.left = '10%';
        
        this.tryAgainImage = UIManager.getInstance().createImg(tryAgain, '60%', '10%', this.rootDiv);
        this.tryAgainImage.style.left = '20%';
        this.tryAgainImage.style.top = '70%';
        this.tryAgainImage.addEventListener('click', () => this.onClickTryAgain());

        // window.addEventListener('resize', () => this.onWindowResize(), false);
        // this.onWindowResize();
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

        this.awesomeImage.style.visibility = (win === true) ? 'visible' : 'hidden';
        this.failedImage.style.visibility = (win === false) ? 'visible' : 'hidden';
        this.tryAgainImage.style.visibility = (win === false) ? 'visible' : 'hidden';
    }
    onClickTryAgain() {
        this.onClickTryAgainAction(this.tryCount);
        if (this.tryCount === 0) {
            this.tryCount++;
        }
    }
}