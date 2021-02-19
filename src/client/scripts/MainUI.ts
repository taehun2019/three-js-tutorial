import * as THREE from 'three';
import UIManager from 'common/scripts/Managers/UIManager';
import title from './../assets/images/Title.png';
import SwipeTutorial from '../common/scripts/UI/SwipeTutorial';
// import titleFont from './assets/fonts/FredokaOne-Regular.ttf'

import circleBar from 'common/images/circle_bar.png';
import awesome from 'common/images/awesome.png';

export default class MainUI {
    titleImage: HTMLImageElement;
    killCount: HTMLDivElement;
    killCountText: HTMLTextAreaElement;
    swipeTuto: SwipeTutorial;
    winScreen: HTMLDivElement;
    
    constructor() {
        // const image = UIManager.getInstance().createImg(title);
        // this.titleImage = document.getElementById("title") as HTMLImageElement;
        // this.titleImage.src = title;
        // image.style.visibility = 'hidden';
        this.swipeTuto = new SwipeTutorial();

        this.killCount = UIManager.getInstance().createDiv('180px', '180px');
        this.killCount.style.left = '-80px';
        // div.style.left = '50%';
        this.killCount.style.top = '0%';

        this.titleImage = UIManager.getInstance().createImg(title, '80%', '20%');
        this.titleImage.style.left = '10%';
        this.titleImage.style.top = '10%';


        const circleBarImage = UIManager.getInstance().createImg(circleBar, '100%','100%', this.killCount);
        // circleBarImage.style.opacity = `${76/255}`;
        // circleBarImage.style.color = 'black';
        //https://stackoverflow.com/questions/7415872/change-color-of-png-image-via-css
        circleBarImage.style.filter = 'opacity(0.3) drop-shadow(0 0 0 black)';

        this.killCountText = UIManager.getInstance().createText('Kill : 10', '90px', '20px', this.killCount);
        this.killCountText.style.top = `${90 - 10- 5}px`;
        this.killCountText.style.color = 'white';
        this.killCountText.style.fontSize = '25px';
        this.killCountText.style.left = '90px';




        this.winScreen = UIManager.getInstance().createDiv('100%', '100%');
        const blind = UIManager.getInstance().createDiv('100%', '100%', this.winScreen);
        blind.style.backgroundColor = 'black';
        blind.style.opacity = '20%';

        const awesomeImage = UIManager.getInstance().createImg(awesome, '80%', '20%', this.winScreen);
        awesomeImage.style.top = '10%';
        awesomeImage.style.left = '10%';
        


        window.addEventListener('resize', () => this.onWindowResize(), false);
        this.onWindowResize();
    }
    onWindowResize() {
        this.swipeTuto.updateAspect();
        this.winScreen.style.top = '0%';
    }
    init() {
        this.titleImage.style.visibility = 'visible';
        this.killCount.style.visibility = 'hidden';
        this.killCountText.textContent = 'Kill : 0';

        this.swipeTuto.init();

        this.finishElapsedTime = 0;
        this.winScreen.style.visibility = 'hidden';
    }
    start() {
        this.titleImage.style.visibility = 'hidden';
        this.killCount.style.visibility = 'visible';
        // setTimeout(() => {
        //     this.swipeTuto.hide();
        // }, 1000);
    }

    setKillCount(value: number) {
        this.killCountText.textContent = 'Kill : ' + value;
    }

    finishElapsedTime = 0;
    updateInFinish(deltaTime: number) {
        if (this.finishElapsedTime === 0) {
            this.winScreen.style.visibility = 'visible';
        }
        this.finishElapsedTime += deltaTime;
    }
}