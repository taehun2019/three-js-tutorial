import { GUI } from 'three/examples/jsm/libs/dat.gui.module'

export default class GUIManager {
    private static instance: GUIManager;
    static getInstance() { 
        if (!GUIManager.instance) { 
            GUIManager.instance = new GUIManager(); 
        } 
        return GUIManager.instance; 
    }

    gui: GUI;
    constructor() {
        this.gui = new GUI();
    }
}