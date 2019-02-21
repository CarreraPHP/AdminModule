import { TemplateRef, ViewContainerRef } from '@angular/core';
import { Principal } from './principal.service';
/**
 * @whatItDoes Conditionally includes an HTML element if current user has any
 * of the authorities passed as the `expression`.
 *
 * @howToUse
 * ```
 *     <some-element *jhiHasAnyAuthority="'ROLE_ADMIN'">...</some-element>
 *
 *     <some-element *jhiHasAnyAuthority="['ROLE_ADMIN', 'ROLE_USER']">...</some-element>
 * ```
 */
export declare class HasAnyAuthorityDirective {
    private principal;
    private templateRef;
    private viewContainerRef;
    private authorities;
    constructor(principal: Principal, templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef);
    jhiHasAnyAuthority: string | string[];
    private updateView;
}
