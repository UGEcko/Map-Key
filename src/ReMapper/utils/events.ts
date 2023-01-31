import { Color, ColorType, EASE, Event, setDecimals } from "https://deno.land/x/remapper@3.1.1/src/mod.ts";
import { repeat } from "./general.ts";

export class lightGradient {
    /**
     * Create simple lighting gradients.
     * @param time The time to start the gradient.
     * @param duration The duration of the gradient.
     * @param type The light type to use.
     * @param colors The colors to include in the gradient.
     * @param lerpType The color lerp to use.
     * @param easing The easing to use on each color.
     */
    constructor(public time = 0, public duration = 1, public type = 0, public colors: ColorType[], public lerpType?: "HSV" | "RGB", public easing?: EASE){}
    push() {
        const ev = new Event(this.time).backLasers().on(this.colors[0])
        ev.type = this.type;
        ev.push()
        let i = 0;
        this.colors.forEach(color =>{
            if(i !== 0){
                const ev = new Event(i*this.duration/(this.colors.length-1)).backLasers().in(color)
                ev.type = this.type;
                if(this.easing){
                    ev.easing = this.easing
                }
                if(this.lerpType){
                    ev.lerpType = this.lerpType
                }
                ev.push()
            }
            i++
        })
    }
}

export class strobe {
    /**
     * Creates a linear strobe sequence. With events every "interval" beats.
     * @param time The time to start the strobe.
     * @param duration The duration of the strobe.
     * @author Splashcard
     */
    constructor(public time: number, public duration: number) {}
    
    get interval() { return this.interval }
    set interval(interval: number) { this.interval = interval }

    get type() { return this.type }
    set type(type: number) { this.type = type }

    get color() { return this.color }
    set color(color: ColorType | boolean) { this.color = color }

    get ids() { return this.ids }
    set ids(ids: number[]) {this.ids = ids}

    push() {
        //Default values
        if(!this.interval) {this.interval = 1}
        if(!this.color) {this.color = true}
        //Events
        repeat(this.duration/this.interval, i => {
            const time = this.time + i*this.interval*2
            const on = new Event(time).backLasers().on(this.color).push()
            if(this.ids){
                on.lightID = this.ids
            }
            if(this.type){
                on.type = this.type
            }
            on.push();
            const off = new Event(time+this.interval).backLasers().off().push();
            if(this.ids){
                off.lightID = this.ids
            }
            if(this.type){
                off.type = this.type
            }
            off.push();
        })
    }
}

export class lerpGradient {
    /**
     * A class to ease in the creation of HSV hue-cycling.
     * @param startingColor The color to start from. (HSV)
     * @param loopPoint The number of repeats before returning to the starting color.
     */
    constructor(
        public startingColor: ColorType = [0,1,1,1],
        public loopPoint: number = 10
    ){}
    /**
     * Returns the color at a certain position.
     * @param index The position to check for. (TIP: if index == loopPoint, startingColor will be returned)
     * @returns Color.
     */
    export(index: number, precision = 2) {
        if(this.startingColor[3]){
          return new Color([(this.startingColor[0]+(index/this.loopPoint))%1,this.startingColor[1],this.startingColor[2],this.startingColor[3]], "HSV").export().map(x =>{return setDecimals(x,precision)}) as ColorType
        }
        else{
          return new Color([(this.startingColor[0]+(index/this.loopPoint))%1,this.startingColor[1],this.startingColor[2],1], "HSV").export().map(x =>{return setDecimals(x,precision)}) as ColorType
        }
    }
}