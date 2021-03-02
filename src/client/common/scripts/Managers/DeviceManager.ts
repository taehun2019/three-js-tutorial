export default class DeviceManager {
    private static instance: DeviceManager;
    static getInstance() { 
        if (!DeviceManager.instance) { 
            DeviceManager.instance = new DeviceManager(); 
        } 
        return DeviceManager.instance; 
    }

    static osName: string;
    
    useVibration: boolean;
    useTouch: boolean;
    clickEventName: string;

    constructor() {
        const osName = (this.getOS() !== null) ? this.getOS() as string : '';
        this.useVibration = (osName === 'iOS' || osName === 'Mac OS') ? false : true;
        this.useTouch = (osName === 'iOS') ? true : false;
        this.clickEventName = (this.useTouch === false) ? 'click' : 'touchstart';

        DeviceManager.osName = osName;
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