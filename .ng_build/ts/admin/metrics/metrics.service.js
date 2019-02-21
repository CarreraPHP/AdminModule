import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
export class JhiMetricsService {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
    }
    /**
     * @return {?}
     */
    getMetrics() {
        return this.http.get('management/metrics').map((res) => res.json());
    }
    /**
     * @return {?}
     */
    threadDump() {
        return this.http.get('management/dump').map((res) => res.json());
    }
}
JhiMetricsService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
JhiMetricsService.ctorParameters = () => [
    { type: Http, },
];
function JhiMetricsService_tsickle_Closure_declarations() {
    /** @type {?} */
    JhiMetricsService.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    JhiMetricsService.ctorParameters;
    /** @type {?} */
    JhiMetricsService.prototype.http;
}
//# sourceMappingURL=metrics.service.js.map