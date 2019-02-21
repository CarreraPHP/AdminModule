import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
export class LogsService {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
    }
    /**
     * @param {?} log
     * @return {?}
     */
    changeLevel(log) {
        return this.http.put('management/logs', log);
    }
    /**
     * @return {?}
     */
    findAll() {
        return this.http.get('management/logs').map((res) => res.json());
    }
}
LogsService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
LogsService.ctorParameters = () => [
    { type: Http, },
];
function LogsService_tsickle_Closure_declarations() {
    /** @type {?} */
    LogsService.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    LogsService.ctorParameters;
    /** @type {?} */
    LogsService.prototype.http;
}
//# sourceMappingURL=logs.service.js.map