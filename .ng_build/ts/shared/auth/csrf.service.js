import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
export class CSRFService {
    /**
     * @param {?} cookieService
     */
    constructor(cookieService) {
        this.cookieService = cookieService;
    }
    /**
     * @param {?=} name
     * @return {?}
     */
    getCSRF(name) {
        name = `${name ? name : 'XSRF-TOKEN'}`;
        return this.cookieService.get(name);
    }
}
CSRFService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
CSRFService.ctorParameters = () => [
    { type: CookieService, },
];
function CSRFService_tsickle_Closure_declarations() {
    /** @type {?} */
    CSRFService.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    CSRFService.ctorParameters;
    /** @type {?} */
    CSRFService.prototype.cookieService;
}
//# sourceMappingURL=csrf.service.js.map