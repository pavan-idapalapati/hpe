import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ValidationService {

    constructor() { }
    public validateFormControl(formContol) {
        if(!formContol.validators.length) {
            formContol.isValid = true;
        }
        formContol.validators.every(validator => {
            if (this[validator](formContol)) {
                formContol.isValid = true;
            } else {
                formContol.isValid = false;
            }
            return formContol.isValid;
        });
        return formContol.isValid;
    }

    public email(formControl: any) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(formControl.value)) {
            formControl.errorMessage = "Invalid Email";
        }
        return re.test(formControl.value);
    }
    public required(formControl) {
        if(!formControl.value) {
            formControl.errorMessage = "This is required";
        }
        return formControl.value.length;
    }
}
