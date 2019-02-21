import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared';
export class UserMgmtDetailComponent {
    /**
     * @param {?} userService
     * @param {?} route
     */
    constructor(userService, route) {
        this.userService = userService;
        this.route = route;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['login']);
        });
    }
    /**
     * @param {?} login
     * @return {?}
     */
    load(login) {
        this.userService.find(login).subscribe((user) => {
            this.user = user;
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
UserMgmtDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'jhi-user-mgmt-detail',
                template: `
      <div *ngIf="user">
          <h2>
              <span jhiTranslate="userManagement.detail.title">User</span> [<b>{{user.login}}</b>]
          </h2>
          <dl class="row-md jh-entity-details">
              <dt><span jhiTranslate="userManagement.login">Login</span></dt>
              <dd>
                  <span>{{user.login}}</span>
                  <span class="badge badge-danger" *ngIf="!user.activated"
                        jhiTranslate="userManagement.deactivated">Deactivated</span>
                  <span class="badge badge-success" *ngIf="user.activated"
                        jhiTranslate="userManagement.activated">Activated</span>
              </dd>
              <dt><span jhiTranslate="userManagement.firstName">First Name</span></dt>
              <dd>{{user.firstName}}</dd>
              <dt><span jhiTranslate="userManagement.lastName">Last Name</span></dt>
              <dd>{{user.lastName}}</dd>
              <dt><span jhiTranslate="userManagement.email">Email</span></dt>
              <dd>{{user.email}}</dd>
              <dt><span jhiTranslate="userManagement.langKey">Lang Key</span></dt>
              <dd>{{user.langKey}}</dd>
              <dt><span jhiTranslate="userManagement.createdBy">Created By</span></dt>
              <dd>{{user.createdBy}}</dd>
              <dt><span jhiTranslate="userManagement.createdDate">Created Date</span></dt>
              <dd>{{user.createdDate | date:'dd/MM/yy HH:mm' }}</dd>
              <dt><span jhiTranslate="userManagement.lastModifiedBy">Last Modified By</span></dt>
              <dd>{{user.lastModifiedBy}}</dd>
              <dt><span jhiTranslate="userManagement.lastModifiedDate">Last Modified Date</span></dt>
              <dd>{{user.lastModifiedDate | date:'dd/MM/yy HH:mm'}}</dd>
              <dt><span jhiTranslate="userManagement.profiles">Profiles</span></dt>
              <dd>
                  <ul class="list-unstyled">
                      <li *ngFor="let authority of user.authorities">
                          <span class="badge badge-info">{{authority}}</span>
                      </li>
                  </ul>
              </dd>
          </dl>
          <button type="submit"
                  routerLink="/user-management"
                  class="btn btn-info">
              <span class="fa fa-arrow-left"></span>&nbsp;<span jhiTranslate="entity.action.back"> Back</span>
          </button>
      </div>
    `
            },] },
];
/**
 * @nocollapse
 */
UserMgmtDetailComponent.ctorParameters = () => [
    { type: UserService, },
    { type: ActivatedRoute, },
];
function UserMgmtDetailComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    UserMgmtDetailComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    UserMgmtDetailComponent.ctorParameters;
    /** @type {?} */
    UserMgmtDetailComponent.prototype.user;
    /** @type {?} */
    UserMgmtDetailComponent.prototype.subscription;
    /** @type {?} */
    UserMgmtDetailComponent.prototype.userService;
    /** @type {?} */
    UserMgmtDetailComponent.prototype.route;
}
//# sourceMappingURL=user-management-detail.component.js.map