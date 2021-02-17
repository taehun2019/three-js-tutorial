import * as THREE from "three";
import DeviceManager from "./DeviceManager";
// import { Vector2 } from "three";
// import { THREE } from 'enable3d';
const Vector2 = THREE.Vector2;

export default class VirtualJoystickManager {
    private static instance: VirtualJoystickManager;
    static getInstance(canvas?: HTMLCanvasElement) { 
        if (!VirtualJoystickManager.instance) { 
            VirtualJoystickManager.instance = new VirtualJoystickManager(canvas as HTMLCanvasElement); 
            return this.instance;
        } 
        return VirtualJoystickManager.instance; 
    }
    // static getOffset() {
    //     return this.instance.offset;
    // }

    canvas: HTMLCanvasElement;
    centerPosition: THREE.Vector2; // = {x: 0, y: 0};
    pointerPosition: THREE.Vector2; // = {x: 0, y: 0};
    clicked: boolean;
    offset: THREE.Vector2;
    getCanvasRelativePositionFunction: Function;
    constructor(canvas: HTMLCanvasElement) {
        VirtualJoystickManager.instance = this;

        this.canvas = canvas;
        this.centerPosition = new Vector2(0, 0);
        this.pointerPosition = new Vector2(0, 0);
        this.clicked = false;
        this.offset = new Vector2(0, 0);
        
        //https://techhtml.github.io/pointerevents/#the-pointerleave-event
        //https://stackoverflow.com/questions/48124372/pointermove-event-not-working-with-touch-why-not
        //body에 touch-action none 추가.
        // window.addEventListener('pointerdown', VirtualJoystickManager.onPointerDown, {passive: false});
        // window.addEventListener('pointermove', VirtualJoystickManager.onPointerMove, {passive: false});
        // window.addEventListener('pointerup', VirtualJoystickManager.onPointerUp, {passive: false});
        const useTouch = (DeviceManager.getInstance().osName === 'iOS') ? true : false;
        this.getCanvasRelativePositionFunction = (useTouch === true) ? this.getCanvasRelativePositionByTouch : this.getCanvasRelativePosition;
        //https://discourse.threejs.org/t/mobile-device-click-not-working/7775/3
        const controlStart = (useTouch === true) ? 'touchstart' : 'pointerdown';
        const controlMove = (useTouch === true) ? 'touchmove' : 'pointermove';
        const controlEnd = (useTouch === true) ? 'touchend' : 'pointerup';
        window.addEventListener(controlStart, this.onControlStart.bind(this), {passive: false});
        window.addEventListener(controlMove, this.onControlMove.bind(this), {passive: false});
        window.addEventListener(controlEnd, this.onControlEnd.bind(this), {passive: false});
        // window.addEventListener('mousedown', VirtualJoystickManager.onPointerDown);
        // window.addEventListener('mousemove', VirtualJoystickManager.onPointerMove);
        // window.addEventListener('mouseup', VirtualJoystickManager.onPointerUp);
        // window.addEventListener('pointerleave', VirtualJoystickManager.onPointerLeave);

        // document.addEventListener("touchmove", VirtualJoystickManager.onTouchMove, {passive: false})
    }

    private onControlStart(event: any) { //MouseEvent) {
        event.preventDefault(); 
        // console.log("onControlStart");
        this.clicked = true;

        const pos = this.pointerEventToViewport(event);
        this.centerPosition.set(pos.x, pos.y);
        // console.log(`pointer down pos : ${pos.x}/${pos.y}`);
    }
    private onControlMove(event: any) { //PointerEvent) {
        // console.log("onControlMove");
        //iOS에서 터치시 캔버스 이동하는것 방지.
        //https://stackoverflow.com/questions/9251590/prevent-page-scroll-on-drag-in-ios-and-android
        event.preventDefault(); 
        if (this.clicked == false)
            return;
        const pos = this.pointerEventToViewport(event);
        this.pointerPosition.set(pos.x, pos.y);

        const offset = this.offset;
        offset.x = this.pointerPosition.x - this.centerPosition.x;
        offset.y = this.pointerPosition.y - this.centerPosition.y;
    }
    private onControlEnd(event: any) { //PointerEvent) {
        event.preventDefault(); 
        // console.log("onControlEnd");
        this.clicked = false;
        // VirtualJoystickManager.offset.set(0, 0);
        // console.log("pointer up");
    }

    private pointerEventToViewport(event: any) { // PointerEvent) {
        // const pos = this.getCanvasRelativePosition(event);
        const pos = this.getCanvasRelativePositionFunction(event);
        return {
            x: (pos.x / this.canvas.width) * 2 - 1,
            y: (pos.y / this.canvas.height) * -2 + 1, // Y를 뒤집습니다.
        }
    }
    private getCanvasRelativePosition(event: any) { //PointerEvent) {
        // console.log(`x:${event.clientX}/y:${event.clientY}`)
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: (event.clientX - rect.left) * this.canvas.width / rect.width,
            y: (event.clientY - rect.top) * this.canvas.height / rect.height,
        };
    }
    private getCanvasRelativePositionByTouch(event: TouchEvent) {
        const touch = event.touches[0];
        // console.log(`x:${touch.clientX}/y:${touch.clientY}`);
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: (touch.clientX - rect.left) * this.canvas.width / rect.width,
            y: (touch.clientY - rect.top) * this.canvas.height / rect.height,
        };
    }
}