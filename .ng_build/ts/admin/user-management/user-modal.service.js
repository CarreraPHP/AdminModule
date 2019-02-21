import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User, UserService } from '../../shared';
export class UserModalService {
    /**
     * @param {?} modalService
     * @param {?} router
     * @param {?} userService
     */
    constructor(modalService, router, userService) {
        this.modalService = modalService;
        this.router = router;
        this.userService = userService;
        this.isOpen = false;
    }
    /**
     * @param {?} component
     * @param {?=} login
     * @return {?}
     */
    open(component, login) {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        if (login) {
            this.userService.find(login).subscribe((user) => this.userModalRef(component, user));
        }
        else {
            return this.userModalRef(component, new User());
        }
    }
    /**
     * @param {?} component
     * @param {?} user
     * @return {?}
     */
    userModalRef(component, user) {
        const /** @type {?} */ modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.user = user;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
UserModalService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
UserModalService.ctorParameters = () => [
    { type: NgbModal, },
    { type: Router, },
    { type: UserService, },
];
function UserModalService_tsickle_Closure_declarations() {
    /** @type {?} */
    UserModalService.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    UserModalService.ctorParameters;
    /** @type {?} */
    UserModalService.prototype.isOpen;
    /** @type {?} */
    UserModalService.prototype.modalService;
    /** @type {?} */
    UserModalService.prototype.router;
    /** @type {?} */
    UserModalService.prototype.userService;
}
//# sourceMappingURL=user-modal.service.js.map