import { OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiMetricsService } from './metrics.service';
export declare class JhiMetricsMonitoringComponent implements OnInit {
    private modalService;
    private metricsService;
    metrics: any;
    cachesStats: any;
    servicesStats: any;
    updatingMetrics: boolean;
    JCACHE_KEY: string;
    constructor(modalService: NgbModal, metricsService: JhiMetricsService);
    ngOnInit(): void;
    refresh(): void;
    refreshThreadDumpData(): void;
    filterNaN(input: any): any;
}
