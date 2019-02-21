import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiHealthService } from './health.service';
export declare class JhiHealthModalComponent {
    private healthService;
    activeModal: NgbActiveModal;
    currentHealth: any;
    constructor(healthService: JhiHealthService, activeModal: NgbActiveModal);
    baseName(name: any): string;
    subSystemName(name: any): string;
    readableValue(value: number): string;
}
