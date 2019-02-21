import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
export class JhiConfigurationService {
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
        return this.http.get('management/configprops').map((res) => {
            const /** @type {?} */ properties = [];
            const /** @type {?} */ propertiesObject = res.json();
            for (const /** @type {?} */ key in propertiesObject) {
                if (propertiesObject.hasOwnProperty(key)) {
                    properties.push(propertiesObject[key]);
                }
            }
            return properties.sort((propertyA, propertyB) => {
                return (propertyA.prefix === propertyB.prefix) ? 0 :
                    (propertyA.prefix < propertyB.prefix) ? -1 : 1;
            });
        });
    }
    /**
     * @return {?}
     */
    getEnv() {
        return this.http.get('management/env').map((res) => {
            const /** @type {?} */ properties = {};
            const /** @type {?} */ propertiesObject = res.json();
            for (const /** @type {?} */ key in propertiesObject) {
                if (propertiesObject.hasOwnProperty(key)) {
                    const /** @type {?} */ valsObject = propertiesObject[key];
                    const /** @type {?} */ vals = [];
                    for (const /** @type {?} */ valKey in valsObject) {
                        if (valsObject.hasOwnProperty(valKey)) {
                            vals.push({ key: valKey, val: valsObject[valKey] });
                        }
                    }
                    properties[key] = vals;
                }
            }
            return properties;
        });
    }
}
JhiConfigurationService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
JhiConfigurationService.ctorParameters = () => [
    { type: Http, },
];
function JhiConfigurationService_tsickle_Closure_declarations() {
    /** @type {?} */
    JhiConfigurationService.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    JhiConfigurationService.ctorParameters;
    /** @type {?} */
    JhiConfigurationService.prototype.http;
}
//# sourceMappingURL=configuration.service.js.map