import { Injectable } from "@angular/core";
import { delay, of } from "rxjs";

@Injectable()
export class ValueService {
    value = 'real value';

    getValue() {
        return this.value;
    }

    setValue(value: string) {
        this.value = value;
    }

    getObservableValue() {
        return of('value from observable');
    }

    getPromiseValue() {
        return Promise.resolve('promise value');
    }

    getObservableDelayValue() {
        return of('observable delay value').pipe(delay(10));
    }
}

@Injectable()
export class MasterService {

    constructor(private valueService: ValueService) { }

    getValue() {
        return this.valueService.getValue();
    }

}