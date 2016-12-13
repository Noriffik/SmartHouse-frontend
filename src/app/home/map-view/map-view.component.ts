import { Component, Input } from '@angular/core';
import { MapViewInfoDto } from './map-view.dto';
import { MapViewService } from './map-view.service';

@Component({
    selector: 'sh-map-view',
    templateUrl: './map-view.template.html',
    styleUrls: [ './map-view.style.scss' ]
})
export class MapViewComponent {
    @Input() currentMapView: MapViewInfoDto;

    constructor(private mapViewService: MapViewService) {}

    getImage(): string {
        return this.mapViewService.resolvePictureUrl(this.currentMapView);
    }
}