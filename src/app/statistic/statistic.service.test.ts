import { StatisticService } from './statistic.service';
import { URLSearchParams } from '@angular/http';

describe('StatisticService', () => {
    let httpMock;
    let sut;

    beforeEach(() => {
        httpMock = jasmine.createSpyObj('mock http', ['get']);
    });

    beforeEach(() => {
        sut = new StatisticService(httpMock);
    });

    describe('#getStatistics', () => {
        const period = 'some period';

        it('should get statistics of the sensor from the server', () => {
            const deviceId = 'some device id';
            const type = 'some device type';
            sut.getStatistic(deviceId, period, type);
            const params = new URLSearchParams();
            params.set('period', period);
            params.set('sensor', deviceId);
            expect(httpMock.get).toHaveBeenCalledWith('/timeseries', params);
        });

        it('should get statistics of the switcher from server', () => {
            const deviceId = 'switchers id';
            const type = 'switcher';
            sut.getStatistic(deviceId, period, type);
            const params = new URLSearchParams();
            params.set('period', period);
            params.set('sensor', deviceId);
            expect(httpMock.get).toHaveBeenCalledWith('/switcher-statistics', params);
        });
    });
});
