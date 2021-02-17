export default class UIManager {
    private static instance: UIManager;
    static getInstance() { 
        if (!UIManager.instance) { 
            UIManager.instance = new UIManager(); 
        } 
        return UIManager.instance; 
    }

    constructor() {

    }

    createDiv(width: string, height: string) {
        const result = document.createElement('div') as HTMLDivElement;
        result.style.position = 'fixed';
        result.style.zIndex = '100000';
        result.style.top = '0px';
        result.style.width = width;
        result.style.height = height;
        document.body.append(result);

        return result;
    }

    createImg(srcUrl: string, width: string, height: string, parent?: HTMLElement) {
        const result = document.createElement('img') as HTMLImageElement;
        result.src = srcUrl;

        result.style.top = '0px';
        result.style.width = width;
        result.style.height = height;
        result.style.objectFit = 'contain';
        if (parent === undefined) {
            result.style.position = 'fixed';
            result.style.zIndex = '100000';
        }
        
        (parent === undefined) ? document.body.append(result) : parent?.append(result);

        return result;
    }

    createText(content: string, width: string, height: string, parent?: HTMLElement) {
        const result = document.createElement('text') as HTMLTextAreaElement;
        result.textContent = content;
        result.style.top = '0px';
        result.style.width = width;
        result.style.height = height;
            result.style.position = 'absolute';
            result.style.zIndex = '100000';
        if (parent === undefined) {
        }
        (parent === undefined) ? document.body.append(result) : parent?.append(result);
        
        return result;
    }
}