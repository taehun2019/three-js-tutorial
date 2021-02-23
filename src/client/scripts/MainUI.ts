import * as THREE from 'three';
// import fitty from 'fitty';
import UIManager from 'common/scripts/Managers/UIManager';
import title from './../assets/images/Title.png';
import SwipeTutorial from '../common/scripts/UI/SwipeTutorial';
// import titleFont from './assets/fonts/FredokaOne-Regular.ttf'

import circleBar from 'common/images/circle_bar.png';
import FinishScreen from 'common/scripts/UI/FinishScreen';
import PlayNowButton from 'common/scripts/UI/PlayNowButton';

export default class MainUI {

    titleImage: HTMLImageElement;
    killCount: HTMLDivElement;
    killCountText: HTMLTextAreaElement;
    swipeTuto: SwipeTutorial;

    finishScreen: FinishScreen;
    // playnowImage: HTMLImageElement;
    playNowButton: PlayNowButton;

    topText: HTMLElement;
    topTextDiv: HTMLElement;

    startCountdownText: HTMLTextAreaElement;

    updateAction: Function = () => { };
    
    constructor() {
        // const image = UIManager.getInstance().createImg(title);
        // this.titleImage = document.getElementById("title") as HTMLImageElement;
        // this.titleImage.src = title;
        // image.style.visibility = 'hidden';
        this.swipeTuto = new SwipeTutorial();

        this.startCountdownText = UIManager.getInstance().createText("3", '20%', '20%');
        this.startCountdownText.style.top = '10%';
        this.startCountdownText.style.left = '40%';
        this.startCountdownText.style.textAlign = 'center';
        //https://stackoverflow.com/questions/16056591/font-scaling-based-on-width-of-container
        this.startCountdownText.style.fontSize = '20vw';

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


        this.topTextDiv = UIManager.getInstance().createDiv('100%', '10%');
        this.topTextDiv.style.top = '0%';
        this.topTextDiv.style.height = '10%';
        this.topTextDiv.style.background = 'black';
        // this.topTextDiv.textContent = "MAKE A BIG SNOWBALL!";
        this.topText = document.createElement('div') as HTMLDivElement;
        this.topText.textContent = "MAKE A BIG SNOWBALL!";
        this.topText.style.textAlign = 'center';
        this.topText.style.color = 'white';
        this.topTextDiv?.append(this.topText);
        // fitty(this.topText);


        // div.style.background = 'black';

        // div.style.verticalAlign = 'middle';

        // this.topText = UIManager.getInstance().createText("MAKE A BIG SNOWBALL!", '100%', '80%', div);
        // this.topText.style.color = 'white';

        // this.topText.style.fontSize = '7vw';
        // this.topText.style.textAlign = 'center';
        // this.topText.style.marginTop = 'auto';
        // this.topText.style.marginBottom = 'auto';
        // text.style.verticalAlign = 'middle';

        // const div2 = document.createElement('div') as HTMLDivElement;
        // this.topText = document.createElement('text') as HTMLTextAreaElement;
        // this.topText.textContent = "MAKE A BIG SNOWBALL!";
        // // this.topText.style.width = '100%';
        // // this.topText.style.height = '100%';
        // // this.topText.style.display = 'inline-block';
        // div2?.append(this.topText);
        // div?.append(div2);
        // // document.body.append(this.topText)
        // this.topText.style.color = 'white';
        // fitty(this.topText, {
        //     minSize: 12,
        //     maxSize: 300,
        // });

        // const div3 = document.createElement('div') as HTMLDivElement;
        // div3.style.position = 'absolute';
        // div3.style.zIndex = '-1';
        // div3.style.top = '0%';
        // div3.style.width = '100%';
        // div3.style.height = '100%';
        // div3.style.background = 'black';

        // this.topText.append(div3);

        this.finishScreen = new FinishScreen();
        this.playNowButton = new PlayNowButton();

        window.addEventListener('resize', () => this.onWindowResize(), false);
        this.onWindowResize();
    }
    onWindowResize() {
        this.swipeTuto.updateAspect();
        // fitty(this.topText);
    }
    init() {
        this.titleImage.style.visibility = 'visible';
        this.killCount.style.visibility = 'hidden';
        this.killCountText.textContent = 'Kill : 0';

        this.startCountdownText.style.visibility = 'hidden';
        this.swipeTuto.init();

        this.readyElapsedTime = 0;

        this.playNowButton.init();

        this.finishScreen.init();
    }
    readyToStart() {
        this.titleImage.style.visibility = 'hidden';
        this.swipeTuto.hide();

        this.startCountdownText.style.visibility = 'visible';
        this.playNowButton.readyToStart();

        this.updateAction = this.updateInReady;
    }
    start() {
        this.killCount.style.visibility = 'visible';
        this.startCountdownText.style.visibility = 'hidden';

        this.updateAction = () => { };
    }
    showWinScreen() {
        this.finishScreen.show(true);
        this.updateAction = this.updateInFinish;
    }
    showLoseScreen() {
        this.finishScreen.show(false);
        this.updateAction = this.updateInFinish;
    }

    setKillCount(value: number) {
        this.killCountText.textContent = 'Kill : ' + value;
    }
    update(deltaTime: number) {
        this.updateAction(deltaTime);
    }
    readyElapsedTime = 0;
    updateInReady(deltaTime: number) {
        this.readyElapsedTime += deltaTime;
        const remainTime = 4 - (this.readyElapsedTime * (3 / 1));
        this.startCountdownText.textContent = `${Math.floor(remainTime)}`;
    }
    updateInFinish(deltaTime: number) {
        this.playNowButton.animateScale(deltaTime);
    }
}