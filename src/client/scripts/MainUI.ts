import * as THREE from 'three';
// import fitty from 'fitty';
import UIManager from 'common/scripts/Managers/UIManager';
import title from './../assets/images/Title.png';
import SwipeTutorial from '../common/scripts/UI/SwipeTutorial';

import FinishScreen from 'common/scripts/UI/FinishScreen';
import PlayNowButton from 'common/scripts/UI/PlayNowButton';
import PlayScreen from './UI/PlayScreen';
import PublishManager, { AdNetwork } from 'common/scripts/Managers/PublishManager';
// import font from './../assets/fonts/FredokaOne-Regular.ttf'

// require('./../assets/fonts/fonts.css');

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
    win = true;
    
    constructor() {
        this.swipeTuto = new SwipeTutorial();

        this.startCountdownText = UIManager.createText("3", '20%', '20%');
        this.startCountdownText.style.top = '40%';
        this.startCountdownText.style.left = '40%';
        this.startCountdownText.style.textAlign = 'center';
        //https://stackoverflow.com/questions/16056591/font-scaling-based-on-width-of-container
        this.startCountdownText.style.fontSize = '20vw';
        this.startCountdownText.style.fontWeight = 'bold';
        this.startCountdownText.style.color = '#242246';
        this.startCountdownText.style.fontFamily = 'Fredoka';

        this.titleImage = UIManager.createImg(title, '80%', '20%');
        this.titleImage.style.left = '10%';
        this.titleImage.style.top = '10%';

        this.playScreen = new PlayScreen();
        this.finishScreen = new FinishScreen();
        this.playNowButton = new PlayNowButton();

        window.addEventListener('resize', () => this.onWindowResize(), false);
        this.onWindowResize();
    }
    onWindowResize() {
        this.swipeTuto.updateAspect();
        this.playScreen.updateAspect();

        this.startCountdownText.style.fontSize = (window.innerWidth < window.innerHeight) ? '20vw' : '20vh';
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

        // this.playScreen.show();
        this.playScreen.readyToStart();
    }
    start() {
        this.startCountdownText.style.visibility = 'hidden';
        this.playScreen.start();

        this.updateAction = this.updateInPlay;
    }
    showWinScreen() {
        this.win = true;
        this.finishScreen.show(true);
        this.playNowButton.show(true);
        this.updateAction = this.updateInFinish;
    }
    showLoseScreen() {
        this.win = false;
        this.finishScreen.show(false);
        this.playNowButton.show(false);
        this.updateAction = this.updateInFinish;
    }

    update(deltaTime: number) {
        this.updateAction(deltaTime);
    }
    readyElapsedTime = 0;
    updateInReady(deltaTime: number) {
        this.readyElapsedTime += deltaTime;
        let remainTime = 4 - (this.readyElapsedTime * (3 / this.readyTime));
        if (remainTime < 0)
            remainTime = 0;
        this.startCountdownText.textContent = `${Math.floor(remainTime)}`;
    }
    updateInPlay(deltaTime: number) {
        this.playScreen.update(deltaTime);
    }
    updateInFinish(deltaTime: number) {
        // if (this.win === true)
        //     this.playNowButton.animateScale(deltaTime);
        this.finishScreen.update(deltaTime);
        this.playNowButton.update(deltaTime);
    }
}
