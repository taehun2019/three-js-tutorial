import DeviceManager from "./DeviceManager";

const appleStoreUrl = 'https://apps.apple.com/us/app/snow-roll-io/id1545852074';
const googleStoreUrl = 'https://play.google.com/store/apps/details?id=com.foursgames.snowroll';

let loadedMraid: any;
let loadedDapi: any;

export enum AdNetwork {
    None,
    Mintegral,
    IronSource,
    AppLovin,
    UnityAds,
    Facebook,
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
            case AdNetwork.UnityAds:
                PublishManager.loadWithMraid(loadGameAction);
                break
            case AdNetwork.IronSource:
                PublishManager.loadWithDapi(loadGameAction);
                break;
            case AdNetwork.Mintegral:
            case AdNetwork.Facebook:
            default:
                loadGameAction();
                break;
        }
    }

    static loadWithMraid(loadGameAction: Function) {
        try {
            //@ts-ignore
            loadedMraid = mraid;
            if (loadedMraid.getState() === 'loading')
                loadedMraid.addEventListener('ready', PublishManager.onMraidReadyCallback());
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
    static onMraidReadyCallback() {
        loadedMraid.removeEventListener("ready", PublishManager.onMraidReadyCallback);
        PublishManager.loadGameAction();
    }

    static loadWithDapi(loadGameAction: Function) {
        //@ts-ignore
        loadedDapi = dapi;
        console.log(loadedDapi);
        //@ts-ignore
        console.log(window.dapi);
        loadedDapi.isReady();
        (loadedDapi.isReady()) ? PublishManager.onDapiReadyCallback() : loadedDapi.addEventListener("ready", PublishManager.onDapiReadyCallback());
    }
    static onDapiReadyCallback() {
        console.log('onDapiReadyCallback');
        loadedDapi.removeEventListener("ready", PublishManager.onDapiReadyCallback);

        loadedDapi.getScreenSize();
        loadedDapi.getAudioVolume();
        loadedDapi.addEventListener("audioVolumeChange", () => { });

        if(loadedDapi.isViewable()){
            PublishManager.adVisibleCallback({isViewable: true});
        }
    
        loadedDapi.addEventListener("viewableChange", PublishManager.adVisibleCallback);
        loadedDapi.addEventListener("adResized", PublishManager.adResizeCallback);

        PublishManager.loadGameAction();
    }
    static adVisibleCallback(event: any) {
        console.log("isViewable " + event.isViewable);
        if (event.isViewable){
            const screenSize = loadedDapi.getScreenSize();
            //START or RESUME the ad
        } else {
            //PAUSE the ad and MUTE sounds
        }
    }
    static adResizeCallback(event: any){
        const screenSize = event;
        console.log("ad was resized width " + event.width + " height " + event.height);
    }

    static onClickDownloadButton() {
        switch (this.adNetwork) {
            case AdNetwork.Mintegral:
                //@ts-ignore
                window.install && window.install();
                break;
            case AdNetwork.AppLovin:
            case AdNetwork.UnityAds:
                PublishManager.OpenStoreWithMraid();
                break;
            case AdNetwork.IronSource:
                loadedDapi.openStoreUrl();
                break;
            case AdNetwork.Facebook:
                //@ts-ignore
                FbPlayableAd.onCTAClick()
                break;
            default:
                PublishManager.OpenStore();
                break;
        }
    }

    static OpenStore() {
        // const osName = DeviceManager.osName;
        // switch (osName) {
        //     case 'iOS':
        //         window.location.href = appleStoreUrl;
        //         break;
        //     case 'Mac OS':
        //         window.open(appleStoreUrl);
        //         break;
        //     default:
        //         window.open(googleStoreUrl);
        //         break;
        // }
    }
    static OpenStoreWithMraid() {
        // if (mraidService === undefined) {
        //     PublishManager.OpenStore();
        //     return;
        // }
        const osName = DeviceManager.osName;
        switch (osName) {
            case 'iOS':
                //@ts-ignore
                mraid.open(appleStoreUrl);
                break;
            default:
                //@ts-ignore
                mraid.open(googleStoreUrl);
                break;
        }
    }
}
