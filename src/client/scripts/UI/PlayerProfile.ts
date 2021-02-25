import * as THREE from 'three';
import UIManager from 'common/scripts/Managers/UIManager';

import korea from 'common/images/flags/South-Korea.png';
import japan from 'common/images/flags/Japan.png';
import china from 'common/images/flags/China.png';
import us from 'common/images/flags/United-States.png';
import uk from 'common/images/flags/United-Kingdom.png';
import canada from 'common/images/flags/Canada.png';
import germany from 'common/images/flags/Germany.png';

const countries = [
    korea, japan, china, us, uk, canada, germany
]
const names = [
    'Jack',
    'James',
    'Max',
    'Leo',
    'Joy',
    'Kelly',
    'Risa',

    // 'Michael',
    // 'Christopher',
    // 'Matthew',
    // 'Jason',
    // 'Jessica',
    // 'Ashley',
    // 'Emily'
]

export default class PlayerProfile {
    rootDiv: HTMLDivElement;
    image: HTMLImageElement;
    divSize: THREE.Vector2;
    text: HTMLTextAreaElement;
    constructor(countryIndex: number) {
        this.rootDiv = UIManager.createDiv('10%', '10%');
        this.image = UIManager.createImg(countries[countryIndex], '20%', '100%', this.rootDiv);
        this.image.style.left = '0%';

        this.divSize = new THREE.Vector2();

        this.text = UIManager.createText(names[countryIndex], '70%', '100%', this.rootDiv);
        this.text.style.right = '0%';
        this.text.style.justifyContent = 'start';
        this.text.style.fontFamily = 'Fredoka';
        this.text.style.color = '#242246';
    }
    // init() {
    //     this.rootDiv.style.visibility = 'hidden';
    // }
    show() {
        // console.log('PlayerProfile.show');
        this.rootDiv.style.visibility = 'visible';
    }
    updateAspect() {
        let length = (window.innerWidth < window.innerHeight) ? window.innerWidth : window.innerHeight;
        length *= 0.2;
        this.divSize.x = length;
        this.divSize.y = length * 0.5;
        this.rootDiv.style.width = `${this.divSize.x}px`;
        this.rootDiv.style.height = `${this.divSize.y}px`;

        this.text.style.fontSize = (window.innerWidth < window.innerHeight) ? '4vw' : '4vh';
    }
    updatePosition(screenPos: THREE.Vector3) {
        // screenPos.y *= -1;
        // const canvasPos = screenPos.clone().multiplyScalar(0.5).addScalar(0.5); //-1~1 => 0~1
        // canvasPos.y -= 0.05;
        const canvasPos = UIManager.convertScreenToCanvas(screenPos);
        this.rootDiv.style.left = `${(window.innerWidth * canvasPos.x) - (this.divSize.x * 0.5)}px`
        this.rootDiv.style.top = `${(window.innerHeight * canvasPos.y) - (this.divSize.y * 0.5)}px`
    }
    hide() {
        this.rootDiv.style.visibility = 'hidden';
    }
}