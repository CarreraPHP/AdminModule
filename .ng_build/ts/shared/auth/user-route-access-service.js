import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Principal } from '../';
import { LoginModalService } from '../login/login-modal.service';
import { StateStorageService } from './state-storage.service';
export class UserRouteAccessService {
    /**
     * @param {?} router
     * @param {?} loginModalService
     * @param {?} principal
     * @param {?} stateStorageService
     */
    constructor(router, loginModalService, principal, stateStorageService) {
        this.router = router;
        this.loginModalService = loginModalService;
        this.principal = principal;
        this.stateStorageService = stateStorageService;
    }
    /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    canActivate(route, state) {
        const /** @type {?} */ authorities = route.data['authorities'];
        // We need to call the checkLogin / and so the principal.identity() function, to ensure,
        // that the client has a principal too, if they already logged in by the server.
        // This could happen on a page refresh.
        return this.checkLogin(authorities, state.url);
    }
    /**
     * @param {?} authorities
     * @param {?} url
     * @return {?}
     */
    checkLogin(authorities, url) {
        const /** @type {?} */ principal = this.principal;
        return Promise.resolve(principal.identity().then((account) => {
            if (!authorities || authorities.length === 0) {
                return true;
            }
            if (account) {
                return principal.hasAnyAuthority(authorities).then((response) => {
                    if (response) {
                        return true;
                    }
                    return false;
                });
            }
            this.stateStorageService.storeUrl(url);
            this.router.navigate(['accessdenied']).then(() => {
                // only show the login dialog, if the user hasn't logged in yet
                if (!account) {
                    this.loginModalService.open();
                }
            });
            return false;
        }));
    }
}
UserRouteAccessService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
UserRouteAccessService.ctorParameters = () => [
    { type: Router, },
    { type: LoginModalService, },
    { type: Principal, },
    { type: StateStorageService, },
];
function UserRouteAccessService_tsickle_Closure_declarations() {
    /** @type {?} */
    UserRouteAccessService.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    UserRouteAccessService.ctorParameters;
    /** @type {?} */
    UserRouteAccessService.prototype.router;
    /** @type {?} */
    UserRouteAccessService.prototype.loginModalService;
    /** @type {?} */
    UserRouteAccessService.prototype.principal;
    /** @type {?} */
    UserRouteAccessService.prototype.stateStorageService;
}
//# sourceMappingURL=user-route-access-service.js.map