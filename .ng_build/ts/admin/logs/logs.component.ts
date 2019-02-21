import { Component, OnInit } from '@angular/core';

import { Log } from './log.model';
import { LogsService } from './logs.service';

@Component({
    selector: 'jhi-logs',
    template: `
      <div class="table-responsive" *ngIf="loggers">
          <h2 jhiTranslate="logs.title">Logs</h2>

          <p jhiTranslate="logs.nbloggers" translateValues="{total: '{{ loggers.length }}'}">There are {{ loggers.length }} loggers.</p>

          <span jhiTranslate="logs.filter">Filter</span> <input type="text" [(ngModel)]="filter" class="form-control">

          <table class="table table-sm table-striped table-bordered">
              <thead>
              <tr title="click to order">
                  <th (click)="orderProp = 'name'; reverse=!reverse"><span jhiTranslate="logs.table.name">Name</span></th>
                  <th (click)="orderProp = 'level'; reverse=!reverse"><span jhiTranslate="logs.table.level">Level</span></th>
              </tr>
              </thead>

              <tr *ngFor="let logger of (loggers | pureFilter:filter:'name' | orderBy:orderProp:reverse)">
                  <td><small>{{logger.name | slice:0:140}}</small></td>
                  <td>
                      <button (click)="changeLevel(logger.name, 'TRACE')" [ngClass]="(logger.level=='TRACE') ? 'btn-danger' : 'btn-secondary'" class="btn btn-sm">TRACE</button>
                      <button (click)="changeLevel(logger.name, 'DEBUG')" [ngClass]="(logger.level=='DEBUG') ? 'btn-warning' : 'btn-secondary'" class="btn btn-sm">DEBUG</button>
                      <button (click)="changeLevel(logger.name, 'INFO')" [ngClass]="(logger.level=='INFO') ? 'btn-info' : 'btn-secondary'" class="btn btn-sm">INFO</button>
                      <button (click)="changeLevel(logger.name, 'WARN')" [ngClass]="(logger.level=='WARN') ? 'btn-success' : 'btn-secondary'" class="btn btn-sm">WARN</button>
                      <button (click)="changeLevel(logger.name, 'ERROR')" [ngClass]="(logger.level=='ERROR') ? 'btn-primary' : 'btn-secondary'" class="btn btn-sm">ERROR</button>
                  </td>
              </tr>
          </table>
      </div>
    `,
})
export class LogsComponent implements OnInit {

    loggers: Log[];
    filter: string;
    orderProp: string;
    reverse: boolean;

    constructor(
        private logsService: LogsService
    ) {
        this.filter = '';
        this.orderProp = 'name';
        this.reverse = false;
    }

    ngOnInit() {
        this.logsService.findAll().subscribe((loggers) => this.loggers = loggers);
    }

    changeLevel(name: string, level: string) {
        const log = new Log(name, level);
        this.logsService.changeLevel(log).subscribe(() => {
            this.logsService.findAll().subscribe((loggers) => this.loggers = loggers);
        });
    }
}
