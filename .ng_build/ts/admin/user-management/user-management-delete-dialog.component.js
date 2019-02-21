import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { UserService } from '../../shared';
import { UserModalService } from './user-modal.service';
export class UserMgmtDeleteDialogComponent {
    /**
     * @param {?} userService
     * @param {?} activeModal
     * @param {?} eventManager
     */
    constructor(userService, activeModal, eventManager) {
        this.userService = userService;
        this.activeModal = activeModal;
        this.eventManager = eventManager;
    }
    /**
     * @return {?}
     */
    clear() {
        this.activeModal.dismiss('cancel');
    }
    /**
     * @param {?} login
     * @return {?}
     */
    confirmDelete(login) {
        this.userService.delete(login).subscribe((response) => {
            this.eventManager.broadcast({ name: 'userListModification',
                content: 'Deleted a user' });
            this.activeModal.dismiss(true);
        });
    }
}
UserMgmtDeleteDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'jhi-user-mgmt-delete-dialog',
                template: `
      <form name="deleteForm" (ngSubmit)="confirmDelete(user.login)">
          <div class="modal-header">
              <h4 class="modal-title" jhiTranslate="entity.delete.title">Confirm delete operation</h4>
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true"
                  (click)="clear()">&times;</button>
          </div>
          <div class="modal-body">
              <jhi-alert-error></jhi-alert-error>
              <p jhiTranslate="userManagement.delete.question" translateValues="{login: '{{user.login}}'}">Are you sure you want to delete this User?</p>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" (click)="clear()">
                  <span class="fa fa-ban"></span>&nbsp;<span jhiTranslate="entity.action.cancel">Cancel</span>
              </button>
              <button type="submit" class="btn btn-danger">
                  <span class="fa fa-remove"></span>&nbsp;<span jhiTranslate="entity.action.delete">Delete</span>
              </button>
          </div>
      </form>
    `
            },] },
];
/**
 * @nocollapse
 */
UserMgmtDeleteDialogComponent.ctorParameters = () => [
    { type: UserService, },
    { type: NgbActiveModal, },
    { type: JhiEventManager, },
];
function UserMgmtDeleteDialogComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    UserMgmtDeleteDialogComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    UserMgmtDeleteDialogComponent.ctorParameters;
    /** @type {?} */
    UserMgmtDeleteDialogComponent.prototype.user;
    /** @type {?} */
    UserMgmtDeleteDialogComponent.prototype.userService;
    /** @type {?} */
    UserMgmtDeleteDialogComponent.prototype.activeModal;
    /** @type {?} */
    UserMgmtDeleteDialogComponent.prototype.eventManager;
}
export class UserDeleteDialogComponent {
    /**
     * @param {?} route
     * @param {?} userModalService
     */
    constructor(route, userModalService) {
        this.route = route;
        this.userModalService = userModalService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.userModalService.open(/** @type {?} */ (UserMgmtDeleteDialogComponent), params['login']);
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
UserDeleteDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'jhi-user-delete-dialog',
                template: ''
            },] },
];
/**
 * @nocollapse
 */
UserDeleteDialogComponent.ctorParameters = () => [
    { type: ActivatedRoute, },
    { type: UserModalService, },
];
function UserDeleteDialogComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    UserDeleteDialogComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    UserDeleteDialogComponent.ctorParameters;
    /** @type {?} */
    UserDeleteDialogComponent.prototype.modalRef;
    /** @type {?} */
    UserDeleteDialogComponent.prototype.routeSub;
    /** @type {?} */
    UserDeleteDialogComponent.prototype.route;
    /** @type {?} */
    UserDeleteDialogComponent.prototype.userModalService;
}
//# sourceMappingURL=user-management-delete-dialog.component.js.map