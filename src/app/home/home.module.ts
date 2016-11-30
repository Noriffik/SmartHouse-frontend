import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { routing } from './home.routing';

import { HomeComponent } from './home.component';

import HOME_DECLARATIONS from './home.declarations';
import { MapViewService } from './map-view/map-view.service';
import { CoreModule } from '../core/core.module';

@NgModule({
    id: module.id,
    imports: [
        CoreModule,
        SharedModule,
        RouterModule,
        FormsModule,
        routing,
        ChartModule
    ],
    declarations: [ ...HOME_DECLARATIONS ],
    exports: [ HomeComponent ],
    providers: [
        MapViewService
    ]
})
export class HomeModule {}
