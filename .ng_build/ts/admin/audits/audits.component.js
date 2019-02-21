import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { JhiParseLinks } from 'ng-jhipster';
import { AuditsService } from './audits.service';
import { ITEMS_PER_PAGE } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';
export class AuditsComponent {
    /**
     * @param {?} auditsService
     * @param {?} parseLinks
     * @param {?} paginationConfig
     * @param {?} datePipe
     */
    constructor(auditsService, parseLinks, paginationConfig, datePipe) {
        this.auditsService = auditsService;
        this.parseLinks = parseLinks;
        this.paginationConfig = paginationConfig;
        this.datePipe = datePipe;
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 1;
        this.reverse = false;
        this.orderProp = 'timestamp';
    }
    /**
     * @return {?}
     */
    getAudits() {
        return this.sortAudits(this.audits);
    }
    /**
     * @param {?} page
     * @return {?}
     */
    loadPage(page) {
        this.page = page;
        this.onChangeDate();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.today();
        this.previousMonth();
        this.onChangeDate();
    }
    /**
     * @return {?}
     */
    onChangeDate() {
        this.auditsService.query({ page: this.page - 1, size: this.itemsPerPage,
            fromDate: this.fromDate, toDate: this.toDate }).subscribe((res) => {
            this.audits = res.json();
            this.links = this.parseLinks.parse(res.headers.get('link'));
            this.totalItems = +res.headers.get('X-Total-Count');
        });
    }
    /**
     * @return {?}
     */
    previousMonth() {
        const /** @type {?} */ dateFormat = 'yyyy-MM-dd';
        let /** @type {?} */ fromDate = new Date();
        if (fromDate.getMonth() === 0) {
            fromDate = new Date(fromDate.getFullYear() - 1, 11, fromDate.getDate());
        }
        else {
            fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth() - 1, fromDate.getDate());
        }
        this.fromDate = this.datePipe.transform(fromDate, dateFormat);
    }
    /**
     * @return {?}
     */
    today() {
        const /** @type {?} */ dateFormat = 'yyyy-MM-dd';
        // Today + 1 day - needed if the current day must be included
        const /** @type {?} */ today = new Date();
        today.setDate(today.getDate() + 1);
        const /** @type {?} */ date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        this.toDate = this.datePipe.transform(date, dateFormat);
    }
    /**
     * @param {?} audits
     * @return {?}
     */
    sortAudits(audits) {
        audits = audits.slice(0).sort((a, b) => {
            if (a[this.orderProp] < b[this.orderProp]) {
                return -1;
            }
            else if ([b[this.orderProp] < a[this.orderProp]]) {
                return 1;
            }
            else {
                return 0;
            }
        });
        return this.reverse ? audits.reverse() : audits;
    }
}
AuditsComponent.decorators = [
    { type: Component, args: [{
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
            },] },
];
/**
 * @nocollapse
 */
AuditsComponent.ctorParameters = () => [
    { type: AuditsService, },
    { type: JhiParseLinks, },
    { type: PaginationConfig, },
    { type: DatePipe, },
];
function AuditsComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    AuditsComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    AuditsComponent.ctorParameters;
    /** @type {?} */
    AuditsComponent.prototype.audits;
    /** @type {?} */
    AuditsComponent.prototype.fromDate;
    /** @type {?} */
    AuditsComponent.prototype.itemsPerPage;
    /** @type {?} */
    AuditsComponent.prototype.links;
    /** @type {?} */
    AuditsComponent.prototype.page;
    /** @type {?} */
    AuditsComponent.prototype.orderProp;
    /** @type {?} */
    AuditsComponent.prototype.reverse;
    /** @type {?} */
    AuditsComponent.prototype.toDate;
    /** @type {?} */
    AuditsComponent.prototype.totalItems;
    /** @type {?} */
    AuditsComponent.prototype.auditsService;
    /** @type {?} */
    AuditsComponent.prototype.parseLinks;
    /** @type {?} */
    AuditsComponent.prototype.paginationConfig;
    /** @type {?} */
    AuditsComponent.prototype.datePipe;
}
//# sourceMappingURL=audits.component.js.map