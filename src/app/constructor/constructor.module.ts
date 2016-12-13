import { NgModule } from '@angular/core';
import { routing } from './constructor.routing';
import { ConstructorComponent } from './constructor.component';
import { DashboardConstructorComponent } from './dashboard/dashboard-constructor.component';
import { MapConstructorComponent } from './map/map-constructor.component';
import { SensorsListComponent } from './sensors-list/sensors-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardViewComponent } from './dashboard/dashboard-view/dashboard-view.component';
import { SharedModule } from '../shared/shared.module';
import { DevicesModule } from '../shared/devices/devices.module';
import { DashboardConstructorService } from './dashboard/dashboard-constructor.service';
import { DashboardModule } from '../dashboard/dashboard.module';
import { FileDropDirective, FileSelectDirective } from 'ng2-file-upload';
import { DevicesComponent } from './devices/devices.component';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { CanDeactivateConstructor } from './can-deactivate-constructor';
import { OptionsComponent } from './options/options.component';

@NgModule({
    id: module.id,
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        DevicesModule,
        DashboardModule,
        DragulaModule,
        routing
    ],
    declarations: [
        ConstructorComponent,
        DashboardConstructorComponent,
        MapConstructorComponent,
        SensorsListComponent,
        DashboardViewComponent,
        FileDropDirective,
        FileSelectDirective,
        DevicesComponent,
        OptionsComponent
    ],
    providers: [
        DashboardConstructorService,
        CanDeactivateConstructor
    ]
})
export class ConstructorModule {}
