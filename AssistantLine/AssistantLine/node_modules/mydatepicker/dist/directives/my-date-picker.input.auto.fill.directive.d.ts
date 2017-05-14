import { ElementRef, Renderer } from "@angular/core";
import { IMyInputAutoFill } from "../interfaces/my-input-auto-fill.interface";
export declare class InputAutoFillDirective {
    private el;
    private rndr;
    opts: IMyInputAutoFill;
    constructor(el: ElementRef, rndr: Renderer);
    onKeyUp(evt: KeyboardEvent): void;
    private endsWith(val, suffix);
    private insertPos(str, idx, val);
    private getPartLength(idx);
    private isNumber(val);
    private isDay(idx);
    private isMonth(idx);
    private getInputValue();
    private setInputValue(val);
}
