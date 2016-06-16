import {EventEmitter} from 'angular2/core';
import {Component} from 'angular2/core';
import template from './scenario-wizard.html';
import style from './scenario-wizard.scss';
const selector = 'scenario-wizard';

@Component({
    selector,
    template,
    styles: [style],
    inputs: ['scenario'],
    outputs: [
        'onAddCriteria',
        'onRemoveCriteria',
        'onAddAction',
        'onRemoveAction'
    ]
})

export class ScenarioWizardComponent {
    constructor() {
        this.onAddCriteria = new EventEmitter();
        this.onRemoveCriteria = new EventEmitter();
        this.onAddAction = new EventEmitter();
        this.onRemoveAction = new EventEmitter();
    }

    addCriteria() {
        this.onAddCriteria.next();
    }

    removeCriteria(index) {
        this.onRemoveCriteria.emit(index);
    }

    addAction() {
        this.onAddAction.next();
    }

    removeAction(index) {
        this.onRemoveAction.emit(index);
    }

    removeActionBtnVisible() {
        return this.scenario.actions.length > 1;
    }
}
