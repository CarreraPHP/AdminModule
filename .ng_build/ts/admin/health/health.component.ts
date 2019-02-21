import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { JhiHealthService } from './health.service';
import { JhiHealthModalComponent } from './health-modal.component';

@Component({
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
})
export class JhiHealthCheckComponent implements OnInit {
    healthData: any;
    updatingHealth: boolean;

    constructor(
        private modalService: NgbModal,
        private healthService: JhiHealthService
    ) {

    }

    ngOnInit() {
        this.refresh();
    }

    baseName(name: string) {
        return this.healthService.getBaseName(name);
    }

    getBadgeClass(statusState) {
        if (statusState === 'UP') {
            return 'badge-success';
        } else {
            return 'badge-danger';
        }
    }

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

    showHealth(health: any) {
        const modalRef  = this.modalService.open(JhiHealthModalComponent);
        modalRef.componentInstance.currentHealth = health;
        modalRef.result.then((result) => {
            // Left blank intentionally, nothing to do here
        }, (reason) => {
            // Left blank intentionally, nothing to do here
        });
    }

    subSystemName(name: string) {
        return this.healthService.getSubSystemName(name);
    }

}
