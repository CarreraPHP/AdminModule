import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiLoginModalComponent } from './login.component';
export class LoginModalService {
    /**
     * @param {?} modalService
     */
    constructor(modalService) {
        this.modalService = modalService;
        this.isOpen = false;
    }
    /**
     * @return {?}
     */
    open() {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        const /** @type {?} */ modalRef = this.modalService.open(JhiLoginModalComponent, {
            container: 'nav'
        });
        modalRef.result.then((result) => {
            this.isOpen = false;
        }, (reason) => {
            this.isOpen = false;
        });
        return modalRef;
    }
}
LoginModalService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
LoginModalService.ctorParameters = () => [
    { type: NgbModal, },
];
function LoginModalService_tsickle_Closure_declarations() {
    /** @type {?} */
    LoginModalService.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    LoginModalService.ctorParameters;
    /** @type {?} */
    LoginModalService.prototype.isOpen;
    /** @type {?} */
    LoginModalService.prototype.modalService;
}
//# sourceMappingURL=login-modal.service.js.map