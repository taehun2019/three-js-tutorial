import * as THREE from 'three';
// import fitty from 'fitty';
import UIManager from 'common/scripts/Managers/UIManager';
import title from './../assets/images/Title.png';
import SwipeTutorial from '../common/scripts/UI/SwipeTutorial';

import circleBar from 'common/images/circle_bar.png';
import FinishScreen from 'common/scripts/UI/FinishScreen';
import PlayNowButton from 'common/scripts/UI/PlayNowButton';
// import font from './../assets/fonts/FredokaOne-Regular.ttf'

const css = require("./../assets/fonts/fonts.css");

export default class MainUI {

    titleImage: HTMLImageElement;
    swipeTuto: SwipeTutorial;

    startCountdownText: HTMLTextAreaElement;

    playScreen: PlayScreen;
    finishScreen: FinishScreen;
    playNowButton: PlayNowButton;

    // topText: HTMLElement;
    // topTextDiv: HTMLElement;


    updateAction: Function = () => { };

    readyTime = 0;
    
    constructor() {
        this.swipeTuto = new SwipeTutorial();

        this.startCountdownText = UIManager.getInstance().createText("3", '20%', '20%');
        this.startCountdownText.style.top = '40%';
        this.startCountdownText.style.left = '40%';
        this.startCountdownText.style.textAlign = 'center';
        //https://stackoverflow.com/questions/16056591/font-scaling-based-on-width-of-container
        this.startCountdownText.style.fontSize = '20vw';
        this.startCountdownText.style.fontWeight = 'bold';

        this.titleImage = UIManager.getInstance().createImg(title, '80%', '20%');
        this.titleImage.style.left = '10%';
        this.titleImage.style.top = '10%';



        // this.topTextDiv = UIManager.getInstance().createDiv('100%', '10%');
        // this.topTextDiv.style.top = '0%';
        // this.topTextDiv.style.height = '10%';
        // this.topTextDiv.style.background = 'black';
        // // this.topTextDiv.textContent = "MAKE A BIG SNOWBALL!";

        // this.topText = document.createElement('div') as HTMLDivElement;
        // this.topText.textContent = "MAKE A BIG SNOWBALL!";
        // this.topText.style.textAlign = 'center';
        // this.topText.style.color = 'white';
        // this.topTextDiv?.append(this.topText);
        // // fitty(this.topText);



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

        this.playScreen = new PlayScreen();
        this.finishScreen = new FinishScreen();
        this.playNowButton = new PlayNowButton();

        window.addEventListener('resize', () => this.onWindowResize(), false);
        this.onWindowResize();
    }
    onWindowResize() {
        this.swipeTuto.updateAspect();
        this.playScreen.updateAspect();
        // fitty(this.topText);
    }
    init() {
        this.titleImage.style.visibility = 'visible';

        this.startCountdownText.style.visibility = 'hidden';
        this.swipeTuto.init();

        this.readyElapsedTime = 0;

        this.playNowButton.init();

        this.playScreen.init();
        this.finishScreen.init();
    }
    readyToStart(readyTime: number) {
        this.readyTime = readyTime;

        this.titleImage.style.visibility = 'hidden';
        this.swipeTuto.hide();

        this.startCountdownText.style.visibility = 'visible';
        this.playNowButton.readyToStart();

        this.updateAction = this.updateInReady;
    }
    start() {
        this.startCountdownText.style.visibility = 'hidden';
        this.playScreen.show();

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

    update(deltaTime: number) {
        this.updateAction(deltaTime);
    }
    readyElapsedTime = 0;
    updateInReady(deltaTime: number) {
        this.readyElapsedTime += deltaTime;
        const remainTime = 4 - (this.readyElapsedTime * (3 / this.readyTime));
        this.startCountdownText.textContent = `${Math.floor(remainTime)}`;
    }
    updateInFinish(deltaTime: number) {
        this.playNowButton.animateScale(deltaTime);
    }
}

class PlayScreen {
    rootDiv: HTMLDivElement;
    killCountText: HTMLTextAreaElement;
    constructor() {
        this.rootDiv = UIManager.getInstance().createDiv('180px', '180px');
        this.rootDiv.style.top = '0%';
        
        const circleBarImage = UIManager.getInstance().createImg(circleBar, '100%','100%', this.rootDiv);
        // circleBarImage.style.opacity = `${76/255}`;
        // circleBarImage.style.color = 'black';
        //https://stackoverflow.com/questions/7415872/change-color-of-png-image-via-css
        circleBarImage.style.filter = 'opacity(0.3) drop-shadow(0 0 0 black)';

        this.killCountText = UIManager.getInstance().createText('Kill : 10', '90px', '20px', this.rootDiv);
        this.killCountText.style.fontFamily = 'Fredoka';
    }
    updateAspect() {
        // let length = (window.innerWidth > window.innerHeight) ? window.innerWidth : window.innerHeight;
        let length = window.innerWidth;
        length *= 0.4;
        this.rootDiv.style.width = `${length}px`;
        this.rootDiv.style.height = `${length}px`;
        this.rootDiv.style.left = `-${length * 0.4}px`;

        this.killCountText.style.width = `${length * 0.5}px`;
        this.killCountText.style.top = `${length * 0.44}px`;
        this.killCountText.style.color = 'white';
        this.killCountText.style.fontSize = `${length * 0.12}px`;
        this.killCountText.style.left = `${length * 0.45}px`;
    }
    init() {
        this.rootDiv.style.visibility = 'hidden';
        this.killCountText.textContent = 'Kill : 0';
    }
    show() {
        this.rootDiv.style.visibility = 'visible';
    }
    setKillCount(value: number) {
        this.killCountText.textContent = 'Kill : ' + value;
    }
}