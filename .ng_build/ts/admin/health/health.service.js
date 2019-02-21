import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
export class JhiHealthService {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
        this.separator = '.';
    }
    /**
     * @return {?}
     */
    checkHealth() {
        return this.http.get('management/health').map((res) => res.json());
    }
    /**
     * @param {?} data
     * @return {?}
     */
    transformHealthData(data) {
        const /** @type {?} */ response = [];
        this.flattenHealthData(response, null, data);
        return response;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getBaseName(name) {
        if (name) {
            const /** @type {?} */ split = name.split('.');
            return split[0];
        }
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getSubSystemName(name) {
        if (name) {
            const /** @type {?} */ split = name.split('.');
            split.splice(0, 1);
            const /** @type {?} */ remainder = split.join('.');
            return remainder ? ' - ' + remainder : '';
        }
    }
    /**
     * @param {?} result
     * @param {?} isLeaf
     * @param {?} healthObject
     * @param {?} name
     * @return {?}
     */
    addHealthObject(result, isLeaf, healthObject, name) {
        const /** @type {?} */ healthData = {
            name
        };
        const /** @type {?} */ details = {};
        let /** @type {?} */ hasDetails = false;
        for (const /** @type {?} */ key in healthObject) {
            if (healthObject.hasOwnProperty(key)) {
                const /** @type {?} */ value = healthObject[key];
                if (key === 'status' || key === 'error') {
                    healthData[key] = value;
                }
                else {
                    if (!this.isHealthObject(value)) {
                        details[key] = value;
                        hasDetails = true;
                    }
                }
            }
        }
        // Add the details
        if (hasDetails) {
            healthData.details = details;
        }
        // Only add nodes if they provide additional information
        if (isLeaf || hasDetails || healthData.error) {
            result.push(healthData);
        }
        return healthData;
    }
    /**
     * @param {?} result
     * @param {?} path
     * @param {?} data
     * @return {?}
     */
    flattenHealthData(result, path, data) {
        for (const /** @type {?} */ key in data) {
            if (data.hasOwnProperty(key)) {
                const /** @type {?} */ value = data[key];
                if (this.isHealthObject(value)) {
                    if (this.hasSubSystem(value)) {
                        this.addHealthObject(result, false, value, this.getModuleName(path, key));
                        this.flattenHealthData(result, this.getModuleName(path, key), value);
                    }
                    else {
                        this.addHealthObject(result, true, value, this.getModuleName(path, key));
                    }
                }
            }
        }
        return result;
    }
    /**
     * @param {?} path
     * @param {?} name
     * @return {?}
     */
    getModuleName(path, name) {
        let /** @type {?} */ result;
        if (path && name) {
            result = path + this.separator + name;
        }
        else if (path) {
            result = path;
        }
        else if (name) {
            result = name;
        }
        else {
            result = '';
        }
        return result;
    }
    /**
     * @param {?} healthObject
     * @return {?}
     */
    hasSubSystem(healthObject) {
        let /** @type {?} */ result = false;
        for (const /** @type {?} */ key in healthObject) {
            if (healthObject.hasOwnProperty(key)) {
                const /** @type {?} */ value = healthObject[key];
                if (value && value.status) {
                    result = true;
                }
            }
        }
        return result;
    }
    /**
     * @param {?} healthObject
     * @return {?}
     */
    isHealthObject(healthObject) {
        let /** @type {?} */ result = false;
        for (const /** @type {?} */ key in healthObject) {
            if (healthObject.hasOwnProperty(key)) {
                if (key === 'status') {
                    result = true;
                }
            }
        }
        return result;
    }
}
JhiHealthService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
JhiHealthService.ctorParameters = () => [
    { type: Http, },
];
function JhiHealthService_tsickle_Closure_declarations() {
    /** @type {?} */
    JhiHealthService.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    JhiHealthService.ctorParameters;
    /** @type {?} */
    JhiHealthService.prototype.separator;
    /** @type {?} */
    JhiHealthService.prototype.http;
}
//# sourceMappingURL=health.service.js.map