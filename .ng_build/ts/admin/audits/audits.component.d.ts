import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { JhiParseLinks } from 'ng-jhipster';
import { Audit } from './audit.model';
import { AuditsService } from './audits.service';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';
export declare class AuditsComponent implements OnInit {
    private auditsService;
    private parseLinks;
    private paginationConfig;
    private datePipe;
    audits: Audit[];
    fromDate: string;
    itemsPerPage: any;
    links: any;
    page: number;
    orderProp: string;
    reverse: boolean;
    toDate: string;
    totalItems: number;
    constructor(auditsService: AuditsService, parseLinks: JhiParseLinks, paginationConfig: PaginationConfig, datePipe: DatePipe);
    getAudits(): Audit[];
    loadPage(page: number): void;
    ngOnInit(): void;
    onChangeDate(): void;
    previousMonth(): void;
    today(): void;
    private sortAudits;
}
