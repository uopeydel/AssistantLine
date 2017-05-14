import { Directive, ElementRef, Renderer, Input, HostListener } from "@angular/core";
export var InputAutoFillDirective = (function () {
    function InputAutoFillDirective(el, rndr) {
        this.el = el;
        this.rndr = rndr;
    }
    InputAutoFillDirective.prototype.onKeyUp = function (evt) {
        if (!this.opts.enabled || evt.keyCode === 8 || evt.keyCode === 46) {
            return;
        }
        var val = this.getInputValue();
        var ews = this.endsWith(val, this.opts.separator);
        var parts = val.split(this.opts.separator);
        var idx = parts.length - 1;
        if (val.indexOf(this.opts.separator + this.opts.separator) !== -1) {
            return;
        }
        if (!ews && (val.length === this.getPartLength(0) || val.length === this.getPartLength(0) + this.getPartLength(1) + this.opts.separator.length)) {
            this.setInputValue(val + this.opts.separator);
        }
        else if (ews && parts[idx - 1].length < this.getPartLength(idx - 1) && this.isNumber(parts[idx - 1]) && (this.isDay(idx - 1) || this.isMonth(idx - 1))) {
            this.setInputValue(this.insertPos(val, val.length - 2, "0"));
        }
        else if (parts[idx].length < this.getPartLength(idx) && this.isNumber(parts[idx]) && (Number(parts[idx]) > 3 && this.isDay(idx) || Number(parts[idx]) > 1 && this.isMonth(idx))) {
            this.setInputValue(this.insertPos(val, val.length - 1, "0") + (idx < 2 ? this.opts.separator : ""));
        }
    };
    InputAutoFillDirective.prototype.endsWith = function (val, suffix) {
        return val.indexOf(suffix, val.length - suffix.length) !== -1;
    };
    InputAutoFillDirective.prototype.insertPos = function (str, idx, val) {
        return str.substr(0, idx) + val + str.substr(idx);
    };
    InputAutoFillDirective.prototype.getPartLength = function (idx) {
        return this.opts.formatParts[idx].length;
    };
    InputAutoFillDirective.prototype.isNumber = function (val) {
        return val.match(/[1-9]/) !== null;
    };
    InputAutoFillDirective.prototype.isDay = function (idx) {
        return this.opts.formatParts[idx].indexOf("d") !== -1;
    };
    InputAutoFillDirective.prototype.isMonth = function (idx) {
        return this.opts.formatParts[idx].indexOf("m") !== -1 && this.opts.formatParts[idx].length === 2;
    };
    InputAutoFillDirective.prototype.getInputValue = function () {
        return this.el.nativeElement.value;
    };
    InputAutoFillDirective.prototype.setInputValue = function (val) {
        this.rndr.setElementProperty(this.el.nativeElement, "value", val);
    };
    InputAutoFillDirective.decorators = [
        { type: Directive, args: [{
                    selector: "[myinputautofill]"
                },] },
    ];
    /** @nocollapse */
    InputAutoFillDirective.ctorParameters = [
        { type: ElementRef, },
        { type: Renderer, },
    ];
    InputAutoFillDirective.propDecorators = {
        'opts': [{ type: Input, args: ["myinputautofill",] },],
        'onKeyUp': [{ type: HostListener, args: ["keyup", ["$event"],] },],
    };
    return InputAutoFillDirective;
}());
//# sourceMappingURL=my-date-picker.input.auto.fill.directive.js.map