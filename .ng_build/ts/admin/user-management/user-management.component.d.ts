import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiEventManager, JhiPaginationUtil, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { Principal, User, UserService } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';
export declare class UserMgmtComponent implements OnInit, OnDestroy {
    private userService;
    private parseLinks;
    private alertService;
    private principal;
    private eventManager;
    private paginationUtil;
    private paginationConfig;
    private activatedRoute;
    private router;
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
    constructor(userService: UserService, parseLinks: JhiParseLinks, alertService: JhiAlertService, principal: Principal, eventManager: JhiEventManager, paginationUtil: JhiPaginationUtil, paginationConfig: PaginationConfig, activatedRoute: ActivatedRoute, router: Router);
    ngOnInit(): void;
    ngOnDestroy(): void;
    registerChangeInUsers(): void;
    setActive(user: any, isActivated: any): void;
    loadAll(): void;
    trackIdentity(index: any, item: User): any;
    sort(): string[];
    loadPage(page: number): void;
    transition(): void;
    private onSuccess;
    private onError;
}
