export class User {
    /**
     * @param {?=} id
     * @param {?=} login
     * @param {?=} firstName
     * @param {?=} lastName
     * @param {?=} email
     * @param {?=} activated
     * @param {?=} langKey
     * @param {?=} authorities
     * @param {?=} createdBy
     * @param {?=} createdDate
     * @param {?=} lastModifiedBy
     * @param {?=} lastModifiedDate
     * @param {?=} password
     */
    constructor(id, login, firstName, lastName, email, activated, langKey, authorities, createdBy, createdDate, lastModifiedBy, lastModifiedDate, password) {
        this.id = id ? id : null;
        this.login = login ? login : null;
        this.firstName = firstName ? firstName : null;
        this.lastName = lastName ? lastName : null;
        this.email = email ? email : null;
        this.activated = activated ? activated : false;
        this.langKey = langKey ? langKey : null;
        this.authorities = authorities ? authorities : null;
        this.createdBy = createdBy ? createdBy : null;
        this.createdDate = createdDate ? createdDate : null;
        this.lastModifiedBy = lastModifiedBy ? lastModifiedBy : null;
        this.lastModifiedDate = lastModifiedDate ? lastModifiedDate : null;
        this.password = password ? password : null;
    }
}
function User_tsickle_Closure_declarations() {
    /** @type {?} */
    User.prototype.id;
    /** @type {?} */
    User.prototype.login;
    /** @type {?} */
    User.prototype.firstName;
    /** @type {?} */
    User.prototype.lastName;
    /** @type {?} */
    User.prototype.email;
    /** @type {?} */
    User.prototype.activated;
    /** @type {?} */
    User.prototype.langKey;
    /** @type {?} */
    User.prototype.authorities;
    /** @type {?} */
    User.prototype.createdBy;
    /** @type {?} */
    User.prototype.createdDate;
    /** @type {?} */
    User.prototype.lastModifiedBy;
    /** @type {?} */
    User.prototype.lastModifiedDate;
    /** @type {?} */
    User.prototype.password;
}
//# sourceMappingURL=user.model.js.map