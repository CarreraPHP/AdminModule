import { Component } from '@angular/core';
import { JhiAlertService } from 'ng-jhipster';
export class JhiAlertComponent {
    /**
     * @param {?} alertService
     */
    constructor(alertService) {
        this.alertService = alertService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.alerts = this.alertService.get();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.alerts = [];
    }
}
JhiAlertComponent.decorators = [
    { type: Component, args: [{
                selector: 'jhi-alert',
                template: `
        <div class="alerts" role="alert">
            <div *ngFor="let alert of alerts" [ngClass]="{\'alert.position\': true, \'toast\': alert.toast}">
                <ngb-alert *ngIf="alert && alert.type && alert.msg" [type]="alert.type" (close)="alert.close(alerts)">
                    <pre [innerHTML]="alert.msg"></pre>
                </ngb-alert>
            </div>
        </div>`
            },] },
];
/**
 * @nocollapse
 */
JhiAlertComponent.ctorParameters = () => [
    { type: JhiAlertService, },
];
function JhiAlertComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    JhiAlertComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    JhiAlertComponent.ctorParameters;
    /** @type {?} */
    JhiAlertComponent.prototype.alerts;
    /** @type {?} */
    JhiAlertComponent.prototype.alertService;
}
//# sourceMappingURL=alert.component.js.map