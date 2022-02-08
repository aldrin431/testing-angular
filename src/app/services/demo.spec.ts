import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { MasterService, ValueService } from "./demo";

export class FakeValueService extends ValueService {
    override value = 'Faked service value';
}

describe('ValueService', () => {
    let service: ValueService;

    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [ValueService] });
        service = TestBed.inject(ValueService);
    })

    it(`#setValue should return 'testing'`, () => {
        service.setValue('testing');
        expect(service.value).toEqual('testing');
    })

    it(`#getValue should return 'real value'`, () => {
        expect(service.getValue()).toBe('real value');
    });

    it(`#getObservableValue should return 'value from observable'`, (done: DoneFn) => {
        service.getObservableValue().subscribe({
            next: (value: string) => {
                expect(value).toBe('value from observable');
                done();
            }
        })
    });

    it(`#getPromiseValue should return 'promise value'`, (done: DoneFn) => {
        service.getPromiseValue().then((value: string) => {
            expect(value).toBe('promise value');
            done();
        });
    })

    it(`#getObservableDelayValue should return 'observable delay value'`, fakeAsync(() => {
        let result: string = '';
        service.getObservableDelayValue().subscribe({
            next: (value: string) => result = value
        })
        tick(10);
        expect(result).toBe('observable delay value');
    }));
});


describe('MasterService', () => {

    let masterService: MasterService;
    let valueServiceSpy: jasmine.SpyObj<ValueService>;

    beforeEach(() => {
        const spy = jasmine.createSpyObj('ValueService', ['getValue']);

        TestBed.configureTestingModule({
            /* Provide both the service-to-test and its (spy) dependency */
            providers: [
                MasterService,
                { provide: ValueService, useValue: spy }
            ]
        })

        masterService = TestBed.inject(MasterService);
        valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
    })

    it(`#getValue should return 'real value' from the real service`, () => {
        expect(masterService.getValue()).toBe('real value');
    });


    it(`#getValue should return 'stub value' from a spy`, () => {
        /* Set the value to return when the `getValue` spy is called */
        const stubValue = 'stub value';
        valueServiceSpy.getValue.and.returnValue(stubValue);

        expect(masterService.getValue())
            .withContext('service returned stub value')
            .toBe(stubValue);

        expect(valueServiceSpy.getValue.calls.count())
            .withContext('spy method was called once')
            .toBe(1);

        expect(valueServiceSpy.getValue.calls.mostRecent().returnValue)
            .toBe(stubValue);
    });

});