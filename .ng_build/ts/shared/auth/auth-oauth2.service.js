import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { LocalStorageService } from 'ng2-webstorage';
import { SERVER_API_URL } from '../../app.constants';
import { JhiBase64Service } from 'ng-jhipster';
export class AuthServerProvider {
    /**
     * @param {?} http
     * @param {?} base64
     * @param {?} $localStorage
     */
    constructor(http, base64, $localStorage) {
        this.http = http;
        this.base64 = base64;
        this.$localStorage = $localStorage;
    }
    /**
     * @return {?}
     */
    getToken() {
        return this.$localStorage.retrieve('authenticationToken');
    }
    /**
     * @param {?} credentials
     * @return {?}
     */
    login(credentials) {
        const /** @type {?} */ data = 'username=' + encodeURIComponent(credentials.username) + '&password=' +
            encodeURIComponent(credentials.password) + '&grant_type=password&scope=read%20write&' +
            'client_secret=my-secret-token-to-change-in-production&client_id=ExternalModuleProjectapp';
        const /** @type {?} */ headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': 'Basic ' + this.base64.encode('ExternalModuleProjectapp' + ':' + 'my-secret-token-to-change-in-production')
        });
        return this.http.post('oauth/token', data, {
            headers
        }).map(authSuccess.bind(this));
        /**
         * @param {?} resp
         * @return {?}
         */
        function authSuccess(resp) {
            const /** @type {?} */ response = resp.json();
            const /** @type {?} */ expiredAt = new Date();
            expiredAt.setSeconds(expiredAt.getSeconds() + response.expires_in);
            response.expires_at = expiredAt.getTime();
            this.$localStorage.store('authenticationToken', response);
            return response;
        }
    }
    /**
     * @return {?}
     */
    logout() {
        return new Observable((observer) => {
            this.http.post(SERVER_API_URL + 'api/logout', {});
            this.$localStorage.clear('authenticationToken');
            observer.complete();
        });
    }
}
AuthServerProvider.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
AuthServerProvider.ctorParameters = () => [
    { type: Http, },
    { type: JhiBase64Service, },
    { type: LocalStorageService, },
];
function AuthServerProvider_tsickle_Closure_declarations() {
    /** @type {?} */
    AuthServerProvider.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    AuthServerProvider.ctorParameters;
    /** @type {?} */
    AuthServerProvider.prototype.http;
    /** @type {?} */
    AuthServerProvider.prototype.base64;
    /** @type {?} */
    AuthServerProvider.prototype.$localStorage;
}
//# sourceMappingURL=auth-oauth2.service.js.map