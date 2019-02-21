import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { JhiHealthService } from './health.service';

@Component({
    selector: 'jhi-health-modal',
    template: `
      <div class="modal-header">
          <h4 class="modal-title" id="showHealthLabel">
      		{{'health.indicator.' + baseName(currentHealth.name) | translate}}
              {{subSystemName(currentHealth.name)}}
          </h4>
          <button aria-label="Close" data-dismiss="modal" class="close" type="button" (click)="activeModal.dismiss('closed')"><span aria-hidden="true">&times;</span>
          </button>
      </div>
      <div class="modal-body pad">
          <div *ngIf="currentHealth.details">
              <h5 jhiTranslate="health.details.properties">Properties</h5>
              <div class="table-responsive">
                  <table class="table table-striped">
                      <thead>
                          <tr>
                              <th class="text-left" jhiTranslate="health.details.name">Name</th>
                              <th class="text-left" jhiTranslate="health.details.value">Value</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr *ngFor="let entry of currentHealth.details | keys">
                              <td class="text-left">{{entry.key}}</td>
                              <td class="text-left">{{readableValue(entry.value)}}</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
          <div *ngIf="currentHealth.error">
              <h4 jhiTranslate="health.details.error">Error</h4>
                  <pre>{{currentHealth.error}}</pre>
          </div>
      </div>
      <div class="modal-footer">
          <button data-dismiss="modal" class="btn btn-secondary float-left" type="button" (click)="activeModal.dismiss('closed')">Done</button>
      </div>
    `
})
export class JhiHealthModalComponent {

    currentHealth: any;

    constructor(private healthService: JhiHealthService, public activeModal: NgbActiveModal) {}

    baseName(name) {
        return this.healthService.getBaseName(name);
    }

    subSystemName(name) {
        return this.healthService.getSubSystemName(name);
    }

    readableValue(value: number) {
        if (this.currentHealth.name !== 'diskSpace') {
            return value.toString();
        }

        // Should display storage space in an human readable unit
        const val = value / 1073741824;
        if (val > 1) { // Value
            return val.toFixed(2) + ' GB';
        } else {
            return (value / 1048576).toFixed(2) + ' MB';
        }
    }
}
