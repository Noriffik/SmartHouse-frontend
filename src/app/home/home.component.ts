import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { ViewInfoDto } from '../shared/view/view.dto';

@Component({
    selector: 'sh-home',
    templateUrl: './home.template.html',
    styleUrls: [ './home.style.scss' ]
})
export class HomeComponent {
    public viewList: Array<ViewInfoDto> = [];
    public currentView: ViewInfoDto;
    public currentSubview: string;
    private activeRouteDataSubscription: Subscription;

    constructor(private activeRoute: ActivatedRoute) {};

    private isSubviewApplicable(subview: string) {
        return this.currentSubview !== subview &&
            this.currentView[subview].active;
    }

    get isMapSubviewActive() {
        return this.currentView && this.currentView.mapSubview.active;
    }

    get isDashboardSubviewActive() {
        return this.currentView && this.currentView.dashboardSubview.active;
    }

    ngOnInit() {
        this.activeRouteDataSubscription = this.activeRoute.data.subscribe(({viewList}) => {
            this.viewList = viewList;
            if (viewList.length > 0) {
                this.setCurrentView(viewList[0]);
            }
        });
    }

    ngOnDestroy() {
        this.activeRouteDataSubscription.unsubscribe();
    }

    setCurrentView(view: ViewInfoDto) {
        this.currentView = view;
        this.setCurrentSubview(view.defaultSubview);
    }

    setCurrentSubview(subview: string) {
        if (this.currentView && this.isSubviewApplicable(subview)) {
            this.currentSubview = subview;
        }
    }
}
