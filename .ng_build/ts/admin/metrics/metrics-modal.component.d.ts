import { OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
export declare class JhiMetricsMonitoringModalComponent implements OnInit {
    activeModal: NgbActiveModal;
    threadDumpFilter: any;
    threadDump: any;
    threadDumpAll: number;
    threadDumpBlocked: number;
    threadDumpRunnable: number;
    threadDumpTimedWaiting: number;
    threadDumpWaiting: number;
    constructor(activeModal: NgbActiveModal);
    ngOnInit(): void;
    getBadgeClass(threadState: any): "badge-success" | "badge-danger" | "badge-info" | "badge-warning";
}
