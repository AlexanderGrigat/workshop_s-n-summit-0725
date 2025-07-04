import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidators {
    static alphaNum(ctrl: AbstractControl): ValidationErrors | null {
        let pattern: RegExp = /^[a-zA-Z0-9]+$/;
        return pattern.test(ctrl.value) ? null : { alphaNum: true };
    }
    
    static positiv(ctrl: AbstractControl): ValidationErrors | null{
        let value = Number(ctrl.value);
        return value > 0 ? null : { positiv: true};
    }
}
