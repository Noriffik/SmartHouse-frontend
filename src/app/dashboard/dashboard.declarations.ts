import { DashboardComponent } from './dashboard.component';
import { DashboardEditorComponent } from './dashboard-editor/dashboard-editor.component';
import { SensorRegularWidgetComponent } from './sensor-regular-widget/sensor-regular-widget.component';
import { SensorWidgetComponent } from './sensor-widget/sensor-widget.component';
import {
    SensorExecutorWidgetComponent
} from './sensor-executor-widget/sensor-executor-widget.component';
import { SensorServoWidgetComponent } from './sensor-servo-widget/sensor-servo-widget.component';
import { SensorStatusWidgetComponent } from './sensor-status-widget/sensor-status-widget.component';
import { GaugeComponent } from './shared/gauge/gauge.component';

export default [
    DashboardComponent,
    DashboardEditorComponent,
    SensorWidgetComponent,
    SensorRegularWidgetComponent,
    SensorExecutorWidgetComponent,
    SensorServoWidgetComponent,
    SensorStatusWidgetComponent,
    GaugeComponent
];
