import * as THREE from 'three';
import UIManager from 'common/scripts/Managers/UIManager';
import { ScaleAnimation, ScaleAnimationInfo } from 'common/scripts/UI/ScaleAnimation';
import PlayerProfile from './PlayerProfile';

import circleBar from 'common/images/circle_bar.png';

export default class PlayScreen {
    killCountDiv: HTMLDivElement;
    killCountText: HTMLTextAreaElement;

    centerKillAnimInfo: ScaleAnimationInfo;
    centerKillCountText: HTMLElement;
    showKillTextCallNum = 0;

    playerProfiles: PlayerProfile[];

    constructor() {
        this.killCountDiv = UIManager.createDiv('180px', '180px');
        this.killCountDiv.style.top = '0%';
        
        const circleBarImage = UIManager.createImg(circleBar, '100%','100%', this.killCountDiv);
        // circleBarImage.style.opacity = `${76/255}`;
        // circleBarImage.style.color = 'black';
        //https://stackoverflow.com/questions/7415872/change-color-of-png-image-via-css
        // circleBarImage.style.filter = 'opacity(0.3) drop-shadow(0 0 0 black)';
        circleBarImage.style.filter = 'invert(1) opacity(0.3)';

        this.killCountText = UIManager.createText('Kill : 10', '90px', '20px', this.killCountDiv);
        this.killCountText.style.fontFamily = 'Fredoka';

        // this.centerKillCountText = UIManager.getInstance().createText('+1', '10%', '10%');
        this.centerKillCountText = UIManager.createText('asdf', '10%', '10%');
        this.centerKillCountText.style.fontFamily = 'Fredoka';
        // this.centerKillCountText.style.fontSize = '10vw';
        this.centerKillCountText.style.top = '30%'
        this.centerKillCountText.style.left = '45%'
        this.centerKillCountText.style.textAlign = 'center'
        this.centerKillCountText.style.color = '#242246';
        

        this.centerKillAnimInfo = {
            element: this.centerKillCountText,
            curTime: 0, maxTime: 0.2,
            baseWidthPercent: 10, baseHeightPercent: 10,
            topPercent: 45, leftPercent: 50,
            fromScale: 3, toScale: 1,
        }

        this.playerProfiles = [];
        for (let index = 0; index < 7; index++) {
            this.playerProfiles[index] = new PlayerProfile(index);
        }
    }
    updateAspect() {
        let length = (window.innerWidth < window.innerHeight) ? window.innerWidth : window.innerHeight;
        // let length = window.innerWidth;
        length *= 0.4;
        this.killCountDiv.style.width = `${length}px`;
        this.killCountDiv.style.height = `${length}px`;
        this.killCountDiv.style.left = `-${length * 0.4}px`;

        this.killCountText.style.width = `${length * 0.5}px`;
        this.killCountText.style.top = `${length * 0.42}px`;
        this.killCountText.style.color = 'white';
        this.killCountText.style.fontSize = `${length * 0.12}px`;
        this.killCountText.style.left = `${length * 0.45}px`;

        this.centerKillCountText.style.fontSize = (window.innerWidth < window.innerHeight) ? '10vw' : '10vh';

        this.playerProfiles.forEach(profile => {
            profile.updateAspect();
        });
    }
    init() {
        this.killCountDiv.style.visibility = 'hidden';
        this.killCountText.textContent = 'Kill : 0';

        this.showKillTextCallNum = 0;
        this.centerKillCountText.style.visibility = 'hidden';
        for (let index = 0; index < this.playerProfiles.length; index++) {
            this.playerProfiles[index].hide();
        }
    }
    // show() {

    // }
    readyToStart() {
        for (let index = 0; index < this.playerProfiles.length; index++) {
            this.playerProfiles[index].show();
        }
    }
    start() {
        this.killCountDiv.style.visibility = 'visible';
    }
    update(deltaTime: number) {
        if (this.centerKillCountText.style.visibility === 'visible')
            ScaleAnimation.animate(this.centerKillAnimInfo, deltaTime);
    }
    showCenterKillCount(value: number, screenPos: THREE.Vector3) {
        const canvasPos = UIManager.convertScreenToCanvas(screenPos);
        this.centerKillAnimInfo.topPercent = canvasPos.y * 100;
        this.centerKillAnimInfo.leftPercent = canvasPos.x * 100;

        // this.setKillCount(10);
        this.centerKillCountText.textContent = '+' + value;
        this.centerKillCountText.style.visibility = 'visible';
        this.centerKillAnimInfo.curTime = 0;

        this.showKillTextCallNum++;
        setTimeout(() => {
            this.showKillTextCallNum--;
            if (this.showKillTextCallNum === 0) {
                this.centerKillCountText.style.visibility = 'hidden';
            }
        }, 1000)
    }
    setKillCount(value: number) {
        this.killCountText.textContent = 'Kill : ' + value;
    }
}