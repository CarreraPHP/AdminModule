import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ExternalModuleProjectSharedLibsModule, ExternalModuleProjectSharedCommonModule, CSRFService, AuthServerProvider, AccountService, UserService, StateStorageService, LoginService, LoginModalService, Principal, HasAnyAuthorityDirective, JhiLoginModalComponent } from './';
export class ExternalModuleProjectSharedModule {
}
ExternalModuleProjectSharedModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    ExternalModuleProjectSharedLibsModule,
                    ExternalModuleProjectSharedCommonModule
                ],
                declarations: [
                    JhiLoginModalComponent,
                    HasAnyAuthorityDirective
                ],
                providers: [
                    LoginService,
                    LoginModalService,
                    AccountService,
                    StateStorageService,
                    Principal,
                    CSRFService,
                    AuthServerProvider,
                    UserService,
                    DatePipe
                ],
                entryComponents: [JhiLoginModalComponent],
                exports: [
                    ExternalModuleProjectSharedCommonModule,
                    JhiLoginModalComponent,
                    HasAnyAuthorityDirective,
                    DatePipe
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            },] },
];
/**
 * @nocollapse
 */
ExternalModuleProjectSharedModule.ctorParameters = () => [];
function ExternalModuleProjectSharedModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ExternalModuleProjectSharedModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ExternalModuleProjectSharedModule.ctorParameters;
}
//# sourceMappingURL=shared.module.js.map