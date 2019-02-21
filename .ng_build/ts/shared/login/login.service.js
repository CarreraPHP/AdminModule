import { Injectable } from '@angular/core';
import { JhiLanguageService } from 'ng-jhipster';
import { Principal } from '../auth/principal.service';
import { AuthServerProvider } from '../auth/auth-oauth2.service';
export class LoginService {
    /**
     * @param {?} languageService
     * @param {?} principal
     * @param {?} authServerProvider
     */
    constructor(languageService, principal, authServerProvider) {
        this.languageService = languageService;
        this.principal = principal;
        this.authServerProvider = authServerProvider;
    }
    /**
     * @param {?} credentials
     * @param {?=} callback
     * @return {?}
     */
    login(credentials, callback) {
        const /** @type {?} */ cb = callback || function () { };
        return new Promise((resolve, reject) => {
            this.authServerProvider.login(credentials).subscribe((data) => {
                this.principal.identity(true).then((account) => {
                    // After the login the language will be changed to
                    // the language selected by the user during his registration
                    if (account !== null) {
                        this.languageService.changeLanguage(account.langKey);
                    }
                    resolve(data);
                });
                return cb();
            }, (err) => {
                this.logout();
                reject(err);
                return cb(err);
            });
        });
    }
    /**
     * @return {?}
     */
    logout() {
        if (this.principal.isAuthenticated()) {
            this.authServerProvider.logout().subscribe();
        }
        this.principal.authenticate(null);
    }
}
LoginService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
LoginService.ctorParameters = () => [
    { type: JhiLanguageService, },
    { type: Principal, },
    { type: AuthServerProvider, },
];
function LoginService_tsickle_Closure_declarations() {
    /** @type {?} */
    LoginService.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    LoginService.ctorParameters;
    /** @type {?} */
    LoginService.prototype.languageService;
    /** @type {?} */
    LoginService.prototype.principal;
    /** @type {?} */
    LoginService.prototype.authServerProvider;
}
//# sourceMappingURL=login.service.js.map