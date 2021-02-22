import * as THREE from 'three';
import fitty from 'fitty'
import UIManager from 'common/scripts/Managers/UIManager';
import title from './../assets/images/Title.png';
import SwipeTutorial from '../common/scripts/UI/SwipeTutorial';
// import titleFont from './assets/fonts/FredokaOne-Regular.ttf'

import circleBar from 'common/images/circle_bar.png';
import awesome from 'common/images/awesome.png';
import playnow from 'common/images/play_now.png';

export default class MainUI {
    onClickPlayNowAction: Function = () => { };

    titleImage: HTMLImageElement;
    killCount: HTMLDivElement;
    killCountText: HTMLTextAreaElement;
    swipeTuto: SwipeTutorial;

    finishScreen: HTMLDivElement;
    awesomeImage: HTMLImageElement;
    playnowImage: HTMLImageElement;

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
        fitty(this.topText);
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


        



        this.finishScreen = UIManager.getInstance().createDiv('100%', '100%');
        const blind = UIManager.getInstance().createDiv('100%', '100%', this.finishScreen);
        blind.style.backgroundColor = 'black';
        blind.style.opacity = '20%';

        this.awesomeImage = UIManager.getInstance().createImg(awesome, '80%', '20%', this.finishScreen);
        this.awesomeImage.style.top = '10%';
        this.awesomeImage.style.left = '10%';
        
        this.playnowImage = UIManager.getInstance().createImg(playnow, '80%', '20%');
        this.updatePlaynowImage(80, 20);
        this.playnowImage.addEventListener('click', ()=>{
            // console.log('click');
            this.onClickPlayNowAction();
        })


        window.addEventListener('resize', () => this.onWindowResize(), false);
        this.onWindowResize();
    }
    onWindowResize() {
        this.swipeTuto.updateAspect();
        this.finishScreen.style.top = '0%';
        fitty(this.topText);
    }
    init() {
        this.titleImage.style.visibility = 'visible';
        this.killCount.style.visibility = 'hidden';
        this.killCountText.textContent = 'Kill : 0';

        this.startCountdownText.style.visibility = 'hidden';
        this.swipeTuto.init();

        this.readyElapsedTime = 0;
        this.finishElapsedTime = 0;
        this.finishScreen.style.visibility = 'hidden';
        this.awesomeImage.style.visibility = 'hidden';

        this.playnowImage.style.visibility = 'hidden';
    }
    readyToStart() {
        this.titleImage.style.visibility = 'hidden';
        this.swipeTuto.hide();

        this.startCountdownText.style.visibility = 'visible';
        this.playnowImage.style.visibility = 'visible';

        this.updateAction = this.updateInReady;
    }
    start() {
        this.killCount.style.visibility = 'visible';
        // setTimeout(() => {
        //     this.swipeTuto.hide();
        // }, 1000);
        this.startCountdownText.style.visibility = 'hidden';

        this.updateAction = () => { };
    }
    // hideTuto() {
    //     this.swipeTuto.hide();
    //     this.playnowImage.style.visibility = 'visible';
    // }
    showWinScreen() {
        this.finishScreen.style.visibility = 'visible';
        this.awesomeImage.style.visibility = 'visible';
        
        this.updateAction = this.updateInFinish;
    }
    showLoseScreen() {
        this.finishScreen.style.visibility = 'visible';
        this.awesomeImage.style.visibility = 'hidden';

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
    finishElapsedTime = 0;
    // playnowAnimScaleTime = 1;
    updateInFinish(deltaTime: number) {
        this.finishElapsedTime += deltaTime;

        const time = 0.5;
        const interpolation = Math.abs(Math.abs((this.finishElapsedTime % (time * 2)) - time) - time);
        const scale = THREE.MathUtils.lerp(1, 1.05, interpolation);
        this.updatePlaynowImage(scale * 80, scale * 20);
    }
    updatePlaynowImage(width: number, height: number) {
        this.playnowImage.style.width = `${width}%`;
        this.playnowImage.style.height = `${height}%`;
        this.playnowImage.style.top = `${100 - (height + 10)}%`; //'80%';
        this.playnowImage.style.left = `${(100 - width) * 0.5}%`;//'10%';
    }
}