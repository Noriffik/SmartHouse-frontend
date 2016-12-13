import { Component } from '@angular/core';

@Component({
    selector: 'sh-constructor',
    templateUrl: './constructor.template.html'
})
export class ConstructorComponent {
    public canBeMapActive: boolean = true;
    public canBeDashboardActive: boolean = true;

    public onMapActiveChanged(value: boolean) {
        this.canBeDashboardActive = !value;
    }

    public onDashboardActiveChanged(value: boolean) {
        this.canBeMapActive = !value;
    }
}
