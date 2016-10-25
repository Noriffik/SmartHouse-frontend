import {async, TestBed} from '@angular/core/testing';

import { Subject } from 'rxjs/Rx';
import { ScenarioService } from './../shared/scenario.service';
import { ScenarioStatusService } from './scenario-status.service';
import {
    ScenarioListComponent,
    SCENARIO_ACTIVE_STATE,
    SCENARIO_PAUSED_STATE
} from './scenario-list.component';
import { Router, ActivatedRoute } from '@angular/router';

const mockScenario = {
    active: true
};
const mockScenarios = [mockScenario];

class ObservableSubscribe {
    constructor(private _data = {}) {}

    subscribe(fn) {
        return fn(this._data);
    }
}

class ScenarioServiceMock {

    delete(data) {
        return new ObservableSubscribe(data);
    }

    update(data) {
        return new ObservableSubscribe(data);
    }
}

class RouterMock {
    navigate() {
    }
}

class ScenarioStatusServiceMock {
    private stream;
    constructor() {
        this.stream = new Subject();
    }
}

class ActivatedRouteMock {
    private data;
    constructor(scenarioList) {
        this.data = new ObservableSubscribe({scenarioList});
    }
}

describe('ScenarioListComponent', () => {
    let sut;
    let scenarioService;
    let router;
    let scenarioStatusService;
    let activatedRouteMock;

    const listData = [
        { id: '1', value: 'testValue1' },
        { id: '2', value: 'testValue2' }
    ];
    const scenario = {
        id: 123
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ScenarioListComponent ],
            providers: [
                { provide: ScenarioService, useClass: ScenarioServiceMock },
                // { provide: RouteParams, useClass: RouteParamsMock },
                { provide: Router, useClass: RouterMock },
                { provide: ScenarioStatusService, useClass: ScenarioStatusServiceMock },
                { provide: ActivatedRoute, useValue: new ActivatedRouteMock(mockScenarios)}
            ]
        })
        .overrideComponent(ScenarioListComponent, {
            set: {template: 'mocked template'}
        })
        .compileComponents()
        .then(() => {
            router = TestBed.get(Router);
            scenarioService = TestBed.get(ScenarioService);
            scenarioStatusService = TestBed.get(ScenarioStatusService);
            activatedRouteMock = TestBed.get(ActivatedRoute);

            sut = TestBed.createComponent(ScenarioListComponent).componentInstance;

            spyOn(scenarioService, 'delete').and.callThrough();
            spyOn(scenarioService, 'update').and.callThrough();
            spyOn(router, 'navigate').and.callThrough();
            spyOn(activatedRouteMock.data, 'subscribe').and.callThrough();

            sut.ngOnInit();
        });
    }));
    describe('ngOnInit', () => {
        it('should recive scenarioList', () => {
            expect(sut.scenarioList).toEqual(mockScenarios);
        });

        it('should get data from activatedRoute', () => {
            expect(activatedRouteMock.data.subscribe).toHaveBeenCalled();
        });

        it('should set scenario status', () => {
            expect(mockScenario['status']).toBe(SCENARIO_ACTIVE_STATE);
        });

        it('should update scenario status on event', () => {
            const pausedState = false;
            sut.scenarioList = listData;
            scenarioStatusService.stream.next({id: listData[1].id, active: pausedState});

            expect(sut.scenarioList[1].active).toBe(pausedState);
            expect(sut.scenarioList[1].status).toBe(SCENARIO_PAUSED_STATE);
        });
    });

    describe('ngOnDestroy', () => {
        beforeEach(() => {
            spyOn(sut.subscription, 'unsubscribe');
            sut.ngOnDestroy();
        });

        it('should cancel subscription', () => {
            expect(sut.subscription.unsubscribe).toHaveBeenCalled();
        });
    });

    describe('#toggleScenarioState', () => {
        let mockedScenario;

        beforeEach(() => {
            mockedScenario = { id: 'mock', active: false };
        });

        it('should toggle scenario state', () => {
            sut.ngOnInit();
            sut.toggleScenarioState(mockedScenario);

            expect(mockedScenario.active).toBe(true);
        });

        it('should set status when toggle scenario state', () => {
            sut.ngOnInit();
            sut.toggleScenarioState(mockedScenario);

            expect(mockedScenario.status).toBe(SCENARIO_ACTIVE_STATE);
        });
    });

    describe('#navigateToEditView', () => {
        it('should navigate to EditScenarioEditor', () => {
            scenario['isConvertable'] = false;
            sut.navigateToEditView(scenario);
            expect(router.navigate)
                .toHaveBeenCalledWith(['scenarios/editor', scenario.id]);
        });

        it('should navigate to EditScenarioWizard', () => {
            scenario['isConvertable'] = true;
            sut.navigateToEditView(scenario);
            expect(router.navigate)
                .toHaveBeenCalledWith(['scenarios/wizard', scenario.id]);
        });
    });

    describe('#headers', () => {
        const allowedHeaders = [
            { topic: 'name', name: 'Name', sortable: true },
            { topic: 'active', name: 'Active', sortable: false },
            { topic: 'description', name: 'description', sortable: true }
        ];

        it('should have collection of allowed headers: name, active, description', () => {
            sut._headers = allowedHeaders;
            expect(sut.headers).toEqual(allowedHeaders);
        });
    });

    describe('#removeScenario', () => {
        it('should NOT call scenario service if user does not confirm scenario delete', () => {
            const mockedScenario = {id: 'mock'};
            spyOn(window, 'confirm').and.returnValue(false);
            sut.removeScenario(mockedScenario);

            expect(scenarioService.delete).not.toHaveBeenCalledWith(mockedScenario);
        });

        describe('After user confirmation', () => {
            beforeEach(() => {
                spyOn(window, 'confirm').and.returnValue(true);
            });

            it('should call scenario service if user confirms scenario delete', () => {
                const mockedScenario = {id: 'mock'};
                sut.removeScenario(mockedScenario);

                expect(scenarioService.delete).toHaveBeenCalledWith(mockedScenario);
            });

            it('should remove scenario from listData', () => {
                sut.scenarioList = listData;
                sut.removeScenario(listData[1]);

                expect(sut.scenarioList).toEqual([listData[0]]);
            });
        });
    });
});