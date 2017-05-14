import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { MyDatePicker } from "./my-date-picker.component";
import { FocusDirective } from "./directives/my-date-picker.focus.directive";
import { InputAutoFillDirective } from "./directives/my-date-picker.input.auto.fill.directive";
export var MyDatePickerModule = (function () {
    function MyDatePickerModule() {
    }
    MyDatePickerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: [MyDatePicker, FocusDirective, InputAutoFillDirective],
                    exports: [MyDatePicker, FocusDirective, InputAutoFillDirective]
                },] },
    ];
    /** @nocollapse */
    MyDatePickerModule.ctorParameters = [];
    return MyDatePickerModule;
}());
//# sourceMappingURL=my-date-picker.module.js.map