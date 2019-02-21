import { URLSearchParams, BaseRequestOptions } from '@angular/http';
export const /** @type {?} */ createRequestOption = (req) => {
    const /** @type {?} */ options = new BaseRequestOptions();
    if (req) {
        const /** @type {?} */ params = new URLSearchParams();
        params.set('page', req.page);
        params.set('size', req.size);
        if (req.sort) {
            params.paramsMap.set('sort', req.sort);
        }
        params.set('query', req.query);
        options.params = params;
    }
    return options;
};
//# sourceMappingURL=request-util.js.map