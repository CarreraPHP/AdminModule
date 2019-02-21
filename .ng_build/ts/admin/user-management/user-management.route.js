import { Injectable } from '@angular/core';
import { JhiPaginationUtil } from 'ng-jhipster';
import { UserMgmtComponent } from './user-management.component';
import { UserMgmtDetailComponent } from './user-management-detail.component';
import { UserDialogComponent } from './user-management-dialog.component';
import { UserDeleteDialogComponent } from './user-management-delete-dialog.component';
import { Principal } from '../../shared';
export class UserResolve {
    /**
     * @param {?} principal
     */
    constructor(principal) {
        this.principal = principal;
    }
    /**
     * @return {?}
     */
    canActivate() {
        return this.principal.identity().then((account) => this.principal.hasAnyAuthority(['ROLE_ADMIN']));
    }
}
UserResolve.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
UserResolve.ctorParameters = () => [
    { type: Principal, },
];
function UserResolve_tsickle_Closure_declarations() {
    /** @type {?} */
    UserResolve.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    UserResolve.ctorParameters;
    /** @type {?} */
    UserResolve.prototype.principal;
}
export class UserResolvePagingParams {
    /**
     * @param {?} paginationUtil
     */
    constructor(paginationUtil) {
        this.paginationUtil = paginationUtil;
    }
    /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    resolve(route, state) {
        const /** @type {?} */ page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const /** @type {?} */ sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}
UserResolvePagingParams.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
UserResolvePagingParams.ctorParameters = () => [
    { type: JhiPaginationUtil, },
];
function UserResolvePagingParams_tsickle_Closure_declarations() {
    /** @type {?} */
    UserResolvePagingParams.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    UserResolvePagingParams.ctorParameters;
    /** @type {?} */
    UserResolvePagingParams.prototype.paginationUtil;
}
export const /** @type {?} */ userMgmtRoute = [
    {
        path: 'user-management',
        component: UserMgmtComponent,
        resolve: {
            'pagingParams': UserResolvePagingParams
        },
        data: {
            pageTitle: 'userManagement.home.title'
        }
    },
    {
        path: 'user-management/:login',
        component: UserMgmtDetailComponent,
        data: {
            pageTitle: 'userManagement.home.title'
        }
    }
];
export const /** @type {?} */ userDialogRoute = [
    {
        path: 'user-management-new',
        component: UserDialogComponent,
        outlet: 'popup'
    },
    {
        path: 'user-management/:login/edit',
        component: UserDialogComponent,
        outlet: 'popup'
    },
    {
        path: 'user-management/:login/delete',
        component: UserDeleteDialogComponent,
        outlet: 'popup'
    }
];
//# sourceMappingURL=user-management.route.js.map