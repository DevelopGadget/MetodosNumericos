import {
    FormGroup,
    FormControl,
    Validators,
    FormArray,
    FormBuilder
} from '@angular/forms';


export class FormModel {

    constructor(private fb:FormBuilder) {
        
    }

    FormModel() {
        return this.fb.group({
            temperatura1: new FormControl('', {
                validators: [Validators.required]
            }),
            temperatura2: new FormControl('', {
                validators: [Validators.required]
            }),
            numIteraciones: new FormControl('', {
                validators: [Validators.required]
            }),
            mol: new FormControl('', {
                validators: [Validators.required]
            }),
            functionsCP: this.fb.array([])
        });
    }

    FormModelArray() {
        return this.fb.group({
            functionCP: new FormControl('', {
                validators: [Validators.required]
            }),
        });
    }

}
