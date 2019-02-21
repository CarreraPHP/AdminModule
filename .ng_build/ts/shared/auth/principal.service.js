import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AccountService } from './account.service';
export class Principal {
    /**
     * @param {?} account
     */
    constructor(account) {
        this.account = account;
        this.authenticated = false;
        this.authenticationState = new Subject();
    }
    /**
     * @param {?} identity
     * @return {?}
     */
    authenticate(identity) {
        this.userIdentity = identity;
        this.authenticated = identity !== null;
        this.authenticationState.next(this.userIdentity);
    }
    /**
     * @param {?} authorities
     * @return {?}
     */
    hasAnyAuthority(authorities) {
        return Promise.resolve(this.hasAnyAuthorityDirect(authorities));
    }
    /**
     * @param {?} authorities
     * @return {?}
     */
    hasAnyAuthorityDirect(authorities) {
        if (!this.authenticated || !this.userIdentity || !this.userIdentity.authorities) {
            return false;
        }
        for (let /** @type {?} */ i = 0; i < authorities.length; i++) {
            if (this.userIdentity.authorities.indexOf(authorities[i]) !== -1) {
                return true;
            }
        }
        return false;
    }
    /**
     * @param {?} authority
     * @return {?}
     */
    hasAuthority(authority) {
        if (!this.authenticated) {
            return Promise.resolve(false);
        }
        return this.identity().then((id) => {
            return Promise.resolve(id.authorities && id.authorities.indexOf(authority) !== -1);
        }, () => {
            return Promise.resolve(false);
        });
    }
    /**
     * @param {?=} force
     * @return {?}
     */
    identity(force) {
        if (force === true) {
            this.userIdentity = undefined;
        }
        // check and see if we have retrieved the userIdentity data from the server.
        // if we have, reuse it by immediately resolving
        if (this.userIdentity) {
            return Promise.resolve(this.userIdentity);
        }
        // retrieve the userIdentity data from the server, update the identity object, and then resolve.
        return this.account.get().toPromise().then((account) => {
            if (account) {
                this.userIdentity = account;
                this.authenticated = true;
            }
            else {
                this.userIdentity = null;
                this.authenticated = false;
            }
            this.authenticationState.next(this.userIdentity);
            return this.userIdentity;
        }).catch((err) => {
            this.userIdentity = null;
            this.authenticated = false;
            this.authenticationState.next(this.userIdentity);
            return null;
        });
    }
    /**
     * @return {?}
     */
    isAuthenticated() {
        return this.authenticated;
    }
    /**
     * @return {?}
     */
    isIdentityResolved() {
        return this.userIdentity !== undefined;
    }
    /**
     * @return {?}
     */
    getAuthenticationState() {
        return this.authenticationState.asObservable();
    }
    /**
     * @return {?}
     */
    getImageUrl() {
        return this.isIdentityResolved() ? this.userIdentity.imageUrl : null;
    }
}
Principal.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
Principal.ctorParameters = () => [
    { type: AccountService, },
];
function Principal_tsickle_Closure_declarations() {
    /** @type {?} */
    Principal.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    Principal.ctorParameters;
    /** @type {?} */
    Principal.prototype.userIdentity;
    /** @type {?} */
    Principal.prototype.authenticated;
    /** @type {?} */
    Principal.prototype.authenticationState;
    /** @type {?} */
    Principal.prototype.account;
}
//# sourceMappingURL=principal.service.js.map