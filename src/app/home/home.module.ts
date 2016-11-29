import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'angular2-highcharts';

import { SharedModule } from '../shared/shared.module';

import { routing } from './home.routing';

import { HomeComponent } from './home.component';

import HOME_DECLARATIONS from './home.declarations';

@NgModule({
    id: module.id,
    imports: [ SharedModule, RouterModule, FormsModule, routing, ChartModule ],
    declarations: [ ...HOME_DECLARATIONS ],
    exports: [ HomeComponent ],
    providers: [
    ]
})
export class HomeModule {}