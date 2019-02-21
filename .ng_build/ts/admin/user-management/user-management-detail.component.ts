import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { User, UserService } from '../../shared';

@Component({
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
})
export class UserMgmtDetailComponent implements OnInit, OnDestroy {

    user: User;
    private subscription: Subscription;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['login']);
        });
    }

    load(login) {
        this.userService.find(login).subscribe((user) => {
            this.user = user;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
