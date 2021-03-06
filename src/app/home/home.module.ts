import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { routing } from './home.routing';

import { HomeComponent } from './home.component';

import HOME_DECLARATIONS from './home.declarations';
import { CoreModule } from '../core/core.module';
import { ChartModule } from 'angular2-highcharts';
import { HomeService } from './home.service';
import { HomeResolveService } from './home-resolve.service';
import { DevicesModule } from '../devices/devices.module';

@NgModule({
    id: module.id,
    imports: [
        CoreModule,
        SharedModule,
        DevicesModule,
        RouterModule,
        FormsModule,
        routing,
        ChartModule
    ],
    declarations: [ ...HOME_DECLARATIONS ],
    exports: [ HomeComponent ],
    providers: [
        HomeService,
        HomeResolveService
    ]
})
export class HomeModule {}
