import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { User, UserService } from '../../shared';
import { UserModalService } from './user-modal.service';

@Component({
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
})
export class UserMgmtDeleteDialogComponent {

    user: User;

    constructor(
        private userService: UserService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(login) {
        this.userService.delete(login).subscribe((response) => {
            this.eventManager.broadcast({ name: 'userListModification',
                content: 'Deleted a user'});
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-delete-dialog',
    template: ''
})
export class UserDeleteDialogComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userModalService: UserModalService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.userModalService.open(UserMgmtDeleteDialogComponent as Component, params['login']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
