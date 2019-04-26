import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ValidationService {

    constructor() { }

    public validateFormControl(formContol) {

        formContol.validators.forEach(validator => {
            if (this[validator](formContol.value)) {
                formContol.valid = true;
            } else {
                formContol.valid = false;
            }
        });
        return formContol.valid;
    }

    public email(email: any) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return !re.test(email);
    }
    public required(value: string) {
        return value.length;
    }
}
