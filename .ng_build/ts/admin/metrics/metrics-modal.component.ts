import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-metrics-modal',
    template: `
      <!-- Modal used to display the threads dump -->
      <div class="modal-header">
          <h4 class="modal-title" jhiTranslate="metrics.jvm.threads.dump.title">Threads dump</h4>
          <button type="button" class="close" (click)="activeModal.dismiss('closed')">&times;</button>
      </div>
      <div class="modal-body">
          <span class="badge badge-primary" (click)="threadDumpFilter = {}">All&nbsp;<span class="badge badge-pill badge-default">{{threadDumpAll}}</span></span>&nbsp;
          <span class="badge badge-success" (click)="threadDumpFilter = {threadState: 'RUNNABLE'}">Runnable&nbsp;<span class="badge badge-pill badge-default">{{threadDumpRunnable}}</span></span>&nbsp;
          <span class="badge badge-info" (click)="threadDumpFilter = {threadState: 'WAITING'}">Waiting&nbsp;<span class="badge badge-pill badge-default">{{threadDumpWaiting}}</span></span>&nbsp;
          <span class="badge badge-warning" (click)="threadDumpFilter = {threadState: 'TIMED_WAITING'}">Timed Waiting&nbsp;<span class="badge badge-pill badge-default">{{threadDumpTimedWaiting}}</span></span>&nbsp;
          <span class="badge badge-danger" (click)="threadDumpFilter = {threadState: 'BLOCKED'}">Blocked&nbsp;<span class="badge badge-pill badge-default">{{threadDumpBlocked}}</span></span>&nbsp;
          <div class="mt-2">&nbsp;</div>
          Filter
          <input type="text" [(ngModel)]="threadDumpFilter" class="form-control">
          <div class="pad" *ngFor="let entry of threadDump | pureFilter:threadDumpFilter:'lockName' | keys">
              <h6>
                  <span class="badge" [ngClass]="getBadgeClass(entry.value.threadState)">{{entry.value.threadState}}</span>&nbsp;{{entry.value.threadName}} (ID {{entry.value.threadId}})
                  <a (click)="entry.show = !entry.show" href="javascript:void(0);">
                     <span [hidden]="entry.show" jhiTranslate="metrics.jvm.threads.dump.show">Show StackTrace</span>
                     <span [hidden]="!entry.show" jhiTranslate="metrics.jvm.threads.dump.hide">Hide StackTrace</span>
                  </a>
              </h6>
              <div class="card" [hidden]="!entry.show">
                  <div class="card-body">
                      <div *ngFor="let st of entry.value.stackTrace | keys" class="break">
                          <samp>{{st.value.className}}.{{st.value.methodName}}(<code>{{st.value.fileName}}:{{st.value.lineNumber}}</code>)</samp>
                          <span class="mt-1"></span>
                      </div>
                  </div>
              </div>
              <table class="table table-sm table-responsive">
                  <thead>
                      <tr>
                          <th class="text-right" jhiTranslate="metrics.jvm.threads.dump.blockedtime">Blocked Time</th>
                          <th class="text-right" jhiTranslate="metrics.jvm.threads.dump.blockedcount">Blocked Count</th>
                          <th class="text-right" jhiTranslate="metrics.jvm.threads.dump.waitedtime">Waited Time</th>
                          <th class="text-right" jhiTranslate="metrics.jvm.threads.dump.waitedcount">Waited Count</th>
                          <th jhiTranslate="metrics.jvm.threads.dump.lockname">Lock Name</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>{{entry.value.blockedTime}}</td>
                          <td>{{entry.value.blockedCount}}</td>
                          <td>{{entry.value.waitedTime}}</td>
                          <td>{{entry.value.waitedCount}}</td>
                          <td><code>{{entry.value.lockName}}</code></td>
                      </tr>
                  </tbody>
              </table>

          </div>
      </div>
      <div class="modal-footer">
          <button type="button" class="btn btn-secondary float-left" data-dismiss="modal" (click)="activeModal.dismiss('closed')">Done</button>
      </div>
    `
})
export class JhiMetricsMonitoringModalComponent implements OnInit {

    threadDumpFilter: any;
    threadDump: any;
    threadDumpAll = 0;
    threadDumpBlocked = 0;
    threadDumpRunnable = 0;
    threadDumpTimedWaiting = 0;
    threadDumpWaiting = 0;

    constructor(public activeModal: NgbActiveModal) {}

    ngOnInit() {
        this.threadDump.forEach((value) => {
            if (value.threadState === 'RUNNABLE') {
                this.threadDumpRunnable += 1;
            } else if (value.threadState === 'WAITING') {
                this.threadDumpWaiting += 1;
            } else if (value.threadState === 'TIMED_WAITING') {
                this.threadDumpTimedWaiting += 1;
            } else if (value.threadState === 'BLOCKED') {
                this.threadDumpBlocked += 1;
            }
        });

        this.threadDumpAll = this.threadDumpRunnable + this.threadDumpWaiting +
            this.threadDumpTimedWaiting + this.threadDumpBlocked;
    }

    getBadgeClass(threadState) {
        if (threadState === 'RUNNABLE') {
            return 'badge-success';
        } else if (threadState === 'WAITING') {
            return 'badge-info';
        } else if (threadState === 'TIMED_WAITING') {
            return 'badge-warning';
        } else if (threadState === 'BLOCKED') {
            return 'badge-danger';
        }
    }
}
