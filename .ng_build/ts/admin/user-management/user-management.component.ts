import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiEventManager, JhiPaginationUtil, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { ITEMS_PER_PAGE, Principal, User, UserService, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-user-mgmt',
    template: `
      <div>
          <h2>
              <span jhiTranslate="userManagement.home.title">Users</span>
              <button class="btn btn-primary float-right jh-create-entity" [routerLink]="['/', { outlets: { popup: ['user-management-new'] } }]">
                  <span class="fa fa-plus"></span> <span jhiTranslate="userManagement.home.createLabel">Create a new User</span>
              </button>
          </h2>
          <jhi-alert></jhi-alert>
          <div class="table-responsive" *ngIf="users">
              <table class="table table-striped">
                  <thead>
                  <tr jhiSort [(predicate)]="predicate" [(ascending)]="reverse" [callback]="transition.bind(this)">
                      <th jhiSortBy="id"><span jhiTranslate="global.field.id">ID</span> <span class="fa fa-sort"></span></th>
                      <th jhiSortBy="login"><span jhiTranslate="userManagement.login">Login</span> <span class="fa fa-sort"></span></th>
                      <th jhiSortBy="email"><span jhiTranslate="userManagement.email">Email</span> <span class="fa fa-sort"></span></th>
                      <th></th>
                      <th jhiSortBy="langKey"> <span jhiTranslate="userManagement.langKey">Lang Key</span> <span class="fa fa-sort"></span></th>
                      <th><span jhiTranslate="userManagement.profiles">Profiles</span></th>
                      <th jhiSortBy="createdDate"><span jhiTranslate="userManagement.createdDate">Created Date</span> <span class="fa fa-sort"></span></th>
                      <th jhiSortBy="lastModifiedBy"><span jhiTranslate="userManagement.lastModifiedBy">Last Modified By</span> <span class="fa fa-sort"></span></th>
                      <th jhiSortBy="lastModifiedDate"><span jhiTranslate="userManagement.lastModifiedDate">Last Modified Date</span> <span class="fa fa-sort"></span></th>
                      <th></th>
                  </tr>
                  </thead>
                  <tbody *ngIf ="users">
                  <tr *ngFor="let user of users; trackBy: trackIdentity">
                      <td><a [routerLink]="['../user-management', user.login]">{{user.id}}</a></td>
                      <td>{{user.login}}</td>
                      <td>{{user.email}}</td>
                      <td>
                          <button class="btn btn-danger btn-sm" (click)="setActive(user, true)" *ngIf="!user.activated"
                                  jhiTranslate="userManagement.deactivated">Deactivated</button>
                          <button class="btn btn-success btn-sm" (click)="setActive(user, false)" *ngIf="user.activated"
                                  [disabled]="currentAccount.login === user.login" jhiTranslate="userManagement.activated">Activated</button>
                      </td>
                      <td>{{user.langKey}}</td>
                      <td>
                          <div *ngFor="let authority of user.authorities">
                              <span class="badge badge-info">{{ authority }}</span>
                          </div>
                      </td>
                      <td>{{user.createdDate | date:'dd/MM/yy HH:mm'}}</td>
                      <td>{{user.lastModifiedBy}}</td>
                      <td>{{user.lastModifiedDate | date:'dd/MM/yy HH:mm'}}</td>
                      <td class="text-right">
                          <div class="btn-group flex-btn-group-container">
                              <button type="submit"
                                      [routerLink]="['../user-management', user.login]"
                                      class="btn btn-info btn-sm">
                                  <span class="fa fa-eye"></span>
                                  <span class="d-none d-md-inline" jhiTranslate="entity.action.view">View</span>
                              </button>
                              <button type="submit"
                                      [routerLink]="['/', { outlets: { popup: 'user-management/'+ user.login + '/edit'} }]"
                                      replaceUrl="true"
                                      class="btn btn-primary btn-sm">
                                  <span class="fa fa-pencil"></span>
                                  <span class="d-none d-md-inline" jhiTranslate="entity.action.edit">Edit</span>
                              </button>
                              <button type="submit"
                                      [routerLink]="['/', { outlets: { popup: 'user-management/'+ user.login + '/delete'} }]"
                                      replaceUrl="true"
                                      class="btn btn-danger btn-sm" [disabled]="currentAccount.login === user.login">
                                  <span class="fa fa-remove"></span>
                                  <span class="d-none d-md-inline" jhiTranslate="entity.action.delete">Delete</span>
                              </button>
                          </div>
                      </td>
                  </tr>
                  </tbody>
              </table>
          </div>
          <div *ngIf="users">
              <div class="row justify-content-center">
                  <jhi-item-count [page]="page" [total]="queryCount" [itemsPerPage]="itemsPerPage"></jhi-item-count>
              </div>
              <div class="row justify-content-center">
                  <ngb-pagination [collectionSize]="totalItems" [(page)]="page" (pageChange)="loadPage(page)"></ngb-pagination>
              </div>
          </div>
      </div>
    `
})
export class UserMgmtComponent implements OnInit, OnDestroy {

    currentAccount: any;
    users: User[];
    error: any;
    success: any;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(
        private userService: UserService,
        private parseLinks: JhiParseLinks,
        private alertService: JhiAlertService,
        private principal: Principal,
        private eventManager: JhiEventManager,
        private paginationUtil: JhiPaginationUtil,
        private paginationConfig: PaginationConfig,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
            this.loadAll();
            this.registerChangeInUsers();
        });
    }

    ngOnDestroy() {
        this.routeData.unsubscribe();
    }

    registerChangeInUsers() {
        this.eventManager.subscribe('userListModification', (response) => this.loadAll());
    }

    setActive(user, isActivated) {
        user.activated = isActivated;

        this.userService.update(user).subscribe(
            (response) => {
                if (response.status === 200) {
                    this.error = null;
                    this.success = 'OK';
                    this.loadAll();
                } else {
                    this.success = null;
                    this.error = 'ERROR';
                }
            });
    }

    loadAll() {
        this.userService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()}).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    trackIdentity(index, item: User) {
        return item.id;
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/user-management'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.users = data;
    }

    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }
}
