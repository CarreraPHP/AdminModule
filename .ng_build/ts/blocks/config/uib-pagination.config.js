import { ITEMS_PER_PAGE } from '../../shared';
import { Injectable } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
export class PaginationConfig {
    /**
     * @param {?} config
     */
    constructor(config) {
        this.config = config;
        config.boundaryLinks = true;
        config.maxSize = 5;
        config.pageSize = ITEMS_PER_PAGE;
        config.size = 'sm';
    }
}
PaginationConfig.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
PaginationConfig.ctorParameters = () => [
    { type: NgbPaginationConfig, },
];
function PaginationConfig_tsickle_Closure_declarations() {
    /** @type {?} */
    PaginationConfig.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    PaginationConfig.ctorParameters;
    /** @type {?} */
    PaginationConfig.prototype.config;
}
//# sourceMappingURL=uib-pagination.config.js.map