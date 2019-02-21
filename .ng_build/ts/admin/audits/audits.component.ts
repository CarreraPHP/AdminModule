import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { JhiParseLinks } from 'ng-jhipster';

import { Audit } from './audit.model';
import { AuditsService } from './audits.service';
import { ITEMS_PER_PAGE } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
  selector: 'jhi-audit',
  template: `
    <div *ngIf="audits">
        <h2 jhiTranslate="audits.title">Audits</h2>

        <div class="row">
            <div class="col-md-5">
                <h4 jhiTranslate="audits.filter.title">Filter by date</h4>
                <p class="d-flex">
                    <span jhiTranslate="audits.filter.from" class="input-group-addon">from</span>
                    <input type="date" class="form-control" name="start" [(ngModel)]="fromDate" (ngModelChange)="onChangeDate($event)" required/>
                    <span jhiTranslate="audits.filter.to" class="input-group-addon">to</span>
                    <input type="date" class="form-control" name="end" [(ngModel)]="toDate" (ngModelChange)="onChangeDate($event)" required/>
                </p>
            </div>
        </div>

        <div class="table-responsive">
            <table class="table table-sm table-striped table-bordered">
                <thead>
                <tr>
                    <th (click)="orderProp = 'timestamp'; reverse=!reverse"><span jhiTranslate="audits.table.header.date">Date</span></th>
                    <th (click)="orderProp = 'principal'; reverse=!reverse"><span jhiTranslate="audits.table.header.principal">User</span></th>
                    <th (click)="orderProp = 'type'; reverse=!reverse"><span jhiTranslate="audits.table.header.status">State</span></th>
                    <th (click)="orderProp = 'data.message'; reverse=!reverse"><span jhiTranslate="audits.table.header.data">Extra data</span></th>
                </tr>
                </thead>
                <tr *ngFor="let audit of getAudits()">
                    <td><span>{{audit.timestamp| date:'medium'}}</span></td>
                    <td><small>{{audit.principal}}</small></td>
                    <td>{{audit.type}}</td>
                    <td>
                        <span *ngIf="audit.data" ng-show="audit.data.message">{{audit.data.message}}</span>
                        <span *ngIf="audit.data" ng-show="audit.data.remoteAddress"><span jhiTranslate="audits.table.data.remoteAddress">Remote Address</span> {{audit.data.remoteAddress}}</span>
                    </td>
                </tr>
            </table>
        </div>
        <div *ngIf="audits">
            <div class="row justify-content-center">
                <jhi-item-count [page]="page" [total]="totalItems" [itemsPerPage]="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <ngb-pagination [collectionSize]="totalItems" [(page)]="page" (pageChange)="loadPage(page)"></ngb-pagination>
            </div>
        </div>
    </div>
  `
})
export class AuditsComponent implements OnInit {
    audits: Audit[];
    fromDate: string;
    itemsPerPage: any;
    links: any;
    page: number;
    orderProp: string;
    reverse: boolean;
    toDate: string;
    totalItems: number;

    constructor(
        private auditsService: AuditsService,
        private parseLinks: JhiParseLinks,
        private paginationConfig: PaginationConfig,
        private datePipe: DatePipe
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 1;
        this.reverse = false;
        this.orderProp = 'timestamp';
    }

    getAudits() {
        return this.sortAudits(this.audits);
    }

    loadPage(page: number) {
        this.page = page;
        this.onChangeDate();
    }

    ngOnInit() {
        this.today();
        this.previousMonth();
        this.onChangeDate();
    }

    onChangeDate() {
        this.auditsService.query({page: this.page - 1, size: this.itemsPerPage,
            fromDate: this.fromDate, toDate: this.toDate}).subscribe((res) => {

            this.audits = res.json();
            this.links = this.parseLinks.parse(res.headers.get('link'));
            this.totalItems = + res.headers.get('X-Total-Count');
        });
    }

    previousMonth() {
        const dateFormat = 'yyyy-MM-dd';
        let fromDate: Date = new Date();

        if (fromDate.getMonth() === 0) {
            fromDate = new Date(fromDate.getFullYear() - 1, 11, fromDate.getDate());
        } else {
            fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth() - 1, fromDate.getDate());
        }

        this.fromDate = this.datePipe.transform(fromDate, dateFormat);
    }

    today() {
        const dateFormat = 'yyyy-MM-dd';
        // Today + 1 day - needed if the current day must be included
        const today: Date = new Date();
        today.setDate(today.getDate() + 1);
        const date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        this.toDate = this.datePipe.transform(date, dateFormat);
    }

    private sortAudits(audits: Audit[]) {
        audits = audits.slice(0).sort((a, b) => {
            if (a[this.orderProp] < b[this.orderProp]) {
                return -1;
            } else if ([b[this.orderProp] < a[this.orderProp]]) {
                return 1;
            } else {
                return 0;
            }
        });

        return this.reverse ? audits.reverse() : audits;
    }
}
