import * as THREE from "three";
// import { Vector2 } from "three";
// import { THREE } from 'enable3d';
const Vector2 = THREE.Vector2;

export default class VirtualJoystickManager {
    private static instance: VirtualJoystickManager;
    static getInstance() { 
        if (!VirtualJoystickManager.instance) { 
            // VirtualJoystickManager.instance = new VirtualJoystickManager(); 
            return null;
        } 
        return VirtualJoystickManager.instance; 
    }

    static canvas: HTMLCanvasElement;
    static centerPosition: THREE.Vector2; // = {x: 0, y: 0};
    static pointerPosition: THREE.Vector2; // = {x: 0, y: 0};
    static clicked: boolean;
    static offset: THREE.Vector2;
    constructor(canvas: HTMLCanvasElement) {
        VirtualJoystickManager.instance = this;

        VirtualJoystickManager.canvas = canvas;
        VirtualJoystickManager.centerPosition = new Vector2(0, 0);
        VirtualJoystickManager.pointerPosition = new Vector2(0, 0);
        VirtualJoystickManager.clicked = false;
        VirtualJoystickManager.offset = new Vector2(0, 0);
        
        //https://techhtml.github.io/pointerevents/#the-pointerleave-event
        window.addEventListener('pointerdown', VirtualJoystickManager.onPointerDown);
        window.addEventListener('pointermove', VirtualJoystickManager.onPointerMove);
        window.addEventListener('pointerup', VirtualJoystickManager.onPointerUp);
        // window.addEventListener('pointerleave', VirtualJoystickManager.onPointerLeave);
    }

    static onPointerDown(event: PointerEvent) {
        VirtualJoystickManager.clicked = true;

        const pos = VirtualJoystickManager.pointerEventToViewport(event);
        VirtualJoystickManager.centerPosition.set(pos.x, pos.y);
        console.log(`pointer down pos : ${pos.x}/${pos.y}`);
    }
    static onPointerMove(event: PointerEvent) {
        if (VirtualJoystickManager.clicked == false)
            return;
        const pos = VirtualJoystickManager.pointerEventToViewport(event);
        VirtualJoystickManager.pointerPosition.set(pos.x, pos.y);

        const offset = VirtualJoystickManager.offset;
        offset.x = VirtualJoystickManager.pointerPosition.x - VirtualJoystickManager.centerPosition.x;
        offset.y = VirtualJoystickManager.pointerPosition.y - VirtualJoystickManager.centerPosition.y;
    }
    static onPointerUp(event: PointerEvent) {
        VirtualJoystickManager.clicked = false;
        // VirtualJoystickManager.offset.set(0, 0);
        console.log("pointer up");
    }
    // static onPointerLeave() {
    //     VirtualJoystickManager.pointerPosition.x = -100000;
    //     VirtualJoystickManager.pointerPosition.y = -100000;
    // }

    static pointerEventToViewport(event: PointerEvent) {
        const pos = this.getCanvasRelativePosition(event);
        return {
            x: (pos.x / this.canvas.width) * 2 - 1,
            y: (pos.y / this.canvas.height) * -2 + 1, // Y를 뒤집습니다.
        }
    }
    static getCanvasRelativePosition(event: PointerEvent) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: (event.clientX - rect.left) * this.canvas.width / rect.width,
            y: (event.clientY - rect.top) * this.canvas.height / rect.height,
        };
    }
}