import {async, TestBed} from '@angular/core/testing';

import { SensorStatisticResolveService } from './sensor-statistic.resolve.service';
import { DashboardService } from '../dashboard.service';

class DashboardServiceMock {
    getStatistic(): void {}
}

describe('dashboard-resolveSensorDetailsService', () => {
    let sut;
    let dashboardService;
    let route = {
        params: {
            id: 123,
            period: 'day'
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: DashboardService, useClass: DashboardServiceMock },
                SensorStatisticResolveService
            ]
        })
        .compileComponents()
        .then(() => {
            sut = TestBed.get(SensorStatisticResolveService);
            dashboardService = TestBed.get(DashboardService);
            spyOn(dashboardService, 'getStatistic').and.callThrough();
        });
    }));

    it('should resolve default statistic for sensor', () => {
        sut.resolve(route);
        expect(sut.dashboardService.getStatistic).toHaveBeenCalledWith(route.params.id, route.params.period);
    });
});