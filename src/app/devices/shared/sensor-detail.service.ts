import { Injectable } from '@angular/core';
import { ShHttpService } from '../../core/sh-http/sh-http.service';

@Injectable()
export class SensorDetailService {

    constructor(private http: ShHttpService) {}

    get(id = '') {
        return this.http.get(`/sensors/${id}`);
    }

    save(sensor) {
        return this.http.post('/sensors', sensor);
    }

    update(sensor) {
        return this.http.put(`/sensors/${sensor._id}`, sensor);
    }

    delete(sensor) {
        return this.http.delete(`/sensors/${sensor._id}`);
    }
}
