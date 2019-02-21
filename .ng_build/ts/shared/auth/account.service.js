import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SERVER_API_URL } from '../../app.constants';
export class AccountService {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
    }
    /**
     * @return {?}
     */
    get() {
        return this.http.get(SERVER_API_URL + 'api/account').map((res) => res.json());
    }
    /**
     * @param {?} account
     * @return {?}
     */
    save(account) {
        return this.http.post(SERVER_API_URL + 'api/account', account);
    }
}
AccountService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
AccountService.ctorParameters = () => [
    { type: Http, },
];
function AccountService_tsickle_Closure_declarations() {
    /** @type {?} */
    AccountService.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    AccountService.ctorParameters;
    /** @type {?} */
    AccountService.prototype.http;
}
//# sourceMappingURL=account.service.js.map