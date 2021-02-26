export default class DeviceManager {
    private static instance: DeviceManager;
    static getInstance() { 
        if (!DeviceManager.instance) { 
            DeviceManager.instance = new DeviceManager(); 
        } 
        return DeviceManager.instance; 
    }

    osName: string;
    useVibration: boolean;
    useTouch: boolean;
    clickEventName: string;

    constructor() {
        this.osName = (this.getOS() !== null) ? this.getOS() as string : '';
        console.log(this.osName);
        this.useVibration = (this.osName === 'iOS' || this.osName === 'Mac OS') ? false : true;
        this.useTouch = (this.osName === 'iOS') ? true : false;
        this.clickEventName = (this.useTouch === false) ? 'click' : 'touchstart';
    }

    //https://stackoverflow.com/questions/9514179/how-to-find-the-operating-system-version-using-javascript
    getOS() {
        var userAgent = window.navigator.userAgent,
            platform = window.navigator.platform,
            macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
            windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
            iosPlatforms = ['iPhone', 'iPad', 'iPod'],
            os = null;

        if (macosPlatforms.indexOf(platform) !== -1) {
            os = 'Mac OS';
        } else if (iosPlatforms.indexOf(platform) !== -1) {
            os = 'iOS';
        } else if (windowsPlatforms.indexOf(platform) !== -1) {
            os = 'Windows';
        } else if (/Android/.test(userAgent)) {
            os = 'Android';
        } else if (!os && /Linux/.test(platform)) {
            os = 'Linux';
        }

        return os;
    }

    vibrate(millisecond: number) {
        if (this.useVibration === false)
            return;

        window.navigator.vibrate(millisecond);
    }
}