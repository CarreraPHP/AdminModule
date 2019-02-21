import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiHealthService } from './health.service';
import { JhiHealthModalComponent } from './health-modal.component';
export class JhiHealthCheckComponent {
    /**
     * @param {?} modalService
     * @param {?} healthService
     */
    constructor(modalService, healthService) {
        this.modalService = modalService;
        this.healthService = healthService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.refresh();
    }
    /**
     * @param {?} name
     * @return {?}
     */
    baseName(name) {
        return this.healthService.getBaseName(name);
    }
    /**
     * @param {?} statusState
     * @return {?}
     */
    getBadgeClass(statusState) {
        if (statusState === 'UP') {
            return 'badge-success';
        }
        else {
            return 'badge-danger';
        }
    }
    /**
     * @return {?}
     */
    refresh() {
        this.updatingHealth = true;
        this.healthService.checkHealth().subscribe((health) => {
            this.healthData = this.healthService.transformHealthData(health);
            this.updatingHealth = false;
        }, (error) => {
            if (error.status === 503) {
                this.healthData = this.healthService.transformHealthData(error.json());
                this.updatingHealth = false;
            }
        });
    }
    /**
     * @param {?} health
     * @return {?}
     */
    showHealth(health) {
        const /** @type {?} */ modalRef = this.modalService.open(JhiHealthModalComponent);
        modalRef.componentInstance.currentHealth = health;
        modalRef.result.then((result) => {
            // Left blank intentionally, nothing to do here
        }, (reason) => {
            // Left blank intentionally, nothing to do here
        });
    }
    /**
     * @param {?} name
     * @return {?}
     */
    subSystemName(name) {
        return this.healthService.getSubSystemName(name);
    }
}
JhiHealthCheckComponent.decorators = [
    { type: Component, args: [{
                selector: 'jhi-health',
                template: `
      <div>
          <h2>
              <span jhiTranslate="health.title">Health Checks</span>
              <button class="btn btn-primary float-right" (click)="refresh()">
                  <span class="fa fa-refresh"></span> <span jhiTranslate="health.refresh.button">Refresh</span>
              </button>
          </h2>
          <div class="table-responsive">
              <table id="healthCheck" class="table table-striped">
                  <thead>
                      <tr>
                          <th jhiTranslate="health.table.service">Service Name</th>
                          <th class="text-center" jhiTranslate="health.table.status">Status</th>
                          <th class="text-center" jhiTranslate="health.details.details">Details</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr *ngFor="let health of healthData">
                          <td>{{'health.indicator.' + baseName(health.name) | translate}} {{subSystemName(health.name)}}</td>
                          <td class="text-center">
                              <span class="badge" [ngClass]="getBadgeClass(health.status)" jhiTranslate="{{'health.status.' + health.status}}">
                                  {{health.status}}
                              </span>
                          </td>
                          <td class="text-center">
                              <a class="hand" (click)="showHealth(health)" *ngIf="health.details || health.error">
                                  <i class="fa fa-eye"></i>
                              </a>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>
      </div>
    `
            },] },
];
/**
 * @nocollapse
 */
JhiHealthCheckComponent.ctorParameters = () => [
    { type: NgbModal, },
    { type: JhiHealthService, },
];
function JhiHealthCheckComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    JhiHealthCheckComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    JhiHealthCheckComponent.ctorParameters;
    /** @type {?} */
    JhiHealthCheckComponent.prototype.healthData;
    /** @type {?} */
    JhiHealthCheckComponent.prototype.updatingHealth;
    /** @type {?} */
    JhiHealthCheckComponent.prototype.modalService;
    /** @type {?} */
    JhiHealthCheckComponent.prototype.healthService;
}
//# sourceMappingURL=health.component.js.map