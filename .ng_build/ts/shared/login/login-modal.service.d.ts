import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
export declare class LoginModalService {
    private modalService;
    private isOpen;
    constructor(modalService: NgbModal);
    open(): NgbModalRef;
}
