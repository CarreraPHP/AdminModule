import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiMetricsMonitoringModalComponent } from './metrics-modal.component';
import { JhiMetricsService } from './metrics.service';
export class JhiMetricsMonitoringComponent {
    /**
     * @param {?} modalService
     * @param {?} metricsService
     */
    constructor(modalService, metricsService) {
        this.modalService = modalService;
        this.metricsService = metricsService;
        this.metrics = {};
        this.cachesStats = {};
        this.servicesStats = {};
        this.updatingMetrics = true;
        this.JCACHE_KEY = 'jcache.statistics';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.refresh();
    }
    /**
     * @return {?}
     */
    refresh() {
        this.updatingMetrics = true;
        this.metricsService.getMetrics().subscribe((metrics) => {
            this.metrics = metrics;
            this.updatingMetrics = false;
            this.servicesStats = {};
            this.cachesStats = {};
            Object.keys(metrics.timers).forEach((key) => {
                const /** @type {?} */ value = metrics.timers[key];
                if (key.indexOf('web.rest') !== -1 || key.indexOf('service') !== -1) {
                    this.servicesStats[key] = value;
                }
            });
            Object.keys(metrics.gauges).forEach((key) => {
                if (key.indexOf('jcache.statistics') !== -1) {
                    const /** @type {?} */ value = metrics.gauges[key].value;
                    // remove gets or puts
                    const /** @type {?} */ index = key.lastIndexOf('.');
                    const /** @type {?} */ newKey = key.substr(0, index);
                    // Keep the name of the domain
                    this.cachesStats[newKey] = {
                        'name': this.JCACHE_KEY.length,
                        'value': value
                    };
                }
            });
        });
    }
    /**
     * @return {?}
     */
    refreshThreadDumpData() {
        this.metricsService.threadDump().subscribe((data) => {
            const /** @type {?} */ modalRef = this.modalService.open(JhiMetricsMonitoringModalComponent, { size: 'lg' });
            modalRef.componentInstance.threadDump = data;
            modalRef.result.then((result) => {
                // Left blank intentionally, nothing to do here
            }, (reason) => {
                // Left blank intentionally, nothing to do here
            });
        });
    }
    /**
     * @param {?} input
     * @return {?}
     */
    filterNaN(input) {
        if (isNaN(input)) {
            return 0;
        }
        return input;
    }
}
JhiMetricsMonitoringComponent.decorators = [
    { type: Component, args: [{
                selector: 'jhi-metrics',
                template: `
      <div>
          <h2>
              <span jhiTranslate="metrics.title">Application Metrics</span>
              <button class="btn btn-primary float-right" (click)="refresh()">
                  <span class="fa fa-refresh"></span> <span jhiTranslate="metrics.refresh.button">Refresh</span>
              </button>
          </h2>

          <h3 jhiTranslate="metrics.jvm.title">JVM Metrics</h3>
          <div class="row" *ngIf="!updatingMetrics">
              <div class="col-md-4">
                  <b jhiTranslate="metrics.jvm.memory.title">Memory</b>
                  <p><span jhiTranslate="metrics.jvm.memory.total">Total Memory</span> ({{metrics.gauges['jvm.memory.total.used'].value / 1000000 | number:'1.0-0'}}M / {{metrics.gauges['jvm.memory.total.max'].value / 1000000 | number:'1.0-0'}}M)</p>
                  <ngb-progressbar type="success" [max]="metrics.gauges['jvm.memory.total.max'].value" [value]="metrics.gauges['jvm.memory.total.used'].value" [striped]="true" [animated]="true">
                      <span>{{metrics.gauges['jvm.memory.total.used'].value * 100 / metrics.gauges['jvm.memory.total.max'].value  | number:'1.0-0'}}%</span>
                  </ngb-progressbar>
                  <p><span jhiTranslate="metrics.jvm.memory.heap">Heap Memory</span> ({{metrics.gauges['jvm.memory.heap.used'].value / 1000000 | number:'1.0-0'}}M / {{metrics.gauges['jvm.memory.heap.max'].value / 1000000 | number:'1.0-0'}}M)</p>
                  <ngb-progressbar [max]="metrics.gauges['jvm.memory.heap.max'].value" [value]="metrics.gauges['jvm.memory.heap.used'].value" [striped]="true" [animated]="true" type="success">
                      <span>{{metrics.gauges['jvm.memory.heap.used'].value * 100 / metrics.gauges['jvm.memory.heap.max'].value  | number:'1.0-0'}}%</span>
                  </ngb-progressbar>
                  <p><span jhiTranslate="metrics.jvm.memory.nonheap">Non-Heap Memory</span> ({{metrics.gauges['jvm.memory.non-heap.used'].value / 1000000 | number:'1.0-0'}}M / {{metrics.gauges['jvm.memory.non-heap.committed'].value / 1000000 | number:'1.0-0'}}M)</p>
                  <ngb-progressbar [max]="metrics.gauges['jvm.memory.non-heap.committed'].value" [value]="metrics.gauges['jvm.memory.non-heap.used'].value" [striped]="true" [animated]="true" type="success">
                      <span>{{metrics.gauges['jvm.memory.non-heap.used'].value * 100 / metrics.gauges['jvm.memory.non-heap.committed'].value  | number:'1.0-0'}}%</span>
                  </ngb-progressbar>
              </div>
              <div class="col-md-4">
                  <b jhiTranslate="metrics.jvm.threads.title">Threads</b> (Total: {{metrics.gauges['jvm.threads.count'].value}}) <a class="hand" (click)="refreshThreadDumpData()" data-toggle="modal" data-target="#threadDump"><i class="fa fa-eye"></i></a>
                  <p><span jhiTranslate="metrics.jvm.threads.runnable">Runnable</span> {{metrics.gauges['jvm.threads.runnable.count'].value}}</p>
                  <ngb-progressbar [value]="metrics.gauges['jvm.threads.runnable.count'].value" [max]="metrics.gauges['jvm.threads.count'].value" [striped]="true" [animated]="true" type="success">
                      <span>{{metrics.gauges['jvm.threads.runnable.count'].value * 100 / metrics.gauges['jvm.threads.count'].value  | number:'1.0-0'}}%</span>
                  </ngb-progressbar>
                  <p><span jhiTranslate="metrics.jvm.threads.timedwaiting">Timed Waiting</span> ({{metrics.gauges['jvm.threads.timed_waiting.count'].value}})</p>
                  <ngb-progressbar [value]="metrics.gauges['jvm.threads.timed_waiting.count'].value" [max]="metrics.gauges['jvm.threads.count'].value" [striped]="true" [animated]="true" type="warning">
                      <span>{{metrics.gauges['jvm.threads.timed_waiting.count'].value * 100 / metrics.gauges['jvm.threads.count'].value  | number:'1.0-0'}}%</span>
                  </ngb-progressbar>
                  <p><span jhiTranslate="metrics.jvm.threads.waiting">Waiting</span> ({{metrics.gauges['jvm.threads.waiting.count'].value}})</p>
                  <ngb-progressbar [value]="metrics.gauges['jvm.threads.waiting.count'].value" [max]="metrics.gauges['jvm.threads.count'].value" [striped]="true" [animated]="true" type="warning">
                      <span>{{metrics.gauges['jvm.threads.waiting.count'].value * 100 / metrics.gauges['jvm.threads.count'].value  | number:'1.0-0'}}%</span>
                  </ngb-progressbar>
                  <p><span jhiTranslate="metrics.jvm.threads.blocked">Blocked</span> ({{metrics.gauges['jvm.threads.blocked.count'].value}})</p>
                  <ngb-progressbar [value]="metrics.gauges['jvm.threads.blocked.count'].value" [max]="metrics.gauges['jvm.threads.count'].value" [striped]="true" [animated]="true" type="success">
                      <span>{{metrics.gauges['jvm.threads.blocked.count'].value * 100 / metrics.gauges['jvm.threads.count'].value  | number:'1.0-0'}}%</span>
                  </ngb-progressbar>
              </div>
              <div class="col-md-4">
                  <b jhiTranslate="metrics.jvm.gc.title">Garbage collections</b>
                  <div class="row" *ngIf="metrics.gauges['jvm.garbage.PS-MarkSweep.count']">
                      <div class="col-md-9" jhiTranslate="metrics.jvm.gc.marksweepcount">Mark Sweep count</div>
                      <div class="col-md-3 text-right">{{metrics.gauges['jvm.garbage.PS-MarkSweep.count'].value}}</div>
                  </div>
                  <div class="row" *ngIf="metrics.gauges['jvm.garbage.PS-MarkSweep.time']">
                      <div class="col-md-9" jhiTranslate="metrics.jvm.gc.marksweeptime">Mark Sweep time</div>
                      <div class="col-md-3 text-right">{{metrics.gauges['jvm.garbage.PS-MarkSweep.time'].value}}ms</div>
                  </div>
                  <div class="row" *ngIf="metrics.gauges['jvm.garbage.PS-Scavenge.count']">
                      <div class="col-md-9" jhiTranslate="metrics.jvm.gc.scavengecount">Scavenge count</div>
                      <div class="col-md-3 text-right">{{metrics.gauges['jvm.garbage.PS-Scavenge.count'].value}}</div>
                  </div>
                  <div class="row" *ngIf="metrics.gauges['jvm.garbage.PS-Scavenge.time']">
                      <div class="col-md-9" jhiTranslate="metrics.jvm.gc.scavengetime">Scavenge time</div>
                      <div class="col-md-3 text-right">{{metrics.gauges['jvm.garbage.PS-Scavenge.time'].value}}ms</div>
                  </div>
              </div>
          </div>
          <div class="well well-lg" *ngIf="updatingMetrics" jhiTranslate="metrics.updating">Updating...</div>

          <h3 jhiTranslate="metrics.jvm.http.title">HTTP requests (events per second)</h3>
          <p *ngIf="metrics.counters">
              <span jhiTranslate="metrics.jvm.http.active">Active requests</span> <b>{{metrics.counters['com.codahale.metrics.servlet.InstrumentedFilter.activeRequests'].count | number:'1.0-0'}}</b> - <span jhiTranslate="metrics.jvm.http.total">Total requests</span> <b>{{metrics.timers['com.codahale.metrics.servlet.InstrumentedFilter.requests'].count | number:'1.0-0'}}</b>
          </p>
          <div class="table-responsive" *ngIf="!updatingMetrics">
              <table class="table table-striped">
                  <thead>
                  <tr>
                      <th jhiTranslate="metrics.jvm.http.table.code">Code</th>
                      <th jhiTranslate="metrics.jvm.http.table.count">Count</th>
                      <th class="text-right" jhiTranslate="metrics.jvm.http.table.mean">Mean</th>
                      <th class="text-right"><span jhiTranslate="metrics.jvm.http.table.average">Average</span> (1 min)</th>
                      <th class="text-right"><span jhiTranslate="metrics.jvm.http.table.average">Average</span> (5 min)</th>
                      <th class="text-right"><span jhiTranslate="metrics.jvm.http.table.average">Average</span> (15 min)</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                      <td jhiTranslate="metrics.jvm.http.code.ok">OK</td>
                      <td>
                          <ngb-progressbar [max]="metrics.timers['com.codahale.metrics.servlet.InstrumentedFilter.requests'].count" [value]="metrics.meters['com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.ok'].count" [striped]="true" [animated]="true" type="success">
                              <span>{{metrics.meters['com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.ok'].count}}</span>
                          </ngb-progressbar>
                      </td>
                      <td class="text-right">
                          {{filterNaN(metrics.meters['com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.ok'].mean_rate) | number:'1.0-2'}}
                      </td>
                      <td class="text-right">
                          {{filterNaN(metrics.meters['com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.ok'].m1_rate) | number:'1.0-2'}}
                      </td>
                      <td class="text-right">
                          {{filterNaN(metrics.meters['com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.ok'].m5_rate) | number:'1.0-2'}}
                      </td>
                      <td class="text-right">
                          {{filterNaN(metrics.meters['com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.ok'].m15_rate) | number:'1.0-2'}}
                      </td>
                  </tr>
                  <tr>
                      <td jhiTranslate="metrics.jvm.http.code.notfound">Not Found</td>
                      <td>
                          <ngb-progressbar [max]="metrics.timers['com.codahale.metrics.servlet.InstrumentedFilter.requests'].count" [value]="metrics.meters['com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.notFound'].count" [striped]="true" [animated]="true" type="success">
                              <span>{{metrics.meters['com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.notFound'].count}}</span>
                          </ngb-progressbar>
                      </td>
                      <td class="text-right">
                          {{filterNaN(metrics.meters['com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.notFound'].mean_rate) | number:'1.0-2'}}
                      </td>
                      <td class="text-right">
                          {{filterNaN(metrics.meters['com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.notFound'].m1_rate) | number:'1.0-2'}}
                      </td>
                      <td class="text-right">
                          {{filterNaN(metrics.meters['com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.notFound'].m5_rate) | number:'1.0-2'}}
                      </td>
                      <td class="text-right">
                          {{filterNaN(metrics.meters['com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.notFound'].m15_rate) | number:'1.0-2'}}
                      </td>
                  </tr>
                  <tr>
                      <td jhiTranslate="metrics.jvm.http.code.servererror">Server error</td>
                      <td>
                          <ngb-progressbar [max]="metrics.timers['com.codahale.metrics.servlet.InstrumentedFilter.requests'].count" [value]="metrics.meters['com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.serverError'].count" [striped]="true" [animated]="true" type="success">
                              <span>{{metrics.meters['com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.serverError'].count}}</span>
                          </ngb-progressbar>
                      </td>
                      <td class="text-right">
                          {{filterNaN(metrics.meters['com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.serverError'].mean_rate) | number:'1.0-2'}}
                      </td>
                      <td class="text-right">
                          {{filterNaN(metrics.meters['com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.serverError'].m1_rate) | number:'1.0-2'}}
                      </td>
                      <td class="text-right">
                          {{filterNaN(metrics.meters['com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.serverError'].m5_rate) | number:'1.0-2'}}
                      </td>
                      <td class="text-right">
                          {{filterNaN(metrics.meters['com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.serverError'].m15_rate) | number:'1.0-2'}}
                      </td>
                  </tr>
                  </tbody>
              </table>
          </div>

          <h3 jhiTranslate="metrics.servicesstats.title">Services statistics (time in millisecond)</h3>
          <div class="table-responsive" *ngIf="!updatingMetrics">
              <table class="table table-striped">
                  <thead>
                  <tr>
                      <th jhiTranslate="metrics.servicesstats.table.name">Service name</th>
                      <th class="text-right" jhiTranslate="metrics.servicesstats.table.count">Count</th>
                      <th class="text-right" jhiTranslate="metrics.servicesstats.table.mean">Mean</th>
                      <th class="text-right" jhiTranslate="metrics.servicesstats.table.min">Min</th>
                      <th class="text-right" jhiTranslate="metrics.servicesstats.table.p50">p50</th>
                      <th class="text-right" jhiTranslate="metrics.servicesstats.table.p75">p75</th>
                      <th class="text-right" jhiTranslate="metrics.servicesstats.table.p95">p95</th>
                      <th class="text-right" jhiTranslate="metrics.servicesstats.table.p99">p99</th>
                      <th class="text-right" jhiTranslate="metrics.servicesstats.table.max">Max</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr *ngFor="let entry of servicesStats | keys">
                      <td>{{entry.key}}</td>
                      <td class="text-right">{{entry.value.count}}</td>
                      <td class="text-right">{{entry.value.mean * 1000 | number:'1.0-0'}}</td>
                      <td class="text-right">{{entry.value.min * 1000 | number:'1.0-0'}}</td>
                      <td class="text-right">{{entry.value.p50 * 1000 | number:'1.0-0'}}</td>
                      <td class="text-right">{{entry.value.p75 * 1000 | number:'1.0-0'}}</td>
                      <td class="text-right">{{entry.value.p95 * 1000 | number:'1.0-0'}}</td>
                      <td class="text-right">{{entry.value.p99 * 1000 | number:'1.0-0'}}</td>
                      <td class="text-right">{{entry.value.max * 1000 | number:'1.0-0'}}</td>
                  </tr>
                  </tbody>
              </table>
          </div>
    
          <h3 jhiTranslate="metrics.datasource.title" *ngIf="metrics.gauges && metrics.gauges['HikariPool-1.pool.TotalConnections'] && metrics.gauges['HikariPool-1.pool.TotalConnections'].value > 0">DataSource statistics (time in millisecond)</h3>
          <div class="table-responsive" *ngIf="!updatingMetrics && metrics.gauges && metrics.gauges['HikariPool-1.pool.TotalConnections'] && metrics.gauges['HikariPool-1.pool.TotalConnections'].value > 0">
              <table class="table table-striped">
                  <thead>
                      <tr>
                          <th><span jhiTranslate="metrics.datasource.usage">Usage</span> ({{metrics.gauges['HikariPool-1.pool.ActiveConnections'].value}} / {{metrics.gauges['HikariPool-1.pool.TotalConnections'].value}})</th>
                          <th class="text-right" jhiTranslate="metrics.datasource.count">Count</th>
                          <th class="text-right" jhiTranslate="metrics.datasource.mean">Mean</th>
                          <th class="text-right" jhiTranslate="metrics.datasource.min">Min</th>
                          <th class="text-right" jhiTranslate="metrics.datasource.p50">p50</th>
                          <th class="text-right" jhiTranslate="metrics.datasource.p75">p75</th>
                          <th class="text-right" jhiTranslate="metrics.datasource.p95">p95</th>
                          <th class="text-right" jhiTranslate="metrics.datasource.p99">p99</th>
                          <th class="text-right" jhiTranslate="metrics.datasource.max">Max</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>
                              <div class="progress progress-striped">
                                  <ngb-progressbar [max]="metrics.gauges['HikariPool-1.pool.TotalConnections'].value" [value]="metrics.gauges['HikariPool-1.pool.ActiveConnections'].value" [striped]="true" [animated]="true" type="success">
                                      <span>{{metrics.gauges['HikariPool-1.pool.ActiveConnections'].value * 100 / metrics.gauges['HikariPool-1.pool.TotalConnections'].value  | number:'1.0-0'}}%</span>
                                  </ngb-progressbar>
                              </div>
                          </td>
                          <td class="text-right">{{metrics.histograms['HikariPool-1.pool.Usage'].count}}</td>
                          <td class="text-right">{{filterNaN(metrics.histograms['HikariPool-1.pool.Usage'].mean) | number:'1.0-2'}}</td>
                          <td class="text-right">{{filterNaN(metrics.histograms['HikariPool-1.pool.Usage'].min) | number:'1.0-2'}}</td>
                          <td class="text-right">{{filterNaN(metrics.histograms['HikariPool-1.pool.Usage'].p50) | number:'1.0-2'}}</td>
                          <td class="text-right">{{filterNaN(metrics.histograms['HikariPool-1.pool.Usage'].p75) | number:'1.0-2'}}</td>
                          <td class="text-right">{{filterNaN(metrics.histograms['HikariPool-1.pool.Usage'].p95) | number:'1.0-2'}}</td>
                          <td class="text-right">{{filterNaN(metrics.histograms['HikariPool-1.pool.Usage'].p99) | number:'1.0-2'}}</td>
                          <td class="text-right">{{filterNaN(metrics.histograms['HikariPool-1.pool.Usage'].max) | number:'1.0-2'}}</td>
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
JhiMetricsMonitoringComponent.ctorParameters = () => [
    { type: NgbModal, },
    { type: JhiMetricsService, },
];
function JhiMetricsMonitoringComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    JhiMetricsMonitoringComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    JhiMetricsMonitoringComponent.ctorParameters;
    /** @type {?} */
    JhiMetricsMonitoringComponent.prototype.metrics;
    /** @type {?} */
    JhiMetricsMonitoringComponent.prototype.cachesStats;
    /** @type {?} */
    JhiMetricsMonitoringComponent.prototype.servicesStats;
    /** @type {?} */
    JhiMetricsMonitoringComponent.prototype.updatingMetrics;
    /** @type {?} */
    JhiMetricsMonitoringComponent.prototype.JCACHE_KEY;
    /** @type {?} */
    JhiMetricsMonitoringComponent.prototype.modalService;
    /** @type {?} */
    JhiMetricsMonitoringComponent.prototype.metricsService;
}
//# sourceMappingURL=metrics.component.js.map