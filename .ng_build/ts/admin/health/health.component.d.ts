import { OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiHealthService } from './health.service';
export declare class JhiHealthCheckComponent implements OnInit {
    private modalService;
    private healthService;
    healthData: any;
    updatingHealth: boolean;
    constructor(modalService: NgbModal, healthService: JhiHealthService);
    ngOnInit(): void;
    baseName(name: string): string;
    getBadgeClass(statusState: any): "badge-success" | "badge-danger";
    refresh(): void;
    showHealth(health: any): void;
    subSystemName(name: string): string;
}
