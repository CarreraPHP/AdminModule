import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Principal } from './principal.service';
/**
 * \@whatItDoes Conditionally includes an HTML element if current user has any
 * of the authorities passed as the `expression`.
 *
 * \@howToUse
 * ```
 *     <some-element *jhiHasAnyAuthority="'ROLE_ADMIN'">...</some-element>
 *
 *     <some-element *jhiHasAnyAuthority="['ROLE_ADMIN', 'ROLE_USER']">...</some-element>
 * ```
 */
export class HasAnyAuthorityDirective {
    /**
     * @param {?} principal
     * @param {?} templateRef
     * @param {?} viewContainerRef
     */
    constructor(principal, templateRef, viewContainerRef) {
        this.principal = principal;
        this.templateRef = templateRef;
        this.viewContainerRef = viewContainerRef;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set jhiHasAnyAuthority(value) {
        this.authorities = typeof value === 'string' ? [/** @type {?} */ (value)] : /** @type {?} */ (value);
        this.updateView();
        // Get notified each time authentication state changes.
        this.principal.getAuthenticationState().subscribe((identity) => this.updateView());
    }
    /**
     * @return {?}
     */
    updateView() {
        this.principal.hasAnyAuthority(this.authorities).then((result) => {
            this.viewContainerRef.clear();
            if (result) {
                this.viewContainerRef.createEmbeddedView(this.templateRef);
            }
        });
    }
}
HasAnyAuthorityDirective.decorators = [
    { type: Directive, args: [{
                selector: '[jhiHasAnyAuthority]'
            },] },
];
/**
 * @nocollapse
 */
HasAnyAuthorityDirective.ctorParameters = () => [
    { type: Principal, },
    { type: TemplateRef, },
    { type: ViewContainerRef, },
];
HasAnyAuthorityDirective.propDecorators = {
    'jhiHasAnyAuthority': [{ type: Input },],
};
function HasAnyAuthorityDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    HasAnyAuthorityDirective.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    HasAnyAuthorityDirective.ctorParameters;
    /** @type {?} */
    HasAnyAuthorityDirective.propDecorators;
    /** @type {?} */
    HasAnyAuthorityDirective.prototype.authorities;
    /** @type {?} */
    HasAnyAuthorityDirective.prototype.principal;
    /** @type {?} */
    HasAnyAuthorityDirective.prototype.templateRef;
    /** @type {?} */
    HasAnyAuthorityDirective.prototype.viewContainerRef;
}
//# sourceMappingURL=has-any-authority.directive.js.map