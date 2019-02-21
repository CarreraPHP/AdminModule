import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SERVER_API_URL } from '../../app.constants';
import { ResponseWrapper } from '../model/response-wrapper.model';
import { createRequestOption } from '../model/request-util';
export class UserService {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
        this.resourceUrl = SERVER_API_URL + 'api/users';
    }
    /**
     * @param {?} user
     * @return {?}
     */
    create(user) {
        return this.http.post(this.resourceUrl, user)
            .map((res) => this.convertResponse(res));
    }
    /**
     * @param {?} user
     * @return {?}
     */
    update(user) {
        return this.http.put(this.resourceUrl, user)
            .map((res) => this.convertResponse(res));
    }
    /**
     * @param {?} login
     * @return {?}
     */
    find(login) {
        return this.http.get(`${this.resourceUrl}/${login}`).map((res) => res.json());
    }
    /**
     * @param {?=} req
     * @return {?}
     */
    query(req) {
        const /** @type {?} */ options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res) => this.convertResponse(res));
    }
    /**
     * @param {?} login
     * @return {?}
     */
    delete(login) {
        return this.http.delete(`${this.resourceUrl}/${login}`);
    }
    /**
     * @return {?}
     */
    authorities() {
        return this.http.get(SERVER_API_URL + 'api/users/authorities').map((res) => {
            const /** @type {?} */ json = res.json();
            return /** @type {?} */ (json);
        });
    }
    /**
     * @param {?} res
     * @return {?}
     */
    convertResponse(res) {
        const /** @type {?} */ jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }
}
UserService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
UserService.ctorParameters = () => [
    { type: Http, },
];
function UserService_tsickle_Closure_declarations() {
    /** @type {?} */
    UserService.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    UserService.ctorParameters;
    /** @type {?} */
    UserService.prototype.resourceUrl;
    /** @type {?} */
    UserService.prototype.http;
}
//# sourceMappingURL=user.service.js.map