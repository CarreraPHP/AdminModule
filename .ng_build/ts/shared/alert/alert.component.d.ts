import { OnDestroy, OnInit } from '@angular/core';
import { JhiAlertService } from 'ng-jhipster';
export declare class JhiAlertComponent implements OnInit, OnDestroy {
    private alertService;
    alerts: any[];
    constructor(alertService: JhiAlertService);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
