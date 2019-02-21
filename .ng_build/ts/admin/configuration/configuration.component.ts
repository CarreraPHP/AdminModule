import { Component, OnInit } from '@angular/core';

import { JhiConfigurationService } from './configuration.service';

@Component({
    selector: 'jhi-configuration',
    template: `
      <div *ngIf="allConfiguration && configuration">
          <h2 jhiTranslate="configuration.title">Configuration</h2>

          <span jhiTranslate="configuration.filter">Filter (by prefix)</span> <input type="text" [(ngModel)]="filter" class="form-control">
          <label>Spring configuration</label>
          <table class="table table-striped table-bordered table-responsive d-table">
              <thead>
              <tr>
                  <th class="w-40" (click)="orderProp = 'prefix'; reverse=!reverse"><span jhiTranslate="configuration.table.prefix">Prefix</span></th>
                  <th class="w-60" (click)="orderProp = 'properties'; reverse=!reverse"><span jhiTranslate="configuration.table.properties">Properties</span></th>
              </tr>
              </thead>
              <tbody>
              <tr *ngFor="let entry of (configuration | pureFilter:filter:'prefix' | orderBy:orderProp:reverse)">
                  <td><span>{{entry.prefix}}</span></td>
                  <td>
                      <div class="row" *ngFor="let key of keys(entry.properties)">
                          <div class="col-md-4">{{key}}</div>
                          <div class="col-md-8">
                              <span class="float-right break">{{entry.properties[key] | json}}</span>
                          </div>
                      </div>
                  </td>
              </tr>
              </tbody>
          </table>
          <div *ngFor="let key of keys(allConfiguration)">
              <label><span>{{key}}</span></label>
              <table class="table table-sm table-striped table-bordered table-responsive d-table">
                  <thead>
                  <tr>
                      <th class="w-40">Property</th>
                      <th class="w-60">Value</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr *ngFor="let item of allConfiguration[key]">
                      <td class="break">{{item.key}}</td>
                      <td class="break">
                          <span class="float-right break">{{item.val}}</span>
                      </td>
                  </tr>
                  </tbody>
              </table>
          </div>
      </div>
    `
})
export class JhiConfigurationComponent implements OnInit {
    allConfiguration: any = null;
    configuration: any = null;
    configKeys: any[];
    filter: string;
    orderProp: string;
    reverse: boolean;

    constructor(
        private configurationService: JhiConfigurationService
    ) {
        this.configKeys = [];
        this.filter = '';
        this.orderProp = 'prefix';
        this.reverse = false;
    }

    keys(dict): Array<string> {
        return (dict === undefined) ? [] : Object.keys(dict);
    }

    ngOnInit() {
        this.configurationService.get().subscribe((configuration) => {
            this.configuration = configuration;

            for (const config of configuration) {
                if (config.properties !== undefined) {
                    this.configKeys.push(Object.keys(config.properties));
                }
            }
        });

        this.configurationService.getEnv().subscribe((configuration) => {
            this.allConfiguration = configuration;
        });
    }
}
