import DeviceManager from "./DeviceManager";

const appleStoreUrl = 'https://apps.apple.com/us/app/snow-roll-io/id1545852074';
const googleStoreUrl = 'https://play.google.com/store/apps/details?id=com.foursgames.snowroll';

let mraidService: any;

export enum AdNetwork {
    None,
    Mintegral,
    AppLovin,
    IronSource,
}

export default class PublishManager {
    // private static instance: PublishManager;
    // static getInstance() { 
    //     if (!PublishManager.instance) { 
    //         PublishManager.instance = new PublishManager(); 
    //     } 
    //     return PublishManager.instance; 
    // }
    static adNetwork: AdNetwork;
    static loadGameAction: Function;
    
    static load(loadGameAction: Function) {
        PublishManager.loadGameAction = loadGameAction;
        switch (this.adNetwork) {
            case AdNetwork.AppLovin:
                PublishManager.loadWithMraid(loadGameAction);
                break
            case AdNetwork.IronSource:
                PublishManager.loadWithDapi(loadGameAction);
                break;
            case AdNetwork.Mintegral:
            default:
                loadGameAction();
                break;
        }
    }

    static loadWithMraid(loadGameAction: Function) {
        try {
            //@ts-ignore
            mraidService = mraid;
            if (mraidService.getState() === 'loading')
                mraidService.addEventListener('ready', () => loadGameAction());
            else {
                loadGameAction();
            }

            // mraidService.addEventListener("stateChange", function(){
            //     if (mraidService.getState() == 'hidden') {
            //    // Mute all audio here (audiocontext, inline, etc.)}
            // })
        }
        catch(error) {
            console.log(error);
            console.log("mraid is not exist")
            loadGameAction();
        }
    }

    static loadWithDapi(loadGameAction: Function) {
        //@ts-ignore
        console.log(dapi);
        //@ts-ignore
        console.log(window.dapi);
        //@ts-ignore
        (dapi.isReady()) ? loadGameAction() : dapi.addEventListener("ready", PublishManager.onDapiReadyCallback());
    }
    static onDapiReadyCallback() {
        //@ts-ignore
        dapi.removeEventListener("ready", PublishManager.onDapiReadyCallback);
        PublishManager.loadGameAction();
    }

    static onClickDownloadButton() {
        switch (this.adNetwork) {
            case AdNetwork.Mintegral:
                //@ts-ignore
                window.install && window.install();
                break;
            case AdNetwork.AppLovin:
                PublishManager.OpenStoreWithMraid();
                break;
            default:
                PublishManager.OpenStore();
                break;
        }
    }

    static OpenStore() {
        const osName = DeviceManager.osName;
        switch (osName) {
            case 'iOS':
                window.location.href = appleStoreUrl;
                break;
            case 'Mac OS':
                window.open(appleStoreUrl);
                break;
            default:
                window.open(googleStoreUrl);
                break;
        }
    }
    static OpenStoreWithMraid() {
        // if (mraidService === undefined) {
        //     PublishManager.OpenStore();
        //     return;
        // }
        const osName = DeviceManager.osName;
        switch (osName) {
            case 'iOS':
                mraidService.open(appleStoreUrl);
                break;
            default:
                mraidService.open(googleStoreUrl);
                break;
        }
    }
}
