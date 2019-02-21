import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UserModalService } from './user-modal.service';
import { JhiLanguageHelper, User, UserService } from '../../shared';

@Component({
    selector: 'jhi-user-mgmt-dialog',
    template: `
      <form name="editForm" role="form" novalidate (ngSubmit)="save()" #editForm="ngForm">

          <div class="modal-header">
              <h4 class="modal-title" id="myUserLabel" jhiTranslate="userManagement.home.createOrEditLabel">
                  Create or edit a User</h4>
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true"
                  (click)="clear()">&times;</button>
          </div>
          <div class="modal-body">
              <jhi-alert-error></jhi-alert-error>
              <div class="form-group" [hidden]="!user.id">
                  <label jhiTranslate="global.field.id">ID</label>
                  <input type="text" class="form-control" name="id"
                         [(ngModel)]="user.id" readonly>
              </div>

              <div class="form-group">
                  <label class="form-control-label" jhiTranslate="userManagement.login">Login</label>
                  <input type="text" class="form-control" name="login" #loginInput="ngModel"
                         [(ngModel)]="user.login" required minlength="1" maxlength="50" pattern="^[_'.@A-Za-z0-9-]*$">

                  <div *ngIf="loginInput.dirty && loginInput.invalid">
                      <small class="form-text text-danger"
                         *ngIf="loginInput.errors.required" jhiTranslate="entity.validation.required">
                          This field is required.
                      </small>

                      <small class="form-text text-danger"
                         *ngIf="loginInput.errors.maxlength" jhiTranslate="entity.validation.maxlength"
                         translateValues="{max: 50}">
                          This field cannot be longer than 50 characters.
                      </small>
                  </div>
              </div>
              <div class="form-group">
                  <label class="form-control-label" jhiTranslate="userManagement.firstName">First Name</label>
                  <input type="text" class="form-control" name="firstName" #firstNameInput="ngModel"
                         [(ngModel)]="user.firstName" maxlength="50">

                  <div *ngIf="firstNameInput.dirty && firstNameInput.invalid">
                      <small class="form-text text-danger"
                         *ngIf="firstNameInput.errors.maxlength" jhiTranslate="entity.validation.maxlength"
                         translateValues="{max: 50}">
                          This field cannot be longer than 50 characters.
                      </small>
                  </div>
              </div>
              <div class="form-group">
                  <label jhiTranslate="userManagement.lastName">Last Name</label>
                  <input type="text" class="form-control" name="lastName" #lastNameInput="ngModel"
                         [(ngModel)]="user.lastName" maxlength="50">

                  <div *ngIf="lastNameInput.dirty && lastNameInput.invalid">
                      <small class="form-text text-danger"
                         *ngIf="lastNameInput.errors.maxlength" jhiTranslate="entity.validation.maxlength"
                         translateValues="{max: 50}">
                          This field cannot be longer than 50 characters.
                      </small>
                  </div>
              </div>
              <div class="form-group">
                  <label class="form-control-label" jhiTranslate="userManagement.email">Email</label>
                  <input type="email" class="form-control" name="email" #emailInput="ngModel"
                         [(ngModel)]="user.email" minlength="5" required maxlength="100" email>

                  <div *ngIf="emailInput.dirty && emailInput.invalid">
                      <small class="form-text text-danger"
                         *ngIf="emailInput.errors.required" jhiTranslate="entity.validation.required">
                          This field is required.
                      </small>

                      <small class="form-text text-danger"
                         *ngIf="emailInput.errors.maxlength" jhiTranslate="entity.validation.maxlength"
                         translateValues="{max: 100}">
                          This field cannot be longer than 100 characters.
                      </small>

                      <small class="form-text text-danger"
                         *ngIf="emailInput.errors.minlength" jhiTranslate="entity.validation.minlength"
                         translateValues="{min: 5}">
                          This field is required to be at least 5 characters.
                      </small>

                      <small class="form-text text-danger"
                         *ngIf="emailInput.errors.email" jhiTranslate="global.messages.validate.email.invalid">
                          Your email is invalid.
                       </small>
                  </div>
              </div>
              <div class="form-check">
                  <label class="form-check-label" for="activated">
                      <input class="form-check-input" [disabled]="user.id === null" type="checkbox" id="activated" name="activated" [(ngModel)]="user.activated">
                      <span jhiTranslate="userManagement.activated">Activated</span>
                  </label>
              </div>

              <div class="form-group" *ngIf="languages && languages.length > 0">
                  <label jhiTranslate="userManagement.langKey">Lang Key</label>
                  <select class="form-control" id="langKey" name="langKey" [(ngModel)]="user.langKey">
                      <option *ngFor="let language of languages" [value]="language">{{language | findLanguageFromKey}}</option>
                  </select>
              </div>
              <div class="form-group">
                  <label jhiTranslate="userManagement.profiles">Profiles</label>
                  <select class="form-control" multiple name="authority" [(ngModel)]="user.authorities">
                      <option *ngFor="let authority of authorities" [value]="authority">{{authority}}</option>
                  </select>
              </div>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" (click)="clear()">
                  <span class="fa fa-ban"></span>&nbsp;<span
                  jhiTranslate="entity.action.cancel">Cancel</span>
              </button>
              <button type="submit" [disabled]="editForm.form.invalid || isSaving" class="btn btn-primary">
                  <span class="fa fa-floppy-o"></span>&nbsp;<span jhiTranslate="entity.action.save">Save</span>
              </button>
          </div>
      </form>
    `
})
export class UserMgmtDialogComponent implements OnInit {

    user: User;
    languages: any[];
    authorities: any[];
    isSaving: Boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private languageHelper: JhiLanguageHelper,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.authorities = [];
        this.userService.authorities().subscribe((authorities) => {
            this.authorities = authorities;
        });
        this.languageHelper.getAll().then((languages) => {
            this.languages = languages;
        });
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.user.id !== null) {
            this.userService.update(this.user).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
        } else {
            this.userService.create(this.user).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
        }
    }

    private onSaveSuccess(result) {
        this.eventManager.broadcast({ name: 'userListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-user-dialog',
    template: ''
})
export class UserDialogComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userModalService: UserModalService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['login'] ) {
                this.modalRef = this.userModalService.open(UserMgmtDialogComponent as Component, params['login']);
            } else {
                this.modalRef = this.userModalService.open(UserMgmtDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
