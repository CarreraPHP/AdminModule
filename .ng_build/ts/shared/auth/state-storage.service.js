import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ng2-webstorage';
export class StateStorageService {
    /**
     * @param {?} $sessionStorage
     */
    constructor($sessionStorage) {
        this.$sessionStorage = $sessionStorage;
    }
    /**
     * @return {?}
     */
    getPreviousState() {
        return this.$sessionStorage.retrieve('previousState');
    }
    /**
     * @return {?}
     */
    resetPreviousState() {
        this.$sessionStorage.clear('previousState');
    }
    /**
     * @param {?} previousStateName
     * @param {?} previousStateParams
     * @return {?}
     */
    storePreviousState(previousStateName, previousStateParams) {
        const /** @type {?} */ previousState = { 'name': previousStateName, 'params': previousStateParams };
        this.$sessionStorage.store('previousState', previousState);
    }
    /**
     * @return {?}
     */
    getDestinationState() {
        return this.$sessionStorage.retrieve('destinationState');
    }
    /**
     * @param {?} url
     * @return {?}
     */
    storeUrl(url) {
        this.$sessionStorage.store('previousUrl', url);
    }
    /**
     * @return {?}
     */
    getUrl() {
        return this.$sessionStorage.retrieve('previousUrl');
    }
    /**
     * @param {?} destinationState
     * @param {?} destinationStateParams
     * @param {?} fromState
     * @return {?}
     */
    storeDestinationState(destinationState, destinationStateParams, fromState) {
        const /** @type {?} */ destinationInfo = {
            'destination': {
                'name': destinationState.name,
                'data': destinationState.data,
            },
            'params': destinationStateParams,
            'from': {
                'name': fromState.name,
            }
        };
        this.$sessionStorage.store('destinationState', destinationInfo);
    }
}
StateStorageService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
StateStorageService.ctorParameters = () => [
    { type: SessionStorageService, },
];
function StateStorageService_tsickle_Closure_declarations() {
    /** @type {?} */
    StateStorageService.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    StateStorageService.ctorParameters;
    /** @type {?} */
    StateStorageService.prototype.$sessionStorage;
}
//# sourceMappingURL=state-storage.service.js.map