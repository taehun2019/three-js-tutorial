import UIManager from './../common/UIManager';
import title from './../assets/images/snow_roll_title.png';
import circleBar from './../assets/images/circle_bar.png';
// import titleFont from './assets/fonts/FredokaOne-Regular.ttf'

export default class MainUI {
    titleImage: HTMLImageElement;
    killCount: HTMLDivElement;
    killCountText: HTMLTextAreaElement;
    constructor() {
        // const image = UIManager.getInstance().createImg(title);
        // this.titleImage = document.getElementById("title") as HTMLImageElement;
        // this.titleImage.src = title;
        // image.style.visibility = 'hidden';

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
        this.killCountText.style.left = '85px';
        this.killCountText.style.top = `${90 - 10- 5}px`;
        this.killCountText.style.color = 'white';
        this.killCountText.style.fontSize = '25px';
        
    }
    init() {
        this.titleImage.style.visibility = 'visible';
        this.killCount.style.visibility = 'hidden';
        this.killCountText.textContent = 'Kill : 0';
    }
    start() {
        this.titleImage.style.visibility = 'hidden';
        this.killCount.style.visibility = 'visible';
    }

    setKillCount(value: number) {
        this.killCountText.textContent = 'Kill : ' + value;
    }
}