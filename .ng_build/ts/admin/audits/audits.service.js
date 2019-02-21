import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
export class AuditsService {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
    }
    /**
     * @param {?} req
     * @return {?}
     */
    query(req) {
        const /** @type {?} */ params = new URLSearchParams();
        params.set('fromDate', req.fromDate);
        params.set('toDate', req.toDate);
        params.set('page', req.page);
        params.set('size', req.size);
        params.set('sort', req.sort);
        const /** @type {?} */ options = {
            search: params
        };
        return this.http.get('management/audits', options);
    }
}
AuditsService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
AuditsService.ctorParameters = () => [
    { type: Http, },
];
function AuditsService_tsickle_Closure_declarations() {
    /** @type {?} */
    AuditsService.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    AuditsService.ctorParameters;
    /** @type {?} */
    AuditsService.prototype.http;
}
//# sourceMappingURL=audits.service.js.map