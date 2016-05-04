import {Injectable, Component} from 'angular2/core';
import {NgForm} from 'angular2/common';// eslint-disable-line
import {RouteParams, Router} from 'angular2/router';
import {Http, HTTP_PROVIDERS} from 'angular2/http';

import Sensor from './sensor';
import SensorDetailService from './sensor-detail.service';
import template from './sensor-detail.html';

const selector = 'sh-sensor-detail';

@Component({
    selector,
    template,
    providers: [
        Http,
        HTTP_PROVIDERS,
        SensorDetailService
    ]
})
@Injectable()
export class SensorDetail {
    constructor(sensorDetailService:SensorDetailService, routeParams:RouteParams, router:Router) {
        this.sensorDetailService = sensorDetailService;
        this.routeParams = routeParams;
        this.router = router;
        this.sensor = new Sensor();
    }

    ngOnInit() {
        const id = this.routeParams.get('id');
        this.sensorDetailService
            .get(id)
            .subscribe(data => {
                this.sensor = new Sensor(data);
            }, this._onError, this._onComplete);
    }

    save() {
        this.sensorDetailService
            .save(this.sensor)
            .subscribe(response => {
                console.log(response);// eslint-disable-line
            }, this._onError, this._onComplete);
    }

    cancel() {
        this.router.navigate(['Home']);
    }

    _onError(error) {
        console.error(error);// eslint-disable-line
    }

    _onComplete() {
        console.log('Completed!');// eslint-disable-line
    }
}
